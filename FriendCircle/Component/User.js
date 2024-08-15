// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   Image,
//   View,
//   ScrollView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import axios from 'axios';

// const User = ({item, Id}) => {
//   const [profileImageUrl, setProfileImageUrl] = useState('');
//   const posterid = item._id;

//   const fetchProfilepicByPosterId = async () => {
//     try {
//       const response = await axios.get(
//         `http://10.0.2.2:5001/profilepic/${posterid}`,
//       );
//       console.log(response.data, 'Response from backend'); // Add this line for debugging

//       if (response.data && response.data.posterid === posterid) {
//         setProfileImageUrl(response.data.profileImageUrl);
//         console.log(response.data.profileImageUrl, 'Profile image URL');
//       } else {
//         ('Profile image not found for poster ID:', posterid);
//       }
//     }
//       catch (error) {
//       console.error('Error fetching posts:', error);
//       throw error;
//     }
//   };

//   useEffect(() => {

//       fetchProfilepicByPosterId();

//   }, [posterid]);

//   const [requestSent, setRequestSent] = useState(false);
//   const sendFriendRequest = async (currentUserId, selectedUserId) => {
//     try {
//       const response = await fetch('http://10.0.2.2:5001/friend-request', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({currentUserId, selectedUserId}),
//       });
//       if (response.ok) {
//         setRequestSent(true);
//       }
//     } catch (error) {
//       console.log('error message', error);
//     }
//   };
//   return (
//     <ScrollView showsVerticalScrollIndicator={true}>
//       <Pressable
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//           marginTop: 0,
//         }}>
//         <View>
//           {/* <Image
//           style={{width: 50, height: 50, borderRadius: 25, resizeMode: 'cover'}}
//           size={100}
//           source={require('../assets/avatar.png')}
//         /> */}

//           {profileImageUrl ? (
//             <Image
//               style={{width: 50, height: 50, borderRadius: 25, resizeMode: 'cover'}}
//               size={100}
//               source={{uri: profileImageUrl}}
//             />
//           ) : (
//             <Image
//               style={{
//                 width: 50,
//                 height: 50,
//                 borderRadius: 25,
//                 marginTop: 3,
//                 resizeMode: 'cover',
//               }}
//               size={100}
//               source={require('../assets/avatar.png')}
//             />
//           )}
//         </View>
//         <View style={{marginLeft: 12, flex: 1}}>
//           <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
//             {item?.name}
//           </Text>
//           <Text style={{marginTop: 3, fontSize: 15}}>{item?.email}</Text>
//         </View>
//         <Pressable
//           onPress={() => sendFriendRequest(Id, item._id)}
//           style={{
//             backgroundColor: '#001FBF',
//             padding: 10,
//             borderRadius: 6,
//             width: 105,
//           }}>
//           <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
//             Add Friend
//           </Text>
//         </Pressable>
//       </Pressable>
//     </ScrollView>
//   );
// };

// export default User;

// const style = StyleSheet.create({});

import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import UserProfile from './UserProfile';

const User = ({item, Id, navigation}) => {
  // const UserProfile = () => {
  //   navigation.navigate('UserProfile');
  // };

  //navigation added
  const [receivedRequest, setReceivedRequest] = useState(false); // Track if the current user has received a friend request from this user//added for view accept in search friend
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isFriend, setIsFriend] = useState(false);
  const posterid = item._id;

  const fetchProfilepicByPosterId = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5001/profilepic/${posterid}`,
      );
      console.log(response.data, 'Response from backend'); // Add this line for debugging

      if (response.data && response.data.posterid === posterid) {
        setProfileImageUrl(response.data.profileImageUrl);
        console.log(response.data.profileImageUrl, 'Profile image URL');
      } else {
        'Profile image not found for poster ID:', posterid;
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // throw error;
    }
  };

  const checkIfFriend = async (currentUserId, selectedUserId) => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5001/user/${currentUserId}`,
      );
      const friends = response.data.friends || [];
      const sentFriendRequests = response.data.sentFriendRequests || []; //added for view accept in search friend
      if (friends.includes(selectedUserId)) {
        setIsFriend(true);
        console.log('kklsanam', isFriend);
      } else if (sentFriendRequests.includes(selectedUserId)) {
        //added for view accept in search friend
        setRequestSent(true);
      }
    } catch (error) {
      console.error('Error checking if friend:', error);
    }
  };

  // Function to check if a friend request is received
  const checkFriendRequestReceived = async (currentUserId, selectedUserId) => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5001/user/${currentUserId}`,
      );
      const friendRequests = response.data.friendRequests || [];

      if (friendRequests.includes(selectedUserId)) {
        setReceivedRequest(true);
      }
    } catch (error) {
      console.error('Error checking friend request received:', error);
    }
  };

  useEffect(() => {
    fetchProfilepicByPosterId();
    checkIfFriend(Id, item._id);
    checkFriendRequestReceived(Id, item._id); // Call the function to check friend request received
  }, [posterid, Id, item._id]);

  const [requestSent, setRequestSent] = useState(false);
  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch('http://10.0.2.2:5001/friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({currentUserId, selectedUserId}),
      });
      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log('error message', error);
    }
  };

  const cancelFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(
        'http://10.0.2.2:5001/friend-request/cancel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({currentUserId, selectedUserId}),
        },
      );
      if (response.ok) {
        setRequestSent(false);
      } else {
        console.error(
          'Failed to cancel friend request:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.log('error message', error);
    }
  };

  //added for view accept in search friend
  const acceptFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(
        'http://10.0.2.2:5001/friend-request/accept',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: currentUserId,
            recepientId: selectedUserId,
          }),
        },
      );
      if (response.ok) {
        setIsFriend(true);
        setReceivedRequest(false); // Reset received request state
      } else {
        console.error(
          'Failed to accept friend request:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.log('error message', error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          marginTop: 0,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserProfile', {userId: item._id})
          }>
          <View>
            {profileImageUrl ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  resizeMode: 'cover',
                }}
                size={100}
                source={{uri: profileImageUrl}}
              />
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 3,
                  resizeMode: 'cover',
                }}
                size={100}
                source={require('../assets/avatar.png')}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={{marginLeft: 12, flex: 1}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            {item?.name}
          </Text>
          <Text style={{marginTop: 3, fontSize: 15}}>{item?.email}</Text>
        </View>

        {isFriend ? (
          <Pressable
            onPress={() => navigation.navigate('Messages', {userId: item._id})}
            style={{
              backgroundColor: '#001FBF',
              padding: 10,
              borderRadius: 6,
              width: 80,
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
              Chat
            </Text>
          </Pressable>
        ) : receivedRequest ? ( // Show "Accept" button if friend request is received
          <Pressable
            onPress={() => acceptFriendRequest(Id, item._id)}
            style={{
              backgroundColor: '#008000',
              padding: 10,
              borderRadius: 6,
              width: 80,
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
              Accept
            </Text>
          </Pressable>
        ) : requestSent ? (
          <Pressable
            onPress={() => cancelFriendRequest(Id, item._id)}
            style={{
              backgroundColor: '#001FBF',
              padding: 10,
              borderRadius: 6,
              width: 115,
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
              Cancel Request
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => sendFriendRequest(Id, item._id)}
            style={{
              backgroundColor: '#001FBF',
              padding: 10,
              borderRadius: 6,
              width: 105,
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
              Add Friend
            </Text>
          </Pressable>
        )}

        {/* <Pressable
          onPress={() => sendFriendRequest(Id, item._id)}
          style={{
            backgroundColor: '#001FBF',
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
            Add Friend
          </Text>
        </Pressable> */}
      </Pressable>
    </ScrollView>
  );
};
export default User;
const style = StyleSheet.create({});
