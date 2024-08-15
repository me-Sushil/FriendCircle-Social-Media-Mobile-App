import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import UserProfile from './UserProfile';
const {jwtDecode} = require('jwt-decode');

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
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
      setUserId(userId);
      const response = await axios.get(`http://10.0.2.2:5001/users/${userId}`);
      console.log(response.data, 'response.data mama kl');
      setUsers(response.data);
    } catch (error) {
      console.log('error retrieving users', error);
    }
  };

  useEffect(() => {
    console.log('herere');
    fetchUsers();
  }, []);
  console.log('users', users);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://10.0.2.2:5001/accepted-friends/${userId}`,
          );
          setFriends(response.data);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [userId]);

  const [friendsProfilePic, setFriendsProfilePic] = useState([]);
  useEffect(() => {
    if (userId) {
      fetchFriendsProfilePic();
    }
  }, [userId]);
  const fetchFriendsProfilePic = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5001/accepted-friends/${userId}`,
      );
      if (response.status === 200) {
        const profileImageUrlData = response.data.map(friendsProfilePic => ({
          profileImageUrl: friendsProfilePic.profileImageUrl,
        }));
        console.log(profileImageUrlData, 'friend Request');
        setFriendsProfilePic(profileImageUrlData);
      }
    } catch (err) {
      console.log('error message', err);
    }
  };
  console.log(friendsProfilePic);

  const renderItem = ({item}) => (
    <View style={styles.friendContainer}>
      <TouchableOpacity onPress={() =>
            navigation.navigate('UserProfile', {userId: item._id})} >
      <Image style={styles.friendImage} source={{uri: item.profileImageUrl}} />
      </TouchableOpacity>
      <View style={{marginLeft: 11, width: 222, marginRight: 12}}>
        <Text style={{color: 'black', fontSize: 17, paddingBottom: 17}}>
          {item.name}
        </Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Messages', {userId: item._id})}
        style={{
          backgroundColor: '#001FBF',
          padding: 10,
          marginStart: 16,
          //marginEnd:11,
          borderRadius: 6,
          width: 70,
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
          Chat
        </Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={friends}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      contentContainerStyle={{paddingVertical: 20}}
    />
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 5,
  },
});
