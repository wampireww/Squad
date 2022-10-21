import { createNavigationContainerRef, useNavigation, useRoute } from '@react-navigation/native';
import React, { isValidElement, useRef, useSyncExternalStore } from 'react'
import { useEffect ,useState } from 'react';


import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    RefreshControl,
    Image,
    TurboModuleRegistry,
    Settings,
    Alert,
    AppState,
  } from 'react-native';
  import { GoogleSignin ,statusCodes,GoogleSigninButton } from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth';
  import RBSheet from "react-native-raw-bottom-sheet";
  import database from '@react-native-firebase/database';
  import { firebase } from '@react-native-firebase/database';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import RBSheet2 from "react-native-raw-bottom-sheet";
  import Geolocation, { PositionError,hasLocationPermission }  from "react-native-geolocation-service";
  import BackgroundFetch from "react-native-background-fetch";
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
  import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons/faArrowCircleLeft';
  import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';  // kullanıyoruz
  import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'; // kullanıyoruz
  import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
  import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
  import { Notifications,Notification,completion } from 'react-native-notifications';
  import { Avatar, Title } from 'react-native-paper';
  import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh';
  import { faLocationPin } from '@fortawesome/free-solid-svg-icons/faLocationPin';
  import { faLocationPinLock } from '@fortawesome/free-solid-svg-icons/faLocationPinLock';
  import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { acc, color, set } from 'react-native-reanimated';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { Searchbar } from 'react-native-paper';
import { faUserGear } from '@fortawesome/free-solid-svg-icons/faUserGear';
import { List } from 'react-native-paper';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons/faSquareEnvelope';


