import React from 'react'
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
    Svg,
    Alert,
    AppState,
  } from 'react-native';
  import { GoogleSignin } from '@react-native-google-signin/google-signin';
  import RBSheet from "react-native-raw-bottom-sheet";
  import database from '@react-native-firebase/database';
  import { firebase } from '@react-native-firebase/database';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import Geolocation  from "react-native-geolocation-service";
  import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
  import { useState } from 'react';
  import { useEffect } from "react";
  import { useRef } from "react";
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
  import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
  import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
  import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
  import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
  import { Notifications,Notification,completion } from 'react-native-notifications';
  import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
  import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh';


const Massage= ({navigation})=>{

  [Valuetext,settext]=useState("");
  [User1,setuser]=useState([]);
  [Mesajlararray,setmesajarray]=useState([]);
  [Positions,setpositions]=useState([]);
  [ylocation,yset]=useState({latitude:"",longitude:""});
  [deger1,setdeger1]=useState(null);
  [deger2,setdeger2]=useState(null); 
  [deger3,setdeger3]=useState(null);
  [deger4,setdeger4]=useState(null);
  [latitudedelta,setlatitudedelta]=useState(0.00400); 
  [longitudedelta,setlongitudedelta]=useState(0.00121);
  [Geotarih,setgeotarih]=useState("Location has not been updated yet !");
  [Title,settitle]=useState("");
  [usernamedeger,setusernamedeger]=useState("");
  [visible,setVisible]=useState(false);
  [Locasyonizin,setlocasyonizin]=useState();
  [Paramsizin,setparamsizin]=useState();
  [Userid,setuserid]=useState("");
  [Geolast,setgeolast]=useState({latitude:0,longitude:0});
  [Geocurrent,setgeocurrent]=useState({latitude:0,longitude:0});



  mapStyle=[
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]

  const route=useRoute();
  const navigasyon=useNavigation();
  const titlegelen=route.params.username;
  const refRBSheet = useRef();
 
  useEffect(()=>{
    let islem3=true
      if(islem3){
        locationgetır();
}
    return()=>{
      islem3=false;
      
    }
  },[Positions])
 

  const locationcurrent= async()=>{
      
    Geolocation.getCurrentPosition( 
      (position) => { 
      var zaman=new Date();
       var saat=new Date().getUTCHours()+3;
       var month=new Date().getMonth()+1;
        const {coords:{longitude,latitude}}=position
       setgeocurrent({latitude,longitude});
        firebase.database().ref("Users/"+User1.user.id+"/Geolocation").update({
          Tarih:zaman.getDate()+"/"+month+"/"+zaman.getFullYear()+" Time: "+saat+":"+zaman.getUTCMinutes()
        })
        locationkaydet();
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true,timeout: 15000, maximumAge: 10000 },
  );  
  }

  const locationwatch=()=>{
    Geolocation.watchPosition(
      (position2) => {
     //   var zaman=new Date();
     //   var saat=new Date().getHours()+3;
     //   var month=new Date().getMonth()+1;
        const{coords:{longitude,latitude}}=position2
        setgeolast({latitude,longitude});
        locationkaydet();
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true,  timeout: 15000, maximumAge: 10000 },
    )
  }

  const locationkaydet=()=>{

    const locationset=firebase.database().ref("Users/"+Userid+"/Geolocation");
    locationset.update({
    i_latitude:Geocurrent.latitude,
    i_longitude:Geocurrent.longitude,
   // l_longitude:Geolast.longitude,
   // l_latitude:Geolast.latitude,
    }).then(console.log("BASARDİKKKKKKKKKKKKKKKK")).catch(error=>console.log(error))
  
  }

  const handlesubmit= async()=>{
    var date=new Date();
    var month=date.getMonth()+1
  const currentdate= date.getDate()+"/"+month+"/"+date.getFullYear();
  console.log(currentdate);
    const textmesaj=firebase.database().ref("Users/")
    const mesajbildirimalan=firebase.database().ref("Users/"+route.params.id+"/Friends/"+User1.user.id);
   // const mesajbildirimgonderen=firebase.database().ref("Users/"+User1.user.name+"/Friends/"+route.params.username+"/Mesajbildirim/"+User1.user.name);
    const  mesajgondreneekle=firebase.database().ref("Users/"+route.params.id+"/Friends/"+User1.user.id+"/Massages");
    const mesajekle=firebase.database().ref("Users/"+User1.user.id+"/Friends/"+route.params.id+"/Massages");
    const notificationekle=firebase.database().ref("Users/"+route.params.id+"/Notifications/"+User1.user.id);
 //   const mesajsorgu=firebase.database().ref("Users/"+User1.user.name+"/Friends/"+"Mesajgeldi");  
    if(Valuetext!==""){
   await mesajekle.push({
      mesajtext:Valuetext,
      tarihcurrent:currentdate,
      tarih: date.getUTCHours()+3+":"+date.getMinutes(),
      gonderen:usernamedeger,
      userphoto:User1.user.photo,
    }).then(
    mesajgondreneekle.push({
      mesajtext:Valuetext,
      tarihcurrent:currentdate,
      tarih:new Date().getUTCHours()+3+":"+new Date().getMinutes(),
      gonderen:usernamedeger,
      userphoto:User1.user.photo,
    })).then(
    mesajbildirimalan.update({
      mesajbildirim:true,
      text404:Valuetext,
    })).then(
       notificationekle.set({
            notificationbildirim:true,
            gonderen:usernamedeger,
            date:new Date().getUTCHours()+3+":"+new Date().getMinutes(),
            Massages:Valuetext,
            }));
    settext("");
  }
  else{console.log("text bos")
console.log(Appstatesorgu)
}
}
  
 const locationgetır=()=>{

  firebase.database().ref("Users/"+route.params.id+"/Geolocation").once("value").then(item=>{
    var positions=[];
      positions.push({
        i_longitude:item.val().i_longitude,
        i_latitude:item.val().i_latitude,
    //    l_latitude:item.val().l_latitude,
    //    l_longitude:item.val().l_longitude,
        geotarih:item.val().Tarih,
        izin:item.val().izin,
      })
      console.log(item.val())
    setpositions(positions);
    let ilon1=parseFloat(Positions[0].i_longitude);
    let ilat1=parseFloat(Positions[0].i_latitude);
    let ilon2=parseFloat(Positions[0].l_longitude);
    let ilat2=parseFloat(Positions[0].l_latitude);
    let tarih=Positions[0].geotarih;
    let izinlocasyon=Positions[0].izin;
    setlocasyonizin(izinlocasyon);
    setgeotarih(tarih)
    setdeger1(ilat1);
    setdeger2(ilon1);
    setdeger3(ilat2);
    setdeger4(ilon2);
  })
  
 };

  const massagelistele=()=>{

    firebase.database().ref("Users/"+Userid+"/Friends/"+route.params.id+"/Massages").once("value")
    .then(item=>{
      var mesajlar=[];
      item.forEach(eleman=>
        mesajlar.push({
          gonderen:eleman.val().gonderen,
          mesajtext:eleman.val().mesajtext,
          tarih:eleman.val().tarih,
          photo:eleman.val().userphoto,
      }))
      setmesajarray(mesajlar.reverse());
    });
    
  }

   useEffect(()=>{

     let islem=true
        
    if(islem){
      getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
      await  setuser(currentUser);
      await setusernamedeger(currentUser.user.name);
      await setparamsizin(route.params.block);
      await setuserid(currentUser.user.id);
   const isim=firebase.database().ref("Users/"+Userid+"/"+"account").child("username").once("value");
        const gelenisim=(await isim).exportVal();
        setusernamedeger(gelenisim[".value"]);
        console.log(usernamedeger);
    //  await locationcurrent();
      };
      getCurrentUser();

     
    }
        return()=>{
      islem=false;
     // setuser([]);
    //  setusernamedeger("");
    //  setmesajarray([]);
    
   }

   },[])

  useEffect(()=>{
      let islem2=true
      if(islem2){
        massagelistele();
}
    return()=>{
      islem2=false;
      
    }
  
  },[Mesajlararray])


  useEffect(()=>{   // NAVİGATİON SET OPTİONS 

    navigation.setOptions({
      headerStyle:{backgroundColor:"#01579B"},
      headerTitleAlign:"flex-start",
      headerShadowVisible:true,
      title:titlegelen,
      headerTintColor:"#FFBD59",
      headerTitleStyle:{fontSize:17,fontWeight:"bold"},
      headerLeft:()=><View style={{marginRight:10}}><TouchableOpacity onPress={()=>geriyedonmenutusu()}>
       <FontAwesomeIcon icon={faAngleDoubleLeft} color="#FFBD59" size={20}/></TouchableOpacity></View>,
      headerRight:()=><><TouchableOpacity onPress={() => Naviacsorgu()}><FontAwesomeIcon icon={faMapLocationDot} color="#FFBD59" size={20} /></TouchableOpacity>
      <TouchableOpacity onPress={() => Erasemassage()} style={{ position: "absolute", right: 50 }}>
        <FontAwesomeIcon icon={faEraser} color="#FFBD59" size={20} />
      </TouchableOpacity></>
    
})

})

  const geriyedonmenutusu= async()=>{
     const mesajbildirimalan=firebase.database().ref("Users/"+Userid+"/Friends/"+route.params.id);
   await mesajbildirimalan.update({mesajbildirim:false}).then(navigasyon.navigate("Home"));
    
      
  }


  const latitudezoomeksi=()=>{   // arti
    if(latitudedelta>=0.0010){
      setlatitudedelta(0.0010)
    }
    else{
      var deger3=latitudedelta-0.00100;
    setlatitudedelta(deger3);
    }
   
  }
  const latitudezoomarti=()=>{  // eksi
  
      var deger4=latitudedelta+0.00150;
      setlatitudedelta(deger4)

  }

const Erasemassage=()=>{

  Alert.alert(
    "Warning",
    "Are you sure that you wanted all of the messages are delete ? ",
    [
      {
        text: "Yes",
        onPress: () =>{
          const mesajsil=firebase.database().ref("Users/"+usernamedeger+"/Friends/"+route.params.id+"/Massages");
          mesajsil.set(null);
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

const Naviacsorgu=async ()=>{
  const sorguizin=await firebase.database().ref("Users/"+route.params.id+"/Geolocation").child("izin").once("value");
  const sorguizin1=sorguizin.exportVal();
 setlocasyonizin(sorguizin1[".value"]);
 console.log(Locasyonizin)
 if(Locasyonizin==true){
  refRBSheet.current.open();
  }
  else{
    alert("This user did not allow any location share !")
  }
}

const Navigation=()=>{
  locationcurrent();
  locationgetır();
}

const navigationrefresh=()=>{
  locationcurrent();
  locationkaydet();

}

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#F9FBE7"}}>

        <RBSheet ref={refRBSheet}
      height={500}
      onOpen={()=>Navigation()}
      openDuration={500}
   
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
       <View style={{paddingVertical:30}}>
      <View style={style.container}>
      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       customMapStyle={mapStyle}
       style={style.map}
       region={{
         latitude:(deger1==null) ? 0 : deger1,
         longitude:(deger2==null) ? 0 : deger2,
         latitudeDelta:latitudedelta,
         longitudeDelta:longitudedelta,
       }}
     >
      <Marker
      draggable={true}
      title={route.params.username}
      pinColor='blue'
      coordinate={{
        latitude:(deger1==null) ?  0 : deger1,
        longitude:(deger2==null) ? 0 : deger2,
        latitudeDelta:latitudedelta,
        longitudeDelta:longitudedelta,
      }}
      >
         <Image style={{borderRadius:50}} source={{uri:route.params.userphoto,width:35,height:35}} />
      </Marker>
     </MapView>
      </View>
      <View style={{backgroundColor:"#01579B",alignSelf:"center"}}><Text style={{color:"#FFBD59",alignItems:"center"}}>{route.params.username}'s latest location update : {Geotarih}</Text></View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:'center',backgroundColor:"#01579B"}}>
        <TouchableOpacity style={{padding:3}} onPress={()=>latitudezoomeksi()}>
        <FontAwesomeIcon icon={faPlusCircle} color="#FFBD59" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:10,marginBottom:3,marginTop:3}} onPress={()=>latitudezoomarti()}>
        <FontAwesomeIcon icon={faMinusCircle} color="#FFBD59" size={30}/>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",position:"absolute",right:5,bottom:30}}>
        <TouchableOpacity onPress={()=>navigationrefresh()}>
        <FontAwesomeIcon icon={faRefresh} color="#FFBD59" size={30}/>
        </TouchableOpacity>
        </View>
       
        </View>
    </RBSheet>
         {/* <View style={{flexDirection:"row",backgroundColor:"#01579B",elevation:10,alignItems:"center",height:35,width:"100%",justifyContent:"space-around"}}>
          <TouchableOpacity onPress={()=>Naviacsorgu()}><FontAwesomeIcon icon={faMapLocationDot} color="#FFBD59" size={30}/></TouchableOpacity>
          <TouchableOpacity onPress={()=>Erasemassage()} style={{position:"absolute",right:15}}>
          <FontAwesomeIcon icon={faEraser} color="#FFBD59" size={30}/>
          </TouchableOpacity>
          </View> */}
      <FlatList style={{padding:5}}
      inverted
      data={Mesajlararray}
     // keyExtractor={(item, index) => index.toString()}
      renderItem={({item})=>
      <View style={(User1.user.name==item.gonderen) ? style.rightmassage : style.leftmassage}>
        <View style={(User1.user.name==item.gonderen) ? style.baloncukI : style.baloncukother}>
          <Text style={(User1.user.name==item.gonderen) ? style.balontextI : style.balontextother}>{item.mesajtext}</Text>
          <Text style={{textAlign:"right",fontSize:10,marginRight:-5}}>{item.tarih}</Text>
          </View>
        </View>}
      />
        <View style={{flexDirection:"column",backgroundColor:"#01579B",paddingVertical:10,alignItems:"center",paddingRight:15,paddingLeft:3,borderTopLeftRadius:5,borderTopRightRadius:5,elevation:20}}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
          <TextInput style={{padding:5,backgroundColor:"#e7eefa",borderRadius:50,flex:1}} placeholder=" Write something..." value={Valuetext} onChangeText={(index)=>settext(index)}/>
          <TouchableOpacity style={{alignItems:"flex-end",justifyContent:"center",marginLeft:5,marginRight:-2}} onPress={()=>handlesubmit()}>
          <FontAwesomeIcon icon={faPaperPlane} color="#FFBD59" size={23}/>
          </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )

}

const style=StyleSheet.create({

  leftmassage:{flexDirection:'row',flex:1,justifyContent:'flex-start',marginLeft:10},
  rightmassage:{flexDirection:'row',flex:1,justifyContent:"flex-end"},
  baloncukI:{padding:10,backgroundColor:"#e7eefa",borderRadius:15,marginBottom:5,elevation:5},
  balontextI:{color:"black",fontSize:16,fontWeight:"400"},
  balontextother:{color:"#dbe5f9",fontSize:16,fontWeight:"bold"},
  baloncukother:{padding:10,backgroundColor:"#487ce1",borderRadius:15,marginBottom:5,elevation:5},
  
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 

});

export default Massage