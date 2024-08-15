// import {
//   StyleSheet,
//   Text,
//   Image,
//   Pressable,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import axios from 'axios';
// import React, {useEffect, useLayoutEffect, useState} from 'react';
// import {TextInput} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {jwtDecode} from 'jwt-decode';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
// const ChatMessagesScreen = () => {
//   const [messageId, setMessageId] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [recepientData, setRecepientData] = useState();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {item} = route.params;
//   const {recepientId} = route.params;
//   const [message, setMessage] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [selectedImage, setSelectedImage] = useState('');
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const token = AsyncStorage.getItem('token');
//   console.log(item, 'kjlhouflrbn LJFGf47t48959ujrhv7f ');
//   //console.log(currentUserId, ' this is currentUser Id of sushil app');

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
//   }, [currentUserId]);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch(
//         `http://10.0.2.2:5001/messages/${currentUserId}/${recepientId}`,
//       );
//       const data = await response.json();

//       if (response.ok) {
//         setMessages(data);
//         setMessageId(data._id);
//         console.log(data._id,"hfhfhfh");
//         console.log(data, 'this is frontend image urrl show');

//       } else {
//         console.log('error showing messages', response.status.message);
//       }
//     } catch (error) {
//       console.log('error fetching messages', error);
//     }
//   };

//   console.log('error fetching messagesoooo', messageId);

//   useEffect(() => {
//     fetchMessages();

//   }, [currentUserId, recepientId]);

//   // useEffect(() => {
//   //   //fetchMessages();
//   //       // Set up polling
//   //  const intervalId = setInterval(() => {
//   //   fetchMessages();
//   // }, 100); // Poll every 10 seconds

//   // // Clean up the interval on component unmount
//   // return () => clearInterval(intervalId);
//   // }, [currentUserId, recepientId]);

//   useEffect(() => {
//     const fetchRecepientData = async () => {
//       try {
//         const response = await fetch(
//           `http://10.0.2.2:5001/user/${recepientId}`,
//         );
//         const data = await response.json();

//         console.log(data.name, 'this is sajal saroj');
//         setRecepientData(data);
//       } catch (error) {
//         console.log(error, 'error retrieving details');
//       }
//     };
//     fetchRecepientData();
//   }, []);

//   //START
//   const handelSend = async messageType => {
//     console.log(imageUrl, 'this this this sssss');
//     try {
//       let messageText;
//       let image;

//       if (messageType === 'image') {
//         image = imageUrl;
//       } else if (messageType === 'text') {
//         messageText = message;
//       }
//       const messageData = {
//         senderId: currentUserId,
//         recepientId: recepientId,
//         messageType: messageType,
//         message: messageText || '',
//         image: imageUrl  || '',

//       };

//       console.log('Sending message data nnn:', messageData);
//       const response = await axios.post(
//         'http://10.0.2.2:5001/messages',
//         messageData,
//       );

//       if (response.status === 200) {
//         setMessage('');
//         setSelectedImage('');
//         fetchMessages('');
//         setImageUrl('');

//       } else {
//         console.log('Failed to send message:', response.data);
//       }
//     } catch (error) {
//       console.log(error, 'error in sending the message');
//     }
//   };

//   console.log('this is testing messages', messages);
//   console.log(recepientData, 'this is recepient data okkkk');
//   console.log('this is ss testing imageurl', imageUrl);

//   //END

//   //start of message delete after seen

//   const markMessageAsSeen = async (messageId) => {
//     try {
//       const response = await axios.patch(`http://10.0.2.2:5001/messages/${messageId}/seen`);
//       if (response.status === 200) {
//         console.log("Message marked as seen");
//       } else {
//         console.log("Failed to mark message as seen:", response.data);
//       }
//     } catch (error) {
//       console.log("Error marking message as seen:", error);
//     }
//   };

//   // Call this function when the receiver views the message
//   markMessageAsSeen(messageId);

//   //end of message delete after seen

//   useLayoutEffect(() => {
//     return navigation.setOptions({
//       headerTitle: item.name,
//       headerLeft: () => {
//         <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
//           {/* <Image
//             source={{
//               uri:  recepientData?.profileImageUrl || '../assets/avatar.png',
//             }}
//             style={{width: 24, height: 24}}
//           /> */}
//         </View>;
//       },
//     });
//   }, []);

//   const formatTime = time => {
//     const options = {hour: 'numeric', minute: 'numeric'};
//     return new Date(time).toLocaleString('en-US', options);
//   };

//   const pickImage = async () => {
//     const options = {
//       mediaType: 'photo',
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//       includeBase64: false, // add this if you need the base64 representation
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else {
//         console.log('Image URI: ', response.assets[0].uri);
//         console.log('Image', response);
//         const imageUri = response.uri || response.assets?.[0]?.uri;
//         setImageUrl(imageUri);
//         //setSelectedImage(imageUri);
//       }
//     });
//   };
//   console.log('this is image picker data', imageUrl);
//   return (
//     <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#F0F0F0'}}>
//       <ScrollView>
//         {messages.map((item, index) => {
//           if (item.messageType === 'text') {
//             return (
//               <Pressable
//                 key={index}
//                 style={[
//                   item?.senderId?._id === currentUserId
//                     ? {
//                         alignSelf: 'flex-end',
//                         backgroundColor: '#DCF8C6',
//                         padding: 6,
//                         maxWidth: '70%',
//                        // borderRadius: 7,
//                        marginLeft:5,
//                       // marginRight:5,
//                         margin: 1,
//                       }
//                     : {
//                         alignSelf: 'flex-end',
//                         backgroundColor: 'white',
//                         padding: 6,
//                         margin: 1,
//                        // borderRadius: 7,
//                        marginLeft:5,
//                        //marginRight:5,
//                         maxWidth: '70%',
//                       },
//                 ]}>
//                 <Text style={{fontSize: 15, textAlign: 'left', marginRight:5, marginLeft:5, color: 'black'}}>
//                   {item?.message}
//                 </Text>
//                 {item.imageUrl && (
//                 <Image
//                     source={{uri: item.imageUrl}}
//                     style={{width: 300, height: 300, borderRadius: 8}}
//                   />)}
//                 <Text
//                   style={{
//                     textAlign: 'right',
//                     fontSize: 11,
//                     color: 'gray',
//                     marginTop: 5,
//                   }}>
//                   {formatTime(item.timeStamp)}
//                 </Text>
//               </Pressable>
//             );
//           }
//         //   if (item.messageType === 'image') {
//         //     return (
//         //       <Pressable
//         //         key={index}
//         //         style={[
//         //           item?.senderId?._id === currentUserId
//         //             ? {
//         //                 alignSelf: 'flex-end',
//         //                 backgroundColor: '#DCF8C6',
//         //                 padding: 8,
//         //                 maxWidth: '60%',
//         //                 borderRadius: 7,
//         //                 margin: 10,
//         //               }
//         //             : {
//         //                 alignSelf: 'flex-end',
//         //                 backgroundColor: 'white',
//         //                 padding: 8,
//         //                 margin: 10,
//         //                 borderRadius: 7,
//         //                 maxWidth: '60%',
//         //               },
//         //         ]}>
//         //         <View>
//         //           <Image
//         //             source={{uri: item.imageUrl}}
//         //             style={{width: 200, height: 200, borderRadius: 7}}
//         //           />
//         //           <Text
//         //             style={{
//         //               textAlign: 'right',
//         //               fontSize: 9,
//         //               position: 'absolute',
//         //               color: 'gray',
//         //               right: 10,
//         //               bottom: 7,
//         //               marginTop: 5,
//         //             }}>
//         //             {formatTime(item?.timeStamp)}
//         //           </Text>
//         //         </View>
//         //       </Pressable>
//         //     );
//         //   }
//          })}

//         <View style={{marginStart: 11}}>
//           {imageUrl && (
//             <Image
//               source={{
//                 // uri: imageUrl.uri,
//                 uri: imageUrl,
//               }}
//               style={{
//                 marginStart: 177,
//                 marginTop: 61,
//                 width: 200,
//                 height: 200,
//                 borderRadius: 7,
//               }}
//             />
//           )}
//         </View>
//       </ScrollView>

//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingHorizontal: 10,
//           paddingVertical: 10,
//           borderTopWidth: 1,
//           borderTopColor: '#dddddd',
//           marginBottom: 25,
//         }}>
//         {/* <Image  source={require('../assets/logo.png')} size={24}/>*/}
//         <TextInput
//           value={message}
//           onChangeText={text => setMessage(text)}
//           style={{
//             flex: 1,
//             height: 40,
//             borderWidth: 1,
//             borderColor: '#dddddd',
//             borderRadius: 0,
//             paddingHorizontal: 10,
//           }}
//           placeholder="Type your message..."
//         />

//         {/* <View style={{marginStart: 11}}>
//           {imageUrl && (
//             <Image
//               source={{
//                 // uri: imageUrl.uri,
//                 uri: imageUrl,
//               }}
//               style={{
//                 marginTop: -261,
//                 width: 200,
//                 height: 200,
//                 borderRadius: 7,
//               }}
//             />
//           )}
//         </View> */}

//         <Pressable
//           onPress={pickImage}
//           style={{
//             backgroundColor: '#000000',
//             paddingVertical: 11,
//             paddingHorizontal: 15,
//             borderRadius: 5,
//             marginLeft: 5,
//           }}>
//           <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
//             II
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={() => handelSend('text')}
//           style={{
//             backgroundColor: '#007bff',
//             paddingVertical: 11,
//             paddingHorizontal: 15,
//             borderRadius: 5,
//             marginLeft: 5,
//           }}>
//           <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
//             Send
//           </Text>
//         </Pressable>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default ChatMessagesScreen;

// const styles = StyleSheet.create({});






// //SECOND TIME FOR REFRESH MESSAGE 
// import {
//   StyleSheet,
//   Text,
//   Image,
//   Pressable,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import axios from 'axios';
// import React, {useEffect, useLayoutEffect, useState} from 'react';
// import {TextInput} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {jwtDecode} from 'jwt-decode';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';

// const ChatMessagesScreen = () => {
//   const [messageId, setMessageId] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [recepientData, setRecepientData] = useState();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {item} = route.params;
//   const {recepientId} = route.params;
//   const [message, setMessage] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [selectedImage, setSelectedImage] = useState('');
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const token = AsyncStorage.getItem('token');
//   console.log(item, 'kjlhouflrbn LJFGf47t48959ujrhv7f ');

//   const fetchUsers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken.userId;
//       setCurrentUserId(userId);
//     } catch (error) {
//       console.log('error retrieving users', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [currentUserId]);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch(
//         `http://10.0.2.2:5001/messages/${currentUserId}/${recepientId}`,
//       );
//       const data = await response.json();

//       if (response.ok) {
//         setMessages(data);
//         console.log('error fetching messagesoooo', data);
//         data.forEach(message => {
//           const messageId = message._id;
//           setMessageId(messageId);
//           console.log('Message ID:', messageId);
//           if (!message.isSeen && message.recepientId._id === currentUserId) {
//             markMessageAsSeen(message._id);
//           }
//         });
//       } else {
//         console.log('error showing messages', response.status.message);
//       }
//     } catch (error) {
//       console.log('error fetching messages', error);
//     }
//   };

//   console.log('error fetching messagesoooo', messageId);

//   useEffect(() => {
//     fetchMessages();
//   }, [currentUserId, recepientId]);

//   // useEffect(() => {
//   //   fetchMessages();
//   //   // Set up polling
//   //   const intervalId = setInterval(() => {fetchMessages();}, 10000); // Poll every 10 seconds
    
//   //   // Clean up the interval on component unmount
//   //   return () => clearInterval(intervalId);
//   // }, []);

//   useEffect(() => {
//     const fetchRecepientData = async () => {
//       try {
//         const response = await fetch(
//           `http://10.0.2.2:5001/user/${recepientId}`,
//         );
//         const data = await response.json();

//         console.log(data.name, 'this is sajal saroj');
//         setRecepientData(data);
//       } catch (error) {
//         console.log(error, 'error retrieving details');
//       }
//     };
//     fetchRecepientData();
//   }, []);

//   //START
//   const handelSend = async messageType => {
//     console.log(imageUrl, 'this this this sssss');
//     try {
//       let messageText;
//       let image;

//       if (messageType === 'image') {
//         image = imageUrl;
//       } else if (messageType === 'text') {
//         messageText = message;
//       }
//       const messageData = {
//         senderId: currentUserId,
//         recepientId: recepientId,
//         messageType: messageType,
//         message: messageText || '',
//         image: imageUrl || '',
//       };

//       console.log('Sending message data nnn:', messageData);
//       const response = await axios.post(
//         'http://10.0.2.2:5001/messages',
//         messageData,
//       );

//       if (response.status === 200) {
//         setMessage('');
//         setSelectedImage('');
//         fetchMessages('');
//         setImageUrl('');
//       } else {
//         console.log('Failed to send message:', response.data);
//       }
//     } catch (error) {
//       console.log(error, 'error in sending the message');
//     }
//   };

//   console.log('this is testing messages', messages);
//   console.log(recepientData, 'this is recepient data okkkk');
//   console.log('this is ss testing imageurl', imageUrl);

//   //END

//   //start of message delete after seen

//   const markMessageAsSeen = async messageId => {
//     try {
//       const res = await axios.patch(
//         `http://10.0.2.2:5001/messagesa/${messageId}/seen`,
//       );
//       if (res.status === 200) {
//         console.log('Message marked as seen');
//         // fetchMessages();
//          setTimeout(async () => {
//           try {
//             console.log('Attempting to delete message with ID:', messageId);
           
//             if (res.status === 200) {
//               console.log('Message deleted successfully');
//               fetchMessages(); // Fetch messages again after deletion
//             } else {
//               console.log('Failed to delete message:', res.status);
//             }
//           } catch (error) {
//             console.log('Error deleting message:', error);
           
//           }
//         }, 0); 
//       } else {
//         console.log('Failed to mark message as seen:', res.data);
//       }
//     } catch (error) {
//       console.log('Error marking message as seen:', error);
//     }
//   };


//   //end of message delete after seen

//   useLayoutEffect(() => {
//     return navigation.setOptions({
//       headerTitle: item.name,
//       headerLeft: () => {
//         <View
//           style={{flexDirection: 'row', alignItems: 'center', gap: 10}}></View>;
//       },
//     });
//   }, []);

//   const formatTime = time => {
//     const options = {hour: 'numeric', minute: 'numeric'};
//     return new Date(time).toLocaleString('en-US', options);
//   };

//   const pickImage = async () => {
//     const options = {
//       mediaType: 'photo',
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//       includeBase64: false, // add this if you need the base64 representation
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else {
//         console.log('Image URI: ', response.assets[0].uri);
//         console.log('Image', response);
//         const imageUri = response.uri || response.assets?.[0]?.uri;
//         setImageUrl(imageUri);
//       }
//     });
//   };
//   console.log('this is image picker data', imageUrl);
//   return (
//     <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#F0F0F0'}}>
//       <ScrollView>
//         {messages.map((item, index) => {
//           if (item.messageType === 'text') {
//             return (
//               <Pressable
//                 key={index}
//                 style={[
//                   item?.senderId?._id === currentUserId
//                     ? {
//                         alignSelf: 'flex-end',
//                         backgroundColor: '#DCF8C6',
//                         padding: 6,
//                         maxWidth: '70%',
//                         marginLeft: 5,
//                         margin: 1,
//                       }
//                     : {
//                         alignSelf: 'flex-start',
//                         backgroundColor: 'white',
//                         padding: 6,
//                         margin: 1,
//                         marginLeft: 5,
//                         maxWidth: '70%',
//                       },
//                 ]}>
//                 <Text
//                   style={{
//                     fontSize: 15,
//                     textAlign: 'left',
//                     marginRight: 5,
//                     marginLeft: 5,
//                     color: 'black',
//                   }}>
//                   {item?.message}
//                 </Text>
//                 {item.imageUrl && (
//                   <Image
//                     source={{uri: item.imageUrl}}
//                     style={{width: 300, height: 300, borderRadius: 8}}
//                   />
//                 )}
//                 <Text
//                   style={{
//                     textAlign: 'right',
//                     fontSize: 11,
//                     color: 'gray',
//                     marginTop: 5,
//                   }}>
//                   {formatTime(item.timeStamp)}
//                 </Text>
//               </Pressable>
//             );
//           }
//         })}

//         <View style={{marginStart: 11}}>
//           {imageUrl && (
//             <Image
//               source={{
//                 uri: imageUrl,
//               }}
//               style={{
//                 marginStart: 177,
//                 marginTop: 61,
//                 width: 200,
//                 height: 200,
//                 borderRadius: 7,
//               }}
//             />
//           )}
//         </View>
//       </ScrollView>

//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingHorizontal: 10,
//           paddingVertical: 10,
//           borderTopWidth: 1,
//           borderTopColor: '#dddddd',
//           marginBottom: 25,
//         }}>
//         <TextInput
//           value={message}
//           onChangeText={text => setMessage(text)}
//           style={{
//             flex: 1,
//             height: 40,
//             borderWidth: 1,
//             borderColor: '#dddddd',
//             borderRadius: 0,
//             paddingHorizontal: 10,
//           }}
//           placeholder="Type your message..."
//         />
//         <Pressable
//           onPress={pickImage}
//           style={{
//             backgroundColor: '#000000',
//             paddingVertical: 11,
//             paddingHorizontal: 15,
//             borderRadius: 5,
//             marginLeft: 5,
//           }}>
//           <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
//             II
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={() => handelSend('text')}
//           style={{
//             backgroundColor: '#007bff',
//             paddingVertical: 11,
//             paddingHorizontal: 15,
//             borderRadius: 5,
//             marginLeft: 5,
//           }}>
//           <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
//             Send
//           </Text>
//         </Pressable>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default ChatMessagesScreen;

// const styles = StyleSheet.create({});




//SECOND TIME FOR REFRESH MESSAGE 
import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

const ChatMessagesScreen = () => {
  const [messageId, setMessageId] = useState('');
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;
  const {recepientId} = route.params;
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const token = AsyncStorage.getItem('token');
  console.log(item, 'kjlhouflrbn LJFGf47t48959ujrhv7f ');

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setCurrentUserId(userId);
    } catch (error) {
      console.log('error retrieving users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUserId]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:5001/messages/${currentUserId}/${recepientId}`,
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
        console.log('fetching message', data);
        data.forEach(message => {
          const messageId = message._id;
          setMessageId(messageId);
          console.log('Message ID:', messageId);
          if (!message.isSeen && message.recepientId._id === currentUserId) {
            markMessageAsSeen(message._id);
          }
        });
      } else {
        console.log('error showing messages', response.status.message);
      }
    } catch (error) {
      console.log('error fetching messages', error);
    }
  };

  console.log('error fetching messagesoooo', messageId);

  useEffect(() => {
    fetchMessages();
  }, [currentUserId, recepientId]);

  // useEffect(() => {
  //   fetchMessages();
  //   // Set up polling
  //   const intervalId = setInterval(() => {fetchMessages();}, 10000); // Poll every 10 seconds
    
  //   // Clean up the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentUserId, recepientId]);



  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:5001/user/${recepientId}`,
        );
        const data = await response.json();

        console.log(data.name, 'this is sajal saroj');
        setRecepientData(data);
      } catch (error) {
        console.log(error, 'error retrieving details');
      }
    };
    fetchRecepientData();
  }, []);

  //START
  const handelSend = async messageType => {
    console.log(imageUrl, 'this this this sssss');
    try {
      let messageText;
      let image;

      if (messageType === 'image') {
        image = imageUrl;
      } else if (messageType === 'text') {
        messageText = message;
      }
      const messageData = {
        senderId: currentUserId,
        recepientId: recepientId,
        messageType: messageType,
        message: messageText || '',
        image: imageUrl || '',
      };

      console.log('Sending message data nnn:', messageData);
      const response = await axios.post(
        'http://10.0.2.2:5001/messages',
        messageData,
      );

      if (response.status === 200) {
        setMessage('');
        setSelectedImage('');
        fetchMessages('');
        setImageUrl('');
      } else {
        console.log('Failed to send message:', response.data);
      }
    } catch (error) {
      console.log(error, 'error in sending the message');
    }
  };

  console.log('this is testing messages', messages);
  console.log(recepientData, 'this is recepient data okkkk');
  console.log('this is ss testing imageurl', imageUrl);

  //END

  //start of message delete after seen

  const markMessageAsSeen = async messageId => {
    try {
      const res = await axios.patch(
        `http://10.0.2.2:5001/messagesa/${messageId}/seen`,
      );
      if (res.status === 200) {
        console.log('Message marked as seen');
        // fetchMessages();
         setTimeout(async () => {
          try {
            console.log('Attempting to delete message with ID:', messageId);
           
            if (res.status === 200) {
              console.log('Message deleted successfully');
              fetchMessages(); // Fetch messages again after deletion
            } else {
              console.log('Failed to delete message:', res.status);
            }
          } catch (error) {
            console.log('Error deleting message:', error);
           
          }
        }, 0); 
      } else {
        console.log('Failed to mark message as seen:', res.data);
      }
    } catch (error) {
      console.log('Error marking message as seen:', error);
    }
  };


  //end of message delete after seen

  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: item.name,
      headerLeft: () => {
        <View
          style={{flexDirection: 'row', alignItems: 'center', gap: 10}}></View>;
      },
    });
  }, []);

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: false, // add this if you need the base64 representation
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Image URI: ', response.assets[0].uri);
        console.log('Image', response);
        const imageUri = response.uri || response.assets?.[0]?.uri;
        setImageUrl(imageUri);
      }
    });
  };
  console.log('this is image picker data', imageUrl);


 


  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#F0F0F0'}}>
      <ScrollView>
        {messages.map((item, index) => {
          if (item.messageType === 'text') {
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId?._id === currentUserId
                    ? {
                        alignSelf: 'flex-end',
                        backgroundColor: '#DCF8C6',
                        padding: 6,
                        maxWidth: '70%',
                        marginLeft: 5,
                        margin: 1,
                      }
                    : {
                        alignSelf: 'flex-start',
                        backgroundColor: 'white',
                        padding: 6,
                        margin: 1,
                        marginLeft: 5,
                        maxWidth: '70%',
                      },
                ]}>
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'left',
                    marginRight: 5,
                    marginLeft: 5,
                    color: 'black',
                  }}>
                  {item?.message}
                </Text>
                {item.imageUrl && (
                  <Image
                    source={{uri: item.imageUrl}}
                    style={{width: 300, height: 300, borderRadius: 8}}
                  />
                )}
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: 11,
                    color: 'gray',
                    marginTop: 5,
                  }}>
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }
        })}

        <View style={{marginStart: 11}}>
          {imageUrl && (
            <Image
              source={{
                uri: imageUrl,
              }}
              style={{
                marginStart: 177,
                marginTop: 61,
                width: 200,
                height: 200,
                borderRadius: 7,
              }}
            />
          )}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          marginBottom: 25,
        }}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 0,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message..."
        />
        <Pressable
          onPress={pickImage}
          style={{
            backgroundColor: '#000000',
            paddingVertical: 11,
            paddingHorizontal: 15,
            borderRadius: 5,
            marginLeft: 5,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            II
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handelSend('text')}
          style={{
            backgroundColor: '#007bff',
            paddingVertical: 11,
            paddingHorizontal: 15,
            borderRadius: 5,
            marginLeft: 5,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Send
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