const Home= ({navigation})=>{

  [Userid,setuserid]=useState("");
  [User1,setuser1]=useState([]);
  [Userbilgisi,setuserbilgisi]=useState([]);
  [Requestler,setrequest]=useState([]);
  [uniqekey,setkey]=useState("");
  [friendlist,setfriends]=useState([]);
  [refresh,setrefresh]=useState(false);
  [durum,setdurum]=useState(true);
  [Sorgu,setsorgu]=useState();
  [mesajgeldi,setmesajgeldi]=useState();
  [username1,setusername1]=useState("");
 [bildirimsorgu,setbildirimsorgu]=useState();
 [Events,setevent]=useState([]);
 [Appstatesorgu,setappstatesorgu]=useState(AppState.current);
 [Engelle,setengelle]=useState();
 [Title1,settitle1]=("");
 [Body1,setbody1]=("");
 [Notifiarray,setnotifiarray]=useState([]);
 [Homeuserid,sethomeusrid]=useState([]);
 [Searchlist,setsearchlist]=useState([]);
 [Searchkontrol,setsearchkontrol]=useState();
[Uyeid,setuyeid]=useState();
[Geocurrent,setgeocurrent]=useState({latitude:0,longitude:0});


 const route=useRoute();
  const navigasyon=useNavigation();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
const appstate=useRef(AppState.currentState);

useEffect(()=>{

  const subscription=  AppState.addEventListener("change", nextAppState => { 
      if (
        nextAppState == "background"  
      )
       {
    console.log("background");

      }

      appstate.current = nextAppState;
      setappstatesorgu(appstate.current);
      console.log("AppState", appstate.current);
    
    })
          return()=>{
             subscription.remove();
             
          }
  },[]);


  useEffect(()=>{
    
  const silme=firebase.database().ref("Users/"+Homeuserid+"/Notifications");

    if(Appstatesorgu==="background"){
      
    
    }
    else{
       Notifications.removeAllDeliveredNotifications();
       silme.set(null);
    }
  
  },[Appstatesorgu]);



  useEffect(() => {   // MASSAGEDEN NAVİGASYONA DONERKEN SAYFA YENİLENMESİ
    const unsubscribe = navigation.addListener('focus', () => {
      friendsshow();
    //   sorgu2()
    
    });
    return unsubscribe;
  }, [navigation,Sorgu]);

  const mesajsayfasi=(friend,photo1,itemid)=>{   // MESAJ SAYFASINA YONLENME 

    const mesajbildirimalan=firebase.database().ref("Users/"+Homeuserid+"/Friends/"+itemid);
    mesajbildirimalan.update({
      mesajbildirim:false,
      text404:"",
    });
      navigasyon.navigate("Massage",{username:friend,userphoto:photo1,id:itemid});

  }

  useEffect(()=>{

    sorgu2();

  },[Sorgu])

 const refreshflatlist=()=>{
  setrefresh(true);
  setTimeout(() => {
   friendsshow();

    setrefresh(false)
  }, 1000);
 }


const sorgu2=()=>{
  firebase.database().ref("Users/"+Homeuserid).on('value',
  item=>{var deger=item.child("requests").exists();if(deger==true){setsorgu(true),console.log("Request var.")}else{setsorgu(false),console.log("Request yok.")}})
  console.log(Sorgu)
 // requestlistele();
}

 const sorgu= ()=>{
 firebase.database().ref("Users/"+Homeuserid+"/Friends").on('value',
 item=>{item.forEach(deger=>{if(deger.val().mesajbildirim==true)
  {setmesajgeldi(true),setbildirimsorgu(true),console.log("YESSSSSSSSSSSS")}else{setmesajgeldi(false),console.log("SOSOSOOSOSOSOOSSS")}})});
 
 };

  const friendsshow=()=>{

  database().ref("Users/"+Homeuserid+"/Friends").once("value").then(item1=>{
      var flist1=[];
      item1.forEach(friend=>{
        flist1.push({
          id:friend.val().id,
          username:friend.val().username,
          email:friend.val().email,
          photo:friend.val().userphoto,
          mesajbilgisi:friend.val().mesajbildirim,
          text:friend.val().text404,
        })
      })
    setfriends(flist1);
    })
    console.log(friendlist)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
 
  }

  useEffect(()=>{
  //  sorgu();
  if(bildirimsorgu==true){
    friendsshow();
  }
    return setbildirimsorgu(false)
  },[bildirimsorgu])
  
  

  useEffect(()=>{ // MESAJ GELDİĞİNDE ÇALIŞIR..

    // firebase.database().ref("Users/"+Homeuserid+"/Notifications").on('value',
    // item=>{
    //   item.forEach(deger=>{
    //     Notifications.postLocalNotification({
    //       title:deger.val().gonderen,
    //       body:deger.val().Massages,
    //     })
    //       })
    // }
    // )
   // sorgu();
    friendsshow();
   
  
},[mesajgeldi])


  const request_Accept=(index2,indexname)=>{

    const filter=Requestler.filter((task)=>task.id!==index2)
    setrequest(filter);
  const reqdata=firebase.database().ref("Users/"+Homeuserid+"/requests/"+indexname).set(null);
  const requestkaritaraf=firebase.database().ref("Users/"+index2+"/Friends/"+Homeuserid);
  const requestaccept=firebase.database().ref("Users/"+Homeuserid+"/Friends/"+index2);
  const friendekle=firebase.database().ref("Users/"+index2).once("value",data=>{
      requestaccept.set({
       id:data.val().account.id,
       email:data.val().account.email,
       username:data.val().account.username,
       userphoto:data.val().account.userphoto,
       mesajbildirim:false,
     });
     const benimuser=firebase.database().ref("Users/"+Homeuserid+"/account").once("value").then(item=>
     requestkaritaraf.set({
      id:item.val().id,
      email:item.val().email,
      username:item.val().username,
      userphoto:item.val().userphoto,
      mesajbildirim:false,
     }))
    })
    friendsshow();
 


    
  }

  const request_Reject=(index,indexname)=>{

    const filter=Requestler.filter((task)=>task.id!==index)
    setrequest(filter);
    const reqdata=firebase.database().ref("Users/"+Homeuserid+"/requests/"+indexname).set(null);
    console.log(Requestler);

  }

  const handlesubmit=async ()=>{
  var idgelen;
    const accountid=(await firebase.database().ref("Userlist").once("value")).forEach(item=>{
      if(item.child("username").val()==Userid){
         idgelen=item.child("id").exportVal();
        return idgelen;
      }
    })
    
// const accountid=firebase.database().ref("Userlist/"+Userid).child("id").once("value");
// const idgelen=(await accountid).exportVal();
const databaseistek=firebase.database().ref("Users/"+idgelen[".value"]+"/requests/"+User1.user.name);
const database=firebase.database().ref("Users/"+idgelen[".value"]).once("value")
.then(data=>{

  if(data.child("requests/"+username1).exists()){

    alert("Request has been already sended ! ")

}
else if(data.child("Friends/"+User1.user.id).exists()){

  alert("This user is already your friends ! ")

}
else{
  databaseistek.set({
    id:User1.user.id,
    key:data.key,
    gonderen_name:User1.user.name,
    email:User1.user.email,
    photo:User1.user.photo,
  }).then(alert("Request has been sended ! "))
}
  
  }).catch(()=>alert("User not found !"))}

const requestlistele=()=>{
 
    firebase.database().ref("Users/"+Homeuserid+"/requests").once('value')
     .then(item=>{
      var request=[];
       item.forEach(deger=>{
        request.push({
        id:deger.val().id,
        name:deger.val().gonderen_name,
        key:deger.val().key,
        email:deger.val().email,
        photo:deger.val().photo,
      })})
      setrequest(request);
     })
     
      console.log(Requestler);
};


  useEffect(()=>{    // NAVİGATİON SET OPTİONS

    navigation.setOptions({
      headerStyle:{backgroundColor:"#01579B"},
      headerTitleAlign:"center",
      headerShadowVisible:true,
      headerTintColor:"#FFBD59",
      headerTitleStyle:{fontSize:23,fontWeight:"bold"},
      title:"Squad",
      headerRight:()=><TouchableOpacity style={{justifyContent:'center'}} onPress={()=>logout()}>
            <FontAwesomeIcon icon={faSignOut} color="#FFBD59" size={25}/>
      </TouchableOpacity>,
      headerLeft:()=><TouchableOpacity style={{justifyContent:'center'}} onPress={()=>refRBSheet2.current.open(requestlistele())}>
        <FontAwesomeIcon icon={faBell} color={(Sorgu) ? "red" : "white"} size={25}/>
        </TouchableOpacity>
    });
  //  sorgu2();
  })


  useEffect(()=>{
    let islem=true
  
    if(islem)
    {
      getCurrentUser1 = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
       await setuser1(currentUser);
       await setusername1(currentUser.user.name);
       await sethomeusrid(currentUser.user.id);
        sorgu3();
        sorgu2();
        console.log(currentUser.user.name);
//  const sorgulama=firebase.database().ref("Users/"+User1.user.name).once("value");
//  var cocuk=(await sorgulama).child("requests").exists();
 //setsorgu(cocuk)
        sorgu();

      };
      getCurrentUser1();
     
}

  return()=>{
     islem=false;
  }
  
},[])


