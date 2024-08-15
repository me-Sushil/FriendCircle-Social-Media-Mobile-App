import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const FriendRequest = ({
  item,
  friendRequests,
  setFriendRequests,
  currentUserId,
}) => {
  const [isFriend, setIsFriend] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkIfAlreadyFriend = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:5001/accepted-friends/${currentUserId}`,
        );
        const data = await response.json();

        // Check if the friend request sender is already a friend
        if (data.some(friend => friend._id === item._id)) {
          setIsFriend(true);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    checkIfAlreadyFriend();
  }, [currentUserId, item._id]);

  const acceptRequest = async friendRequestId => {
    try {
      const response = await fetch(
        'http://10.0.2.2:5001/friend-request/accept',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: currentUserId,
          }),
        },
      );
      if (response.ok) {
        setFriendRequests(
          friendRequests.filter(request => request._id !== friendRequestId),
        );

        navigation.navigate('Messages');
      }
    } catch (err) {
      console.log('error accepting the friend request', err);
    }
  };

  if (isFriend) {
    return null; // Do not render anything if the sender is already a friend
  }

  return (
    <Pressable  style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
    }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserProfile', {userId: item._id})}
       >
        {item ? (
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            size={100}
            source={{uri: item.profileImageUrl}}
          />
        ) : (
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            size={100}
            source={require('../assets/avatar.png')}
          />
        )}
      </TouchableOpacity>
      <Text style={{fontWeight: 'bold', fontSize: 14, marginLeft: 10, flex: 1}}>
        <Text style={{fontSize: 19, fontWeight: 'bold', color: 'black'}}>
          {item?.name}
        </Text>{' '}
        sent you a friend request!!!
      </Text>
      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{
          backgroundColor: '#001FBF',
          padding: 10,
          marginRight: -16,
          borderRadius: 6,
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};
export default FriendRequest;

const styles = StyleSheet.create({});
