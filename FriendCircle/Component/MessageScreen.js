import React, {useEffect, useCallback, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import styles from './Style';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, ScrollView, Pressable, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import UserChat from './UserChat';
import axios from 'axios';

const MessageScreen = ({route}) => {
  //above route and below useFocusEffect added for message screen refresh
  const {params} = route || {};
  useFocusEffect(
    useCallback(() => {
      // Trigger refresh on focus
      acceptedFriendsList();
      // You can call the function to refresh messages here
      if (params?.refresh) {
        params.refresh();
      }
    }, [params]),
  );

  const [Id, setId] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState({});
  const posterid = Id;
  const fetchedProfilePics = useRef(new Set());

  const fetchProfilepicByPosterId = async posterid => {
    if (fetchedProfilePics.current.has(posterid)) return; // Skip if already fetched

    try {
      const response = await axios.get(
        `http://10.0.2.2:5001/profilepic/${posterid}`,
      );
      console.log(response.data, 'Response from backend'); // Add this line for debugging

      if (response.data && response.data.posterid === posterid) {
        setProfileImageUrl(prevState => ({
          ...prevState,
          [posterid]: response.data.profileImageUrl,
        }));
        fetchedProfilePics.current.add(posterid); // Mark as fetched
      } else {
        'Profile image not found for poster ID:', posterid;
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  // useEffect(() => {
  //   if (Id) {
  //    fetchProfilepicByPosterId(Id);
  //       // Set up polling
  // //  const intervalId = setInterval(() => {
  // //   fetchProfilepicByPosterId(Id);
  // // }, 100000); // Poll every 1 seconds

  // // // Clean up the interval on component unmount
  // // return () => clearInterval(intervalId);

  //   }
  // }, [Id]);

  //for currentUserId
  const [currentUserId, setCurrentUserId] = useState(null);
  const [acceptedFriends, setAcceptedFriends] = useState([]); //added
  const navigation = useNavigation(); //added

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      console.log(token, 'token in home page');
      const decodedToken = jwtDecode(token);
      console.log(decodedToken, 'decodedToken in home page');
      const userId = decodedToken.userId;
      console.log(userId, 'userId');
      setCurrentUserId(userId);
    } catch (error) {
      console.log('error retrieving users', error);
    }
  };

  const acceptedFriendsList = async () => {
    if (!currentUserId) return; //added
    try {
      const response = await fetch(
        `http://10.0.2.2:5001/accepted-friends/${currentUserId}`,
      );
      const data = await response.json();

      if (response.ok) {
        setAcceptedFriends(data);
        data.forEach(friend => {
          fetchProfilepicByPosterId(friend._id);
        });
      } else {
        console.log('Error:', data);
      }
    } catch (error) {
      console.log(error, 'error showing the accepted friends');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      acceptedFriendsList();
    }
  }, [currentUserId]);

  console.log(currentUserId, 'this is checking of user id');
  console.log('friends kkl rahul', acceptedFriends);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{height: 40, width: 400}}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 5,
            textAlign: 'center',
          }}>
          Chats
        </Text>
      </View>

      <Pressable
        style={{borderTopWidth: 1, flexDirection: 'column', marginLeft: 12}}>
        {acceptedFriends.map((item, index) => (
          <View key={index} style={{flexDirection: 'row', marginVertical: 10}}>
           <TouchableOpacity  onPress={() =>
            navigation.navigate('UserProfile', {userId: item._id})}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginTop: 9,
                resizeMode: 'cover',
              }}
              source={
                profileImageUrl[item._id]
                  ? {uri: profileImageUrl[item._id]}
                  : require('../assets/avatar.png')
              }
            />
            </TouchableOpacity>
            <UserChat key={index} item={item} refresh={params?.refresh} />
          </View>
        ))}
      </Pressable>
    </ScrollView>
  );
};
export default MessageScreen;
//inside item ={params?. item}  the params?. is added for message refresh
