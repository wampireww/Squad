/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Massage from './screens/Massage';
import { check, openSettings, PERMISSIONS, request  } from 'react-native-permissions';
import { Notifications ,Notification ,Registered,RegistrationError} from 'react-native-notifications';
import Settings from './screens/Settings';



const stack=createNativeStackNavigator();

const App=() => {

  const androidlocationizni=Platform.select({android:PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION})
  request(androidlocationizni).then((result)=>{if(result=="blocked"){alert("This app requeire your location permission please go settings and allow location permission."),
openSettings().catch(e=>console.log(e))}else{console.log(result)}})


  return (
  
    <NavigationContainer>
  <stack.Navigator initialRouteName='Login'>
<stack.Screen name='Login' component={Login} />
<stack.Screen name='Home' component={Home} />
<stack.Screen name='Massage' component={Massage} />
<stack.Screen name='Settings' component={Settings} />
  </stack.Navigator>
    </NavigationContainer>
  
  );
};



export default App;
