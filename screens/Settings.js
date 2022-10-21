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
  import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
  import { Avatar } from 'react-native-paper';
  import { TextInput } from 'react-native-paper';
  import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
  import { Divider } from 'react-native-paper';








const  Settings=({navigation})=>{

    const navigasyon=useNavigation();
    [User,setuser]=useState([]);
    [Username,setusername]=useState("");
    [Userid,setuserid]=useState("");
    [Usermail,setusermail]=useState("");
    [Userphoto,setuserphoto]=useState("");
    [Text1,settext]=useState("");
    [Uyebilgileri,setuyebilgileri]=useState([]);


const geriyedontusu=()=>{
    navigasyon.navigate("Home")
}

    useEffect(()=>{   // NAVİGATİON SET OPTİONS 

        navigation.setOptions({
          headerStyle:{backgroundColor:"#01579B"},
          headerTitleAlign:"center",
          headerShadowVisible:true,
          title:"Settings",
          headerTintColor:"#FFBD59",
          headerTitleStyle:{fontSize:23,fontWeight:"bold"},
          headerLeft:()=><TouchableOpacity onPress={()=>geriyedontusu()} >
           <FontAwesomeIcon icon={faAngleDoubleLeft} color="#FFBD59" size={25}/></TouchableOpacity>,
        
    })
    
    })


    useEffect(()=>{   // Uye bilgilerini almak..
        let islem=true
      
        if(islem)
        {
          getCurrentUser = async () => {
            const currentUser = await GoogleSignin.getCurrentUser();
           await setuser(currentUser);
          await setuserid(currentUser.user.id);
           await setusermail(currentUser.user.email);
         const uyebilgileri1=firebase.database().ref("Users/"+Userid).child("account").once("value");
         const usernamesor=(await uyebilgileri1).child("username").exportVal();
         setusername(usernamesor[".value"]);
         const userphotosor=(await uyebilgileri1).child("userphoto").exportVal();
         setuserphoto(userphotosor[".value"]);
           console.log(Username+"/////"+ Userid );
          };
          getCurrentUser();
         
    }
    
      return()=>{
         islem=false;
      }
      
    },[])


    const changeusername=async()=>{
      
      if((await firebase.database().ref("Userlist").child(Text1).once("value")).exists()){

        alert("This username is adready use ! ")

      }
      // else if((await firebase.database().ref("Userlist/"+).child(Text1).once("value").exists()) && firebase.database().ref("Userlist") ){

      // }
      else{
          const Userlistguncelle2=(await firebase.database().ref("Userlist").once("value")).forEach(item=>{
            if(item.child("username").val()==Username){
                firebase.database().ref("Userlist/"+item.key).update({
                  username:Text1
                })
            }
          })

        // const Userlistguncelle=await firebase.database().ref("Userlist/"+Username).update({
        //   username:Text1
        // })
        const kendiuserguncelle=await firebase.database().ref("Users/"+Userid).child("account").update({
          username:Text1
        });
        const Friendsicindeguncelle= (await firebase.database().ref("Users").once("value")).forEach(item=>{if(item.child("Friends").exists()){

          if(item.child("Friends").child(Userid).exists()){
        
           firebase.database().ref("Users/"+item.key+"/Friends/"+Userid).update({
             username:Text1
           }) 
          }
        }});

  
    }

  }

const push=()=>{
  changeusername();
  alert("Succesfully saved !")
}

  return (
<SafeAreaView style={{flex:1}}>
<View style={{flexDirection:"row",marginLeft:10,marginTop:10}}>
<FontAwesomeIcon icon={faUser} color="#01579B" size={20}/>
    <Text style={{color:"#01579B",fontSize:17,marginLeft:5,fontWeight:"500"}}>Account İnfo</Text>
</View>
<View style={{marginTop:5}}>
<Divider/>
</View>
<View style={{flexDirection:"row",marginTop:10}}>
<View style={{alignItems:"center"}}>
<Avatar.Image marginLeft={5} size={60} source={{uri: Userphoto !=="" ? Userphoto : undefined }} />
</View>
<View style={{alignItems:"center"}}>
  <View style={{flexDirection:"column",marginLeft:-5}}>
  <View style={{flexDirection:"column",alignItems:"flex-start"}}>
    <Text style={{fontSize:15,fontWeight:"bold"}}>Username </Text>
    <View style={{flexDirection:'row'}}>
    <TextInput
      style={{height:28,width:"80%"}}
      placeholder={Username}
      value={Text1}
      onChangeText={text => settext(text)}
    />
    <TouchableOpacity onPress={()=>push()} style={{marginLeft:5}}>
    <FontAwesomeIcon icon={faSave} color="#01579B" size={27}/>
    </TouchableOpacity>
    </View>
    </View>
    <View style={{flexDirection:"row"}}>
    <Text style={{fontSize:15,fontWeight:"bold"}}>E-mail: </Text>
    <Text style={{fontSize:15}}>{Usermail}</Text>
    </View>
    <View style={{flexDirection:"row",marginTop:2}}>
    <Text style={{fontSize:15,fontWeight:"bold"}}>Id : </Text>
    <Text style={{fontSize:15}}>{Userid}</Text>
    </View>
    </View>
</View>

</View>
</SafeAreaView>
    )
}

export default Settings