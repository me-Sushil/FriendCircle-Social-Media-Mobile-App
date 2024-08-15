// import {StyleSheet, Text, View, Pressable} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {jwtDecode} from 'jwt-decode';
// import {useNavigation} from '@react-navigation/native';
// import ChatMessagesScreen from './ChatmessagesScreen';

// const UserChat = ({item, refresh}) => {
// //if(!item) and above refresh added for message refresh
//   if (!item) {
//     return null; // Or return a placeholder or loading indicator
//   }

//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const token = AsyncStorage.getItem('token');
//   const navigation = useNavigation();

//   const fetchUsers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }
//       //console.log(token, 'token in home page');
//       const decodedToken = jwtDecode(token);
//       //console.log(decodedToken, 'decodedToken in home page');
//       const userId = decodedToken.userId;
//       //console.log(userId, 'userId');
//       setCurrentUserId(userId);
//     } catch (error) {
//       console.log('error retrieving users', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch(
//         `http://10.0.2.2:5001/messages/${currentUserId}/${item._id}`,
//       );
//       const data = await response.json();

//       if (response.ok) {
//         setMessages(data);
//       } else {
//         console.log('error showing messages', response.status.message);
//       }
//     } catch (error) {
//       console.log('error fetching messages', error);
//     }
//   };

//   useEffect(() => {
//     if (currentUserId && item._id) {
//       fetchMessages();
//     }
//     // fetchMessages();
//   }, [currentUserId, item._id]); //currentUserId, item._id
//   console.log(messages, 'this is messages');

// //Start for message screen refresh
//   useEffect(() => {
//     // Call fetchMessages to refresh messages
//     if (refresh) {
//       refresh(fetchMessages);
//       getLastMessage();
//     }
//   }, [refresh]);

// //end 

//   const getLastMessage = () => {
//     const userMessages = messages.filter(
//       message => message.messageType === 'text',
//     );
//     const n = userMessages.length;
//     return userMessages[n - 1];
//   };
//   const lastmessage = getLastMessage();
//   console.log(lastmessage);

//   useEffect(() => {
   
//     getLastMessage();
 
//   }, [lastmessage]);


//   // useEffect(() => {
//   //   //getLastMessage();
//   //       // Set up polling
//   //  const intervalId = setInterval(() => {
//   //   getLastMessage();
//   // }, 100); // Poll every 10 seconds

//   // // Clean up the interval on component unmount
//   // return () => clearInterval(intervalId);

//   // }, [lastmessage]);

//   const formatTime = time => {
//     const options = {hour: 'numeric', minute: 'numeric'};
//     return new Date(time).toLocaleString('en-US', options);
//   };

//   useEffect(() => {
//     formatTime();
//   }, []);

//   return (
//     <Pressable
//       onPress={
//         () => navigation.navigate('Chats', {recepientId: item._id, item: item}) //',{ item: item, recepientId: item._id })
//       }
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: 325,
//         gap: 10,
//         borderWidth: 0.7,
//         borderColor: '#D0D0D0',
//         borderTopWidth: 0,
//         borderLeftWidth: 0,
//         borderRightWidth: 0,
//         padding: 1,
//         marginLeft: 13,
//       }}>
//       <View style={{flex: 1}}>
//         <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
//           {item.name}
//         </Text>
//         {lastmessage && (
//           <Text
//             style={{
//               marginTop: 3,
//               color: 'gray',
//               fontWeight: '500',
//               marginLeft: 5,
//             }}>
//             {lastmessage?.message}
//           </Text>
//         )}
//       </View>
//       <View>
//         <Text style={{fontWeight: '400', fontSize: 11, color: '#585858'}}>
//           {lastmessage && formatTime(lastmessage?.timeStamp)}
//         </Text>
//       </View>
//     </Pressable>
//   );
// };

// export default UserChat;

// const styles = StyleSheet.create({});



import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';
import ChatMessagesScreen from './ChatmessagesScreen';
import UserProfile from './UserProfile';

const UserChat = ({item, refresh}) => {



//if(!item) and above refresh added for message refresh
  if (!item) {
    return null; // Or return a placeholder or loading indicator
  }

  const [currentUserId, setCurrentUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const token = AsyncStorage.getItem('token');
  const navigation = useNavigation();

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      //console.log(token, 'token in home page');
      const decodedToken = jwtDecode(token);
      //console.log(decodedToken, 'decodedToken in home page');
      const userId = decodedToken.userId;
      //console.log(userId, 'userId');
      setCurrentUserId(userId);
    } catch (error) {
      console.log('error retrieving users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:5001/messages/${currentUserId}/${item._id}`,
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log('error showing messages', response.status.message);
      }
    } catch (error) {
      console.log('error fetching messages', error);
    }
  };

  useEffect(() => {
    if (currentUserId && item._id) {
      fetchMessages();
    }
    // fetchMessages();
  }, [currentUserId, item._id]); //currentUserId, item._id
  console.log(messages, 'this is messages');

//Start for message screen refresh
  useEffect(() => {
    // Call fetchMessages to refresh messages
    if (refresh) {
      refresh(fetchMessages);
      getLastMessage();
    }
  }, [refresh]);

//end 

  const getLastMessage = () => {
    const userMessages = messages.filter(
      message => message.messageType === 'text',
    );
    const n = userMessages.length;
    return userMessages[n - 1];
  };
  const lastmessage = getLastMessage();
  console.log(lastmessage);

  useEffect(() => {
   
    getLastMessage();
    refreshScreen();
  }, [lastmessage]);


  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     getLastMessage();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [lastmessage]);


  const refreshScreen = () => {
    fetchMessages ();
  };

  // useEffect(() => {
  //   //getLastMessage();
  //       // Set up polling
  //  const intervalId = setInterval(() => {
  //   getLastMessage();
  // }, 100); // Poll every 10 seconds

  // // Clean up the interval on component unmount
  // return () => clearInterval(intervalId);

  // }, [lastmessage]);

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  useEffect(() => {
    formatTime();
  }, []);

  return (
    <Pressable
      onPress={
        () => navigation.navigate('Chats', {recepientId: item._id, item: item}) //',{ item: item, recepientId: item._id })
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: 325,
        gap: 10,
        borderWidth: 0.7,
        borderColor: '#D0D0D0',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 1,
        marginLeft: 13,
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
          {item.name}
        </Text>
        {lastmessage && (
          <Text
            style={{
              marginTop: 3,
              color: 'gray',
              fontWeight: '500',
              marginLeft: 5,
            }}>
            {lastmessage?.message}
          </Text>
        )}
      </View>
      <View>
        <Text style={{fontWeight: '400', fontSize: 11, color: '#585858'}}>
          {lastmessage && formatTime(lastmessage?.timeStamp)}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