const sorgu3=async ()=>{  // NAVİGATİON AÇ KAPA BUTON İLK ÇALIŞTIĞINDA GELME İŞLEMİ   USEEFFECK İÇİNDE ÖRNEKLENMİŞTİR.
  const blocklocation2=await firebase.database().ref("Users/"+Homeuserid+"/Geolocation").child("izin").once("value");
 const blocklocation23=blocklocation2.exportVal();
setengelle(blocklocation23[".value"]);
console.log(blocklocation23[".value"]+"44444444444444444");
}


  useEffect(()=>{
      let islem=true
     
      if(islem)
      {
       
        friendsshow();
        requestlistele();
      
       
  }
  
    return()=>{
       islem=false;
     //  setuser1();
     //  setfriends();
      console.log(islem)
    }
    
  },[])

useEffect(()=>{

if(Searchkontrol==true){
  usersorgu();
}
else{
}

},[Userid])


const logout=()=>{
  GoogleSignin.signOut().then(()=>navigasyon.navigate("Login"),console.log("çıkış yapıldı.")).catch((error)=>console.log(error))
}

const removeuser=(index3,indexid)=>{

  Alert.alert(
    "Warning",
    "Are you sure that you wanted to be delete this user ?",
    [
      {
        text: "Yes",
        onPress: () =>{ const filter3=friendlist.filter((task)=>task.name!==index3)
          setfriends(filter3);
          const reqdata=firebase.database().ref("Users/"+Homeuserid+"/Friends/"+indexid).set(null);
          const reqdata1=firebase.database().ref("Users/"+indexid+"/Friends/"+Homeuserid).set(null).then(()=>friendsshow())
         },
        style: "Yes",
      },
      {
        text: "No",
        onPress: () => console.log("reddetti"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
     
    }
  );
      
}

const navigationblock=()=>{
  setengelle(!Engelle);
  console.log(Engelle);
if(Engelle){
const blocklocation=firebase.database().ref("Users/"+Homeuserid+"/Geolocation");
blocklocation.update({izin:false});
}
else{
const blocklocation=firebase.database().ref("Users/"+Homeuserid+"/Geolocation");
blocklocation.update({izin:true});
}
 
}

const Refreshicon=()=>{
  friendsshow(),
  requestlistele();
}


const usersorgu=async()=>{

const ben=await firebase.database().ref("Users/"+Homeuserid).child("account").child("username").once("value");
const gelen=ben.exportVal();
// console.log(gelen);
setuyeid(gelen[".value"])
  const uyeara=firebase.database().ref("Userlist").once("value").then(item=>item.forEach(deger=>{if(deger.child("username").val()==Userid){
       if(deger.child("username").val()!=Uyeid){
        var list=[];
        list.push(deger.val());
        setsearchlist(list);
        console.log(Searchlist);
        console.log(deger.key)
      }     
  }
},
setsearchlist([])
));

// const data=firebase.database().ref("Userlist").once("value").then(item=>{if(item.child(Userid).exists() && Userid!=User1.user.name){
//   var list=[];
//     list.push(item.child(Userid).val())
//     setsearchlist(list);
//     console.log(Searchlist)
// }
// else{setsearchlist([])}
// })

}
  

const closeıslem=()=>{   // RBSHEET KAPANINCA CALISIR.
  setsearchkontrol(false);
  setsearchlist([]);
}


const Settingssayfasi=()=>{

  navigasyon.navigate("Settings")


}


  return (
    <SafeAreaView style={styles.sablon}>
      {/* <View style={{backgroundColor:"#01579B"}}>
        <Text style={{color:"#FFBD59",fontWeight:"bold"}}>Username: {username1}</Text>
        </View> */}
      <View>
       <FlatList
       data={friendlist}
       keyExtractor={(item)=>item.id}
       refreshControl={<RefreshControl refreshing={refresh} onRefresh={refreshflatlist}/>}
       renderItem={({item})=><View style={{width:"80%"}}>
       <TouchableOpacity onLongPress={()=>removeuser()}  onPress={()=>mesajsayfasi(item.username,item.photo,item.id)}>
        <List.Item
       title={<Text style={{color:"black",fontSize:17,fontWeight:"400"}}>{item.username}</Text>}
       description={(item.mesajbilgisi) ?<View style={{flexDirection:'row',justifyContent:'center',backgroundColor:"#F3F1F5",borderRadius:50,padding:4}}><View style={{paddingRight:3}}><FontAwesomeIcon icon={faSquareEnvelope} color="red" size={20}/></View><Text style={{ fontWeight: "bold", fontStyle: "italic",fontSize:15 }}>: {item.text}</Text></View> :  <Text style={{ fontWeight: "bold", fontStyle: "italic" }}></Text>}
       descriptionEllipsizeMode="tail"
       descriptionNumberOfLines={1}
       left={props => <Avatar.Image size={55} source={{uri:item.photo}} />}
     />
     </TouchableOpacity>
     </View>
      //  <View style={{flex:1,flexDirection:"row",padding:5,width:"82%",alignItems:"center"}}>
      //  <TouchableOpacity onPress={()=>mesajsayfasi(item.username,item.photo,item.id)} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      //  <Avatar.Image size={40} source={{uri:item.photo}} />
       
      //   <Text style={{fontSize:16,marginLeft:5,fontWeight:"bold"}}>{item.username}</Text>
      //   {(item.mesajbilgisi)? <View style={{alignItems:"flex-end",position:"absolute",right:-60,fontWeight:"bold"}}><FontAwesomeIcon icon={faEnvelope} color="#FFBD59" size={25}/></View> : <Text></Text>}
      //   </TouchableOpacity>
      //   <TouchableOpacity onPress={()=>removeuser(item.username,item.id)} style={{position:"absolute",right:0}}>
      //   <FontAwesomeIcon icon={faTrashCan} color="red" size={15}/>
      //   </TouchableOpacity>
      //   </View> 
      }
       />
      </View>
      <View style={{position:"absolute",alignItems:"flex-end",top:150,right:15,elevation:10}}>
      <TouchableOpacity style={{backgroundColor:"#01579B",padding:10,borderRadius:50,marginBottom:10}} onPress={()=>Refreshicon()}>
      <FontAwesomeIcon icon={faRefresh} color="#FFBD59" size={27}/>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"#01579B",padding:10,borderRadius:50,marginBottom:10}} onPress={()=>Settingssayfasi()}>
      <FontAwesomeIcon icon={faUserGear} color="#FFBD59" size={27}/>
      </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"#01579B",padding:10,borderRadius:50}} onPress={()=>refRBSheet.current.open()}>
      <FontAwesomeIcon icon={faUserPlus} color="#FFBD59" size={27}/>
      </TouchableOpacity>

      <TouchableOpacity  style={(Engelle==true) ? styles.block : styles.noblock} onPress={()=>navigationblock()}>
      <FontAwesomeIcon icon={faLocationDot} color="#FFBD59" size={27}/>
      </TouchableOpacity>
      
      </View>   
      <RBSheet ref={refRBSheet}
      height={400}
    //  openDuration={500}
      animationType={"fade"}
      closeOnDragDown={false}
      closeOnPressMask={true}
      onOpen={()=>setsearchkontrol(true)}
      onClose={()=>closeıslem()}
      customStyles={{
        container :{
          backgroundColor:"#01579B"
        //  justifyContent:'center',
         // alignItems:"center",
        }
      }}
    > 
    <View style={{flex:1}}>
      <Text style={{alignItems:"center",textAlign:'center',fontSize:20,fontWeight:"bold",marginTop:10,color:"#FFBD59"}}>Add a friend !</Text>
      <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center',textAlign:"center",marginTop:10}}>
          <TextInput onChangeText={(userid)=>setuserid(userid)} style={{width:"90%",backgroundColor:"#FFBD59",
        height:35,borderRadius:50,fontSize:15,textAlignVertical:"center",fontWeight:"bold",paddingRight:65}}
         placeholder='Plase enter username !'/> 
         <View style={{position:"absolute",right:20}}>
        <FontAwesomeIcon style={{marginRight:10}} icon={faSearch} color="#01579B" size={23}/>
        </View>
        </View>
      
         <FlatList
        data={Searchlist}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=><View style={{flex:1,flexDirection:"row",padding:3,width:"90%",elevation:10,alignItems:"center",marginLeft:20,
        backgroundColor:"#FFBD59",borderRadius:50,marginTop:10}}>
        <Avatar.Image size={40} source={{uri:item.Userphoto}} />
         <Text style={{fontSize:16,marginLeft:5,fontWeight:"bold",textAlign:"left"}}>{item.username}</Text>
         <TouchableOpacity onPress={()=>handlesubmit()} style={{position:"absolute",right:20}}>
         <FontAwesomeIcon icon={faUserPlus} color="green" borderWidth={2} size={25}/>
         </TouchableOpacity>
         </View>  
         }
        /> 
        </View>
       
      
    </RBSheet>

    <RBSheet ref={refRBSheet2}
      height={500}
     // onClose={()=>requestsorgula()}
    //  openDuration={500}
      animationType={"fade"}
      closeOnDragDown={false}
      closeOnPressMask={true}
      customStyles={{
        container :{
          backgroundColor:"#01579B"
        //  justifyContent:'center',
         // alignItems:"center",
        }
      }}
    >
      <Text style={{textAlign:'center',fontSize:20,color:"#FFBD59",marginTop:5,fontWeight:"600"}}>Friendship Requests</Text>
      <FlatList
      data={Requestler}
      keyExtractor={(item)=>item.name}
      renderItem={({item})=>
      <View style={{flexDirection:"row",flex:1,alignItems:'center',backgroundColor:"#FFBD59",padding:10,marginVertical:5,marginHorizontal:5,borderRadius:40}}>
        <Text style={{fontSize:16,marginLeft:10,fontWeight:"bold"}}>{item.name}</Text>
        <View style={{alignItems:"flex-end",flex:1,flexDirection:'row',justifyContent:"flex-end"}}>
        <TouchableOpacity onPress={()=>request_Accept(item.id,item.name)} style={{marginRight:10}}>
          <Text style={{fontSize:16,fontWeight:"bold",color:"green"}}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>request_Reject(item.id,item.name)} style={{marginRight:10}}>
          <Text style={{fontSize:16,fontWeight:"bold",color:"red"}}>Reject</Text>
        </TouchableOpacity>
        </View>
      </View>
    }
      />
    </RBSheet>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({

  sablon:{backgroundColor:"#F9FBE7" , flex:1},
  mesajbildirim:{borderWidth:1,backgroundColor:"red"},
  noblock:{backgroundColor:"red",padding:10,borderRadius:50,marginTop:10},
  block:{backgroundColor:"green",padding:10,borderRadius:50,marginTop:10},



})

export default Home