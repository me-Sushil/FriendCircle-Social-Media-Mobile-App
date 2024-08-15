import {Image,Text, Vibration,View, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import MessageScreen from './MessageScreen';
import FriendsScreen from './FriendsScreen';
import ProfileScreen from './ProfileScreen';
import UserChat from './UserChat';


const Tab = createBottomTabNavigator();
const Tabs = () => {

//added for message screen refresh
  const refreshUserChat = () => {
    // Logic to refresh UserChat, for example, calling fetchMessages again
    // This should be a function accessible in UserChat
  };

  return (
  
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
         
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/3917/3917032.png'
                  : 'https://cdn-icons-png.flaticon.com/128/3917/3917014.png',
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
      />
      
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/16069/16069717.png'
                  : 'https://cdn-icons-png.flaticon.com/128/16069/16069670.png',
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        initialParams={{ refresh: refreshUserChat }}//added for message screen refresh
        options={({route}) => ({
          tabBarStyle: {display: route.name === 'Post' ? 'none' : 'flex'},
          tabBarIcon: ({focused}) => (
            <View>
            {/* <View style={styles.unreadv}>
          <Text style={styles.unread}>11</Text>
        </View> */}
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/8034/8034109.png'
                  : 'https://cdn-icons-png.flaticon.com/128/8034/8034087.png',
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
            </View>
          ),
        })}
      />

      {/* <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/3917/3917717.png'
                  : 'https://cdn-icons-png.flaticon.com/128/3917/3917698.png',
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
      /> */}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={{
                uri: focused
                  ? 'https://cdn-icons-png.flaticon.com/128/3917/3917705.png'
                  : 'https://cdn-icons-png.flaticon.com/128/3917/3917559.png',
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
      />
    </Tab.Navigator>
    
  );
};



const styles = StyleSheet.create({
  unreadv: {
    position: 'absolute',
    backgroundColor: '#ff3250',
    right: -5,
    marginTop:-3,
    marginRight:-6,
    top: -5,
    borderRadius: 25,
    width: 25,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },

  unread: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Tabs;
