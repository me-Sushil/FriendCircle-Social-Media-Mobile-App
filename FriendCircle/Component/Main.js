import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Tabs from './Tabs';
const Stack = createNativeStackNavigator();
const Main = () => {

  return (
    
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
        
        <Stack.Screen name="home" component={Tabs} />
      
      </Stack.Navigator>
      
  );
};
export default Main;
