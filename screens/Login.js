import React from 'react';
import { useEffect ,useState } from "react";

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    Image

  } from 'react-native';
 import { GoogleSignin ,statusCodes,GoogleSigninButton } from '@react-native-google-signin/google-signin';
 import auth from '@react-native-firebase/auth';
 import { firebase } from '@react-native-firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 
const Login= ({navigation})=>{

  useEffect(()=>{    // NAVİGATİON SET OPTİONS

    navigation.setOptions({
      headerStyle:{backgroundColor:"#01579B"},
      headerTitleAlign:"left",
      title:"",
      headerTransparent:true
    });
   

  })

  const stack1=createNativeStackNavigator();
  const navigasyon=useNavigation();
  [User,setuser]=useState([]);
  [giris,setlogin]=useState();
  

    signIn = async () => {
     try { 
     var zaman=new Date();
     var saat=new Date().getHours()+3;
     var month=new Date().getMonth()+1;
     
     await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    firebase.auth().signInWithCredential(googleCredential);
    const User1=await GoogleSignin.getCurrentUser();
    setuser(User1);
  const sorgu=firebase.database().ref("Users").once("value");
       console.log(User1);
       console.log(User1.user);

        if((await sorgu).hasChild(User1.user.id)){

          navigasyon.navigate("Home");
          console.log("UYE VAR");

        }
        else{
              const uyeekle=firebase.database().ref("Users/"+User1.user.id+"/account");
          uyeekle.set({
             username:User1.user.name,
             token:userInfo.idToken,
             id:userInfo.user.id,
             email:userInfo.user.email,
             lastsigntime:Date(),
             userphoto:userInfo.user.photo,
            });
            firebase.database().ref("Users/"+User1.user.id+"/Geolocation").set({
             i_longitude:0,
             i_latitude:0,
             izin:true,
             l_longitude:0,
             l_latitude:0,
             Tarih:zaman.getDate()+"/"+month+"/"+zaman.getFullYear()+" time: "+saat+":"+zaman.getMinutes(),
            });
            const userlist=firebase.database().ref("Userlist/");
            userlist.push({
              username:User1.user.name,
               id:User1.user.id,
               Email:User1.user.email,
               Userphoto:User1.user.photo,
            }).then(()=>navigasyon.navigate("Home"),console.log("Başarıyla set edildi."));
        }
        
     } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
       // user cancelled the login flow
     } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         // play services not available or outdated
      } else {
         console.log("Başka hata")
      }
     }
  };

  const accountchange=()=>{
    firebase.database().ref("Users/"+User1.user.id+"/Newaccount").set({
     username:User1.user.name,
     userphoto:User1.user.photo,
    id:User1.user.id
    }).then(navigasyon.navigate("Home"));

  }

  signOut = async () => {
    try {
      await GoogleSignin.signOut();
        setuser([]);
        console.log(User)
    //  this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    
  const isSignedIn = async () => {
    try{
      const isSignedIn = await GoogleSignin.isSignedIn();
     
      if(isSignedIn){
        console.log("OTURUM AÇIK")
        navigasyon.navigate("Home")
    //  setlogin(isSignedIn)
      }
      else{console.log("OTURUM AÇILMADI")};
     
    }
      catch(error){
        console.log(error);
      }
    }
    isSignedIn();

  
    
  })



useEffect(()=>{

  GoogleSignin.configure({
    webClientId: '78307876224-0gla3d5uapmph5rfkpuptpbti70l54hm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //  hostedDomain: '', // specifies a hosted domain restriction
  //    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  //    accountName: '', // [Android] specifies an account name on the device that should be used
  //    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  //    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  //   openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  //    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  },[]);


})

 
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#01579B",flexDirection:'column'}}>
      <View style={{alignItems:'center',height:"50%"}}>
    <Text style={styles.text}>SQUAD</Text>
    <Image source={require('../y5.png')}/>
     </View>
     <View style={{alignItems:'center',height:"50%"}}>
    <TouchableOpacity onPress={()=>signIn()} style={{marginTop:100,backgroundColor:"#FFBD59",padding:10,borderRadius:40,elevation:20}}>
    <Text style={{fontSize:25,textAlign:'center',fontWeight:"500"}}>Sign in with Google !</Text>
    </TouchableOpacity>
    </View>
   
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
text:{fontSize:45,fontWeight:"bold",marginTop:80,color:"#FFBD59",fontFamily:""},
})




export default Login