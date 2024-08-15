import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './Component/Main';
import Register from './Component/Register';
import Login from './Component/Login';
import FriendRequestScreen from './Component/FriendRequestScreen';
import FriendsScreen from './Component/FriendsScreen';
import MessageScreen from './Component/MessageScreen';
import ChatMessagesScreen from './Component/ChatmessagesScreen';
import UserChat from './Component/UserChat';
import Header from './Component/Header';
import UserProfile from './Component/UserProfile';
import OTPVerificationScreen from './Component/OTPVerificationScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTPVerificationScreen"
          component={OTPVerificationScreen}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen name="FriendRequest" component={FriendRequestScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Messages" component={MessageScreen} />
        <Stack.Screen name="Chats" component={ChatMessagesScreen} />
        <Stack.Screen name="Message" component={UserChat} />
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="UserProfile" component={UserProfile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
