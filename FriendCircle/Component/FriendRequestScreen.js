import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FriendRequest from './FriendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
const FriendRequestScreen = ({route}) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const token = AsyncStorage.getItem('token');
  console.log(token, 'token');

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    if (currentUserId) {
      fetchFriendRequests();
    }
  }, [currentUserId]);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5001/friend-request/${currentUserId}`,
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map(friendRequest => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          profileImageUrl: friendRequest.profileImageUrl,
        }));
        console.log(friendRequestsData, 'friend Request');
        setFriendRequests(friendRequestsData);
      }
    } catch (err) {
      console.log('error message', err);
    }
  };
  console.log(friendRequests);

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
    <View style={{padding: 10, marginHorizontal: 12}}>
      {friendRequests.length > 0 && <Text>Your Friend Request!</Text>}

      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
          currentUserId={currentUserId}
        />
      ))}
    </View>
    </ScrollView>
  );
};
export default FriendRequestScreen;

const styles = StyleSheet.create({});
