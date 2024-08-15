// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   Image,
//   Alert,
//   Modal,
//   TouchableOpacity,
//   SafeAreaView,
//   Pressable,
//   FlatList,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import Header from './Header';
// import {useFocusEffect} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const {jwtDecode} = require('jwt-decode');
// import axios from 'axios';

// const HomeScreen = () => {
//   const [posterid, setId] = useState('');
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [name, setName] = useState('');
//   const [namee, setNamee] = useState('');
//   const [userId, setUserId] = useState('');
//   const [profileImageUrl, setProfileImageUrl] = useState('');
//   const [profilepic, setProfilePic] = useState('');

//   //for delete post

//   const [modalVisible, setModalVisible] = useState(false);

//   const handleDeletePost = () => {
//     Alert.alert(
//       'No Option',
//       'There is no option on this post?',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {
//           text: 'OK',

//           onPress: () => {
//             setModalVisible(false);
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   const fetchUsers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }
//       console.log(token, 'token in home page');
//       const decodedToken = jwtDecode(token);
//       console.log(decodedToken, 'decodedToken in home page');
//       const userId = decodedToken.userId;
//       setId(userId);
//       setUserId(userId);
//       setName(decodedToken.name);
//       const response = await axios.get(`http://10.0.2.2:5001/users/${userId}`);
//       console.log(response.data, 'response.data');
//       setUsers(response.data);
//     } catch (error) {
//       console.log('error retrieving users', error);
//     }
//   };

//   console.log('users', users);

//   const loadPosts = async () => {
//     try {
//       const response = await axios.get('http://10.0.2.2:5001/posts');
//       setPosts(response.data);
//       // setProfilePic(response.data.profileImageUrl);
//       //console.log(response.data.profileImageUrl, 'Loaded public oo posts');
//       console.log(response.data, 'Loaded public posts');
//     } catch (error) {
//       console.error('Error loading posts:', error);
//     }
//   };

//   const refreshScreen = () => {
//     fetchUsers();
//     loadPosts();
//   };

//   useEffect(() => {
//     fetchUsers();
//     loadPosts();
//   }, []);

//   // useEffect(() => {
//   //   fetchUsers();
//   //      // Set up polling
//   //  const intervalId = setInterval(() => {
//   //   loadPosts();
//   // }, 100); // Poll every 10 seconds

//   // // Clean up the interval on component unmount
//   // return () => clearInterval(intervalId);

//   // }, []);

//   const [focused, setFocused] = useState(false);

//   useFocusEffect(
//     React.useCallback(() => {
//       setFocused(true);

//       return () => {
//         setFocused(false);
//       };
//     }, []),
//   );

//   const formatTime = time => {
//     const options = {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     };
//     return new Date(time).toLocaleString('en-US', options);
//   };

//   //this code is for commect

//   const fetchProfilepicByPosterId = async () => {
//     try {
//       const response = await axios.get(
//         `http://10.0.2.2:5001/profilepic/${posterid}`,
//       );
//       console.log(response.data, 'Response from backend'); // Add this line for debugging

//       if (!response.data || !response.data.profileImageUrl) {
//         // If profileImageUrl is empty or undefined, alert the user
//         Alert.alert('Please upload your profile picture.');
//       } else {
//         setProfileImageUrl(response.data.profileImageUrl);
//         console.log(response.data.profileImageUrl, 'thtiththththtt');
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };
//   useEffect(() => {
//     if (posterid) {
//       fetchProfilepicByPosterId();
//     }
//   }, [posterid]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (userId) {
//         try {
//           const response = await axios.get(
//             `http://10.0.2.2:5001/userr/${userId}`,
//           );
//           setNamee(response.data.name);
//         } catch (err) {
//           console.log('error retrieving users data', err);
//         }
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const [showInput, setShowInput] = useState(false);
//   const [comment, setComment] = useState('');
//   const handlePress = () => {
//     setShowInput(true);
//   };

//   const handleSend = async postId => {
//     if (comment.trim() === '') {
//       Alert.alert('Please enter a comment');
//       return;
//     }
//     const commentData = {
//       comment,
//       userId,
//       name: namee,
//       profileImageUrl,
//       postId, // Add the post ID to the comment data
//     };

//     console.log(commentData, 'thisis comment data ');
//     try {
//       const response = await fetch('http://10.0.2.2:5001/comments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({commentData}),
//       });

//       if (response.ok) {
//         console.log('Comment sent successfully');
//         setComment(''); // Clear the input field
//         setShowInput(false); // Optionally hide the input field
//         fetchComments();
//       } else {
//         Alert.alert('Failed to send comment');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch('http://10.0.2.2:5001/comments');
//       if (response.ok) {
//         const data = await response.json();
//         setComments(data);
//         console.log(data, 'this is front end comment kkll');
//       } else {
//         console.log('Failed to fetch comments');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   //Like

//   const [touchCount, setTouchCount] = useState(0);

//   const handleImageTouch = () => {
//     setTouchCount(prevCount => prevCount + 1);
//   };

//   const renderItem = ({item}) => {
//     return (
//       <View
//         style={{
//           marginTop: 4,
//           backgroundColor: '#fff', // Make sure to set a background color to see the shadow
//           shadowColor: '#000',
//           shadowOffset: {width: 0, height: -2}, // Adjust height to move the shadow to the top
//           shadowOpacity: 0.25,
//           shadowRadius: 3.84,
//           elevation: 5,
//         }}>
//         <View style={{flexDirection: 'row'}}>
//           <View style={{marginStart: 5, marginTop: -12}}>
//             {item ? (
//               <Image
//                 style={styles.imagg}
//                 size={100}
//                 source={{uri: item.profileImageUrl}}
//               />
//             ) : (
//               <Image
//                 style={{
//                   width: 50,
//                   height: 50,
//                   borderRadius: 25,
//                   marginTop: 19,
//                   resizeMode: 'cover',
//                 }}
//                 size={100}
//                 source={require('../assets/avatar.png')}
//               />
//             )}
//           </View>
//           <View>
//             <View style={{marginTop: 8}}>
//               <Text style={styles.nameTextt}>{item.name}</Text>
//             </View>

//             <View style={{flexDirection: 'row'}}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#777',
//                   marginStart: 11,
//                 }}>
//                 {item.visibility}
//               </Text>
//               <Text
//                 style={{
//                   marginTop: 2,
//                   fontSize: 12,
//                   color: '#777',
//                   marginStart: 11,
//                 }}>
//                 {formatTime(item.createdAt)}
//               </Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             style={{marginStart: 119, marginTop: -11}}
//             onPress={() => toggleModal(item._id)}>
//             <Text style={{color: 'black', fontWeight: 'bold', fontSize: 29}}>
//               ...
//             </Text>
//           </TouchableOpacity>
//           <Modal
//             // animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={toggleModal}>
//             <View style={styles.modalContainer}>
//               <View style={styles.modalView}>
//                 <TouchableOpacity
//                   style={styles.optionButton}
//                   onPress={handleDeletePost}>
//                   <Text style={styles.optionText}>No Option</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.optionButton}
//                   onPress={toggleModal}>
//                   <Text style={styles.optionText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//         </View>
//         <View>
//           <View>
//             <Text
//               style={{
//                 fontSize: 16,
//                 marginTop: 5,
//                 marginStart: 15,
//                 color: 'black',
//                 marginBottom: 5,
//               }}>
//               {item.caption}
//             </Text>
//           </View>

//           <View
//             style={{
//               backgroundColor: '#0080ff',
//             }}>
//             <Image
//               source={{uri: item.imageUrl}}
//               style={{
//                 width: '100%',
//                 height: 450,
//               }}
//             />
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             <TouchableOpacity
//               style={{
//                 flexDirection: 'row',
//                 backgroundColor: '#E6E6E6',
//                 width: '45%',
//                 borderRadius: 15,
//                 borderWidth: 1,
//                 marginTop: 4,
//                 marginStart: 15,
//               }}
//               onPress={handleImageTouch}>
//               <Text
//                 style={{
//                   marginTop: 4,
//                   marginStart: 68,
//                   color: 'black',
//                   fontSize: 19,
//                 }}>
//                 {touchCount}
//               </Text>
//               <Image
//                 source={{
//                   uri:
//                     touchCount % 2 === 0
//                       ? 'https://cdn-icons-png.flaticon.com/512/833/833300.png'
//                       : 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
//                 }}
//                 style={{
//                   width: 30,
//                   height: 30,
//                   marginStart: 4, //% 2 === 0
//                   marginTop: 4,
//                   marginBottom: 3,
//                 }}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 borderRadius: 15,
//                 backgroundColor: '#E6E6E6',
//                 borderWidth: 1,
//                 marginTop: 4,
//                 width: '45%',
//                 marginStart: 9,
//               }}
//               onPress={handlePress}>
//               <Image
//                 source={{
//                   uri: 'https://cdn-icons-png.flaticon.com/512/2593/2593491.png',
//                 }}
//                 style={{
//                   width: 30,
//                   height: 30,
//                   marginStart: 71,
//                   marginTop: 4,
//                   marginBottom: 3,
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               borderBottomColor: '#E6E6E6',
//               borderBottomWidth: 1,
//               borderColor: 'black',
//               marginHorizontal: 13,
//               marginVertical: 9, // Adjust this value as needed
//             }}
//           />
//           <View style={{marginStart:12}}>
//             <Text>Comments</Text>
//           </View>
//           <View style={{marginTop: 5, marginStart: 14}}>
//             {comments
//               .filter(comments => comments.postId === item._id)
//               .map(comments => (
//                 <View
//                   key={comments._id}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginVertical: 5,
//                   }}>
//                   <Image
//                     source={{uri: comments.profileImageUrl}}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       borderRadius: 15,
//                       marginRight: 10,
//                     }}
//                   />
//                   <View>
//                     <Text style={{fontWeight: 'bold', color: 'black'}}>
//                       {comments.name}
//                     </Text>
//                     <View style={{ width:'92%'}}>
//                     <Text style={{color: 'black', marginBottom:5}}>{comments.comment}</Text>
//                     </View>
//                   </View>
//                 </View>
//               ))}
//           </View>
//           {showInput && (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginTop: 10,
//               }}>
//               <TextInput
//                 style={{
//                   height: 40,
//                   width: 300, // Adjust width as needed
//                   backgroundColor: '#7E7DE8',
//                   borderColor: 'gray',
//                   borderWidth: 1,
//                   marginStart: 22,
//                   paddingHorizontal: 10,
//                   fontWeight: 'bold', // Set font weight to bold
//                 }}
//                 placeholder="Enter Comment Here"
//                 value={comment}
//                 onChangeText={setComment}
//               />
//               <TouchableOpacity
//                 onPress={() => handleSend(item._id)}
//                 style={{
//                   borderColor: 'gray',
//                   backgroundColor: '#3837CE',
//                   borderWidth: 1,
//                   marginLeft: 5,
//                   paddingHorizontal: 15,
//                   justifyContent: 'center', // Center the text vertically
//                   height: 40, // Match height with TextInput
//                 }}>
//                 <Text style={{fontWeight: 'bold', color: 'white'}}>Send</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.containerr}>
//       <View style={{marginTop: 1, backgroundColor: '#CCCCFF'}}>
//         <Header onRefresh={refreshScreen} />
//       </View>

//       <View
//         style={{
//           marginTop: 21,
//           flex: 1,
//           backgroundColor: '#fff',
//         }}>
//         <FlatList
//           data={posts}
//           renderItem={renderItem}
//           keyExtractor={item => item._id}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     // flex: 1,
//     marginTop: 151,
//     marginStart: 265,
//   },
//   modalView: {
//     width: 150,
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   optionButton: {
//     padding: 1,
//     marginVertical: 5,
//   },
//   optionText: {
//     fontSize: 18,
//     color: 'black',
//   },
//   containerr: {
//     flex: 1,
//   },
//   imagg: {
//     borderRadius: 120,
//     marginTop: 20,
//     backgroundColor: 'white',
//     height: 50,
//     width: 50,
//     padding: 20,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     elevation: 4,
//     justifyContent: 'center',
//   },
//   container: {
//     backgroundColor: '#ffb3b3',
//     flex: 1,
//   },

//   image: {
//     width: 330,
//     height: 330,
//     marginTop: 10,
//   },

//   nameText: {
//     color: 'black',
//     fontSize: 28,
//     fontStyle: 'normal',
//     fontFamily: 'Open Sans',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   nameTextt: {
//     color: 'black',
//     marginStart: 12,
//     //marginStart: -97, this is for view
//     fontSize: 18,
//     fontStyle: 'normal',
//     fontFamily: 'Open Sans',
//     fontWeight: 'bold',
//     //textAlign: 'center',
//   },
// });
// export default HomeScreen;

// //BEFORE FETCH LIKE CODE
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   Image,
//   Alert,
//   Modal,
//   TouchableOpacity,
//   SafeAreaView,
//   Pressable,
//   FlatList,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import Header from './Header';
// import {useFocusEffect} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const {jwtDecode} = require('jwt-decode');
// import axios from 'axios';

// const HomeScreen = () => {
//   const [posterid, setId] = useState('');
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [name, setName] = useState('');
//   const [namee, setNamee] = useState('');
//   const [userId, setUserId] = useState('');
//   const [profileImageUrl, setProfileImageUrl] = useState('');
//   const [profilepic, setProfilePic] = useState('');

//   //for delete post

//   const [modalVisible, setModalVisible] = useState(false);

//   const handleDeletePost = () => {
//     Alert.alert(
//       'No Option',
//       'There is no option on this post?',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {
//           text: 'OK',

//           onPress: () => {
//             setModalVisible(false);
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   const fetchUsers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }
//       console.log(token, 'token in home page');
//       const decodedToken = jwtDecode(token);
//       console.log(decodedToken, 'decodedToken in home page');
//       const userId = decodedToken.userId;
//       setId(userId);
//       setUserId(userId);
//       setName(decodedToken.name);
//       const response = await axios.get(`http://10.0.2.2:5001/users/${userId}`);
//       console.log(response.data, 'response.data');
//       setUsers(response.data);
//     } catch (error) {
//       console.log('error retrieving users', error);
//     }
//   };

//   console.log('users', users);

//   const loadPosts = async () => {
//     try {
//       const response = await axios.get('http://10.0.2.2:5001/posts');
//       setPosts(response.data);
//       // setProfilePic(response.data.profileImageUrl);
//       //console.log(response.data.profileImageUrl, 'Loaded public oo posts');
//       console.log(response.data, 'Loaded public posts');
//     } catch (error) {
//       console.error('Error loading posts:', error);
//     }
//   };

//   const refreshScreen = () => {
//     fetchUsers();
//     loadPosts();
//   };

//   useEffect(() => {
//     fetchUsers();
//     loadPosts();
//   }, []);

//   // useEffect(() => {
//   //   fetchUsers();
//   //      // Set up polling
//   //  const intervalId = setInterval(() => {
//   //   loadPosts();
//   // }, 100); // Poll every 10 seconds

//   // // Clean up the interval on component unmount
//   // return () => clearInterval(intervalId);

//   // }, []);

//   const [focused, setFocused] = useState(false);

//   useFocusEffect(
//     React.useCallback(() => {
//       setFocused(true);

//       return () => {
//         setFocused(false);
//       };
//     }, []),
//   );

//   const formatTime = time => {
//     const options = {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     };
//     return new Date(time).toLocaleString('en-US', options);
//   };

//   //this code is for commect

//   const fetchProfilepicByPosterId = async () => {
//     try {
//       const response = await axios.get(
//         `http://10.0.2.2:5001/profilepic/${posterid}`,
//       );
//       console.log(response.data, 'Response from backend'); // Add this line for debugging

//       if (!response.data || !response.data.profileImageUrl) {
//         // If profileImageUrl is empty or undefined, alert the user
//         Alert.alert('Please upload your profile picture.');
//       } else {
//         setProfileImageUrl(response.data.profileImageUrl);
//         console.log(response.data.profileImageUrl, 'thtiththththtt');
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };
//   useEffect(() => {
//     if (posterid) {
//       fetchProfilepicByPosterId();
//     }
//   }, [posterid]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (userId) {
//         try {
//           const response = await axios.get(
//             `http://10.0.2.2:5001/userr/${userId}`,
//           );
//           setNamee(response.data.name);
//         } catch (err) {
//           console.log('error retrieving users data', err);
//         }
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const [showInput, setShowInput] = useState(false);
//   const [comment, setComment] = useState('');
//   const handlePress = () => {
//     setShowInput(true);
//   };

//   const handleSend = async postId => {
//     if (comment.trim() === '') {
//       Alert.alert('Please enter a comment');
//       return;
//     }
//     const commentData = {
//       comment,
//       userId,
//       name: namee,
//       profileImageUrl,
//       postId, // Add the post ID to the comment data
//     };

//     console.log(commentData, 'thisis comment data ');
//     try {
//       const response = await fetch('http://10.0.2.2:5001/comments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({commentData}),
//       });

//       if (response.ok) {
//         console.log('Comment sent successfully');
//         setComment(''); // Clear the input field
//         setShowInput(false); // Optionally hide the input field
//         fetchComments();
//       } else {
//         Alert.alert('Failed to send comment');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch('http://10.0.2.2:5001/comments');
//       if (response.ok) {
//         const data = await response.json();
//         setComments(data);
//         console.log(data, 'this is front end comment kkll');
//       } else {
//         console.log('Failed to fetch comments');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   //Like

//   const [touchCount, setTouchCount] = useState(0);
//   const [likedPosts, setLikedPosts] = useState(new Set());

//   const handleImageTouch = async postId => {
//     if (likedPosts.has(postId)) {
//       return; // User already liked this post
//     }

//     try {
//       const response =await axios.post('http://10.0.2.2:5001/likes/toggle', {
//         postId,
//         userId,
//       });
//       if (response.data.message === 'Post liked successfully.') {
//         setLikedPosts(new Set([...likedPosts, postId]));
//       } else if (response.data.message === 'Post unliked successfully.') {
//         const updatedLikedPosts = new Set(likedPosts);
//         updatedLikedPosts.delete(postId);
//         setLikedPosts(updatedLikedPosts);
//       }
//     } catch (error) {
//       console.error('Error sending like to backend:', error);
//       Alert.alert('Error', 'Failed to like the post');
//     }
//   };

//   const renderItem = ({item}) => {
//     const isLiked = likedPosts.has(item._id);

//     return (
//       <View
//         style={{
//           marginTop: 4,
//           backgroundColor: '#fff', // Make sure to set a background color to see the shadow
//           shadowColor: '#000',
//           shadowOffset: {width: 0, height: -2}, // Adjust height to move the shadow to the top
//           shadowOpacity: 0.25,
//           shadowRadius: 3.84,
//           elevation: 5,
//         }}>
//         <View style={{flexDirection: 'row'}}>
//           <View style={{marginStart: 5, marginTop: -12}}>
//             {item ? (
//               <Image
//                 style={styles.imagg}
//                 size={100}
//                 source={{uri: item.profileImageUrl}}
//               />
//             ) : (
//               <Image
//                 style={{
//                   width: 50,
//                   height: 50,
//                   borderRadius: 25,
//                   marginTop: 19,
//                   resizeMode: 'cover',
//                 }}
//                 size={100}
//                 source={require('../assets/avatar.png')}
//               />
//             )}
//           </View>
//           <View>
//             <View style={{marginTop: 8}}>
//               <Text style={styles.nameTextt}>{item.name}</Text>
//             </View>

//             <View style={{flexDirection: 'row'}}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#777',
//                   marginStart: 11,
//                 }}>
//                 {item.visibility}
//               </Text>
//               <Text
//                 style={{
//                   marginTop: 2,
//                   fontSize: 12,
//                   color: '#777',
//                   marginStart: 11,
//                 }}>
//                 {formatTime(item.createdAt)}
//               </Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             style={{marginStart: 119, marginTop: -11}}
//             onPress={() => toggleModal(item._id)}>
//             <Text style={{color: 'black', fontWeight: 'bold', fontSize: 29}}>
//               ...
//             </Text>
//           </TouchableOpacity>
//           <Modal
//             // animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={toggleModal}>
//             <View style={styles.modalContainer}>
//               <View style={styles.modalView}>
//                 <TouchableOpacity
//                   style={styles.optionButton}
//                   onPress={handleDeletePost}>
//                   <Text style={styles.optionText}>No Option</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.optionButton}
//                   onPress={toggleModal}>
//                   <Text style={styles.optionText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//         </View>
//         <View>
//           <View>
//             <Text
//               style={{
//                 fontSize: 16,
//                 marginTop: 5,
//                 marginStart: 15,
//                 color: 'black',
//                 marginBottom: 5,
//               }}>
//               {item.caption}
//             </Text>
//           </View>

//           <View
//             style={{
//               backgroundColor: '#0080ff',
//             }}>
//             <Image
//               source={{uri: item.imageUrl}}
//               style={{
//                 width: '100%',
//                 height: 450,
//               }}
//             />
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             <TouchableOpacity
//               style={{
//                 flexDirection: 'row',
//                 backgroundColor: '#E6E6E6',
//                 width: '45%',
//                 borderRadius: 15,
//                 borderWidth: 1,
//                 marginTop: 4,
//                 marginStart: 15,
//               }}
//               onPress={() => handleImageTouch(item._id)}
//               >

//               <Image
//                 source={{
//                   uri:
//                   isLiked
//                       ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png'
//                       : 'https://cdn-icons-png.flaticon.com/512/833/833300.png',
//                 }}
//                 style={{
//                   width: 30,
//                   height: 30,
//                   marginStart: 71, //% 2 === 0
//                   marginTop: 4,
//                   marginBottom: 3,
//                 }}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 borderRadius: 15,
//                 backgroundColor: '#E6E6E6',
//                 borderWidth: 1,
//                 marginTop: 4,
//                 width: '45%',
//                 marginStart: 9,
//               }}
//               onPress={handlePress}>
//               <Image
//                 source={{
//                   uri: 'https://cdn-icons-png.flaticon.com/512/2593/2593491.png',
//                 }}
//                 style={{
//                   width: 30,
//                   height: 30,
//                   marginStart: 71,
//                   marginTop: 4,
//                   marginBottom: 3,
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               borderBottomColor: '#E6E6E6',
//               borderBottomWidth: 1,
//               borderColor: 'black',
//               marginHorizontal: 13,
//               marginVertical: 9, // Adjust this value as needed
//             }}
//           />
//           <View style={{marginStart: 12}}>
//             <Text>Comments</Text>
//           </View>
//           <View style={{marginTop: 5, marginStart: 14}}>
//             {comments
//               .filter(comments => comments.postId === item._id)
//               .map(comments => (
//                 <View
//                   key={comments._id}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginVertical: 5,
//                   }}>
//                   <Image
//                     source={{uri: comments.profileImageUrl}}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       borderRadius: 15,
//                       marginRight: 10,
//                     }}
//                   />
//                   <View>
//                     <Text style={{fontWeight: 'bold', color: 'black'}}>
//                       {comments.name}
//                     </Text>
//                     <View style={{width: '92%'}}>
//                       <Text style={{color: 'black', marginBottom: 5}}>
//                         {comments.comment}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               ))}
//           </View>
//           {showInput && (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginTop: 10,
//               }}>
//               <TextInput
//                 style={{
//                   height: 40,
//                   width: 300, // Adjust width as needed
//                   backgroundColor: '#7E7DE8',
//                   borderColor: 'gray',
//                   borderWidth: 1,
//                   marginStart: 22,
//                   paddingHorizontal: 10,
//                   fontWeight: 'bold', // Set font weight to bold
//                 }}
//                 placeholder="Enter Comment Here"
//                 value={comment}
//                 onChangeText={setComment}
//               />
//               <TouchableOpacity
//                 onPress={() => handleSend(item._id)}
//                 style={{
//                   borderColor: 'gray',
//                   backgroundColor: '#3837CE',
//                   borderWidth: 1,
//                   marginLeft: 5,
//                   paddingHorizontal: 15,
//                   justifyContent: 'center', // Center the text vertically
//                   height: 40, // Match height with TextInput
//                 }}>
//                 <Text style={{fontWeight: 'bold', color: 'white'}}>Send</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.containerr}>
//       <View style={{marginTop: 1, backgroundColor: '#CCCCFF'}}>
//         <Header onRefresh={refreshScreen} />
//       </View>

//       <View
//         style={{
//           marginTop: 21,
//           flex: 1,
//           backgroundColor: '#fff',
//         }}>
//         <FlatList
//           data={posts}
//           renderItem={renderItem}
//           keyExtractor={item => item._id}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   likeButton: {
//     color: '#007AFF',
//     fontSize: 16,
//     marginLeft:51,
//     marginTop:5,
//   },
//   liked: {
//     color: 'green',
//   },
//   modalContainer: {
//     // flex: 1,
//     marginTop: 151,
//     marginStart: 265,
//   },
//   modalView: {
//     width: 150,
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   optionButton: {
//     padding: 1,
//     marginVertical: 5,
//   },
//   optionText: {
//     fontSize: 18,
//     color: 'black',
//   },
//   containerr: {
//     flex: 1,
//   },
//   imagg: {
//     borderRadius: 120,
//     marginTop: 20,
//     backgroundColor: 'white',
//     height: 50,
//     width: 50,
//     padding: 20,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     elevation: 4,
//     justifyContent: 'center',
//   },
//   container: {
//     backgroundColor: '#ffb3b3',
//     flex: 1,
//   },

//   image: {
//     width: 330,
//     height: 330,
//     marginTop: 10,
//   },

//   nameText: {
//     color: 'black',
//     fontSize: 28,
//     fontStyle: 'normal',
//     fontFamily: 'Open Sans',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   nameTextt: {
//     color: 'black',
//     marginStart: 12,
//     //marginStart: -97, this is for view
//     fontSize: 18,
//     fontStyle: 'normal',
//     fontFamily: 'Open Sans',
//     fontWeight: 'bold',
//     //textAlign: 'center',
//   },
// });
// export default HomeScreen;

//AFTER FETCH LIKE CODE
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from './Header';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {jwtDecode} = require('jwt-decode');
import UserProfile from './UserProfile';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';

const HomeScreen = () => {
  const [posterid, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [namee, setNamee] = useState('');
  const [userId, setUserId] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [profilepic, setProfilePic] = useState('');
  const [likes, setLikes] = useState({});
  const navigation = useNavigation(); // Add this line
  //for delete post

  const [modalVisible, setModalVisible] = useState(false);

  const handleDeletePost = () => {
    Alert.alert(
      'No Option',
      'There is no option on this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',

          onPress: () => {
            setModalVisible(false);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
      setId(userId);
      setUserId(userId);
      //setName(decodedToken.name);
      const response = await axios.get(`http://10.0.2.2:5001/users/${userId}`);
      console.log(response.data, 'response.data formmmm name');
      setUsers(response.data);
      // setName(response.data.name);
    } catch (error) {
      console.log('error retrieving users', error);
    }
  };

  console.log('users', users);

  const loadPosts = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5001/posts');
      setPosts(response.data);
      console.log(response.data, 'Loaded public posts on home page o');
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const refreshScreen = () => {
    fetchUsers();
    loadPosts();
    fetchComments();
  };

  useEffect(() => {
    fetchUsers();
    loadPosts();
  }, []);

  // useEffect(() => {
  //   fetchUsers();
  //      // Set up polling
  //  const intervalId = setInterval(() => {
  //   loadPosts();
  // }, 100); // Poll every 10 seconds

  // // Clean up the interval on component unmount
  // return () => clearInterval(intervalId);

  // }, []);

  const [focused, setFocused] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setFocused(true);

      return () => {
        setFocused(false);
      };
    }, []),
  );

  const formatTime = time => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(time).toLocaleString('en-US', options);
  };

  //this code is for commect

  const fetchProfilepicByPosterId = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5001/profilepic/${posterid}`,
      );
      console.log(response.data, 'Response from backend'); // Add this line for debugging

      if (!response.data || !response.data.profileImageUrl) {
        // If profileImageUrl is empty or undefined, alert the user
        console.log('Please upload your profile picture.');
      } else {
        setProfileImageUrl(response.data.profileImageUrl);
        console.log(response.data.profileImageUrl, 'thtiththththtt');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    if (posterid) {
      fetchProfilepicByPosterId();
    }
  }, [posterid]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://10.0.2.2:5001/userr/${userId}`,
          );
          setNamee(response.data.name);
          console.log(response.data.name, 'this is user name from home page');
        } catch (err) {
          console.log('error retrieving users data', err);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState('');
  const handlePress = () => {
    setShowInput(true);
  };

  const handleSend = async postId => {
    if (comment.trim() === '') {
      Alert.alert('Please enter a comment');
      return;
    }
    const commentData = {
      comment,
      userId,
      name: namee,
      profileImageUrl,
      postId, // Add the post ID to the comment data
    };

    console.log(commentData, 'thisis comment data ');
    try {
      const response = await fetch('http://10.0.2.2:5001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({commentData}),
      });

      if (response.ok) {
        console.log('Comment sent successfully');
        setComment(''); // Clear the input field
        setShowInput(false); // Optionally hide the input field
        fetchComments();
      } else {
        Alert.alert('Failed to send comment');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5001/comments');
      if (response.ok) {
        const data = await response.json();
        setComments(data);
        console.log(data, 'this is front end comment kkll');
      } else {
        console.log('Failed to fetch comments');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  //Like

  const [touchCount, setTouchCount] = useState(0);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleImageTouch = async postId => {
    if (likedPosts.has(postId)) {
      return; // User already liked this post
    }

    try {
      const response = await axios.post('http://10.0.2.2:5001/likes/toggle', {
        postId,
        userId,
      });
      if (response.data.message === 'Post liked successfully.') {
        setLikedPosts(new Set([...likedPosts, postId]));
        setLikes(prevLikes => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || 0) + 1,
        }));
        loadPosts();
      } else if (response.data.message === 'Post unliked successfully.') {
        const updatedLikedPosts = new Set(likedPosts);
        updatedLikedPosts.delete(postId);
        setLikedPosts(updatedLikedPosts);
        setLikes(prevLikes => ({
          ...prevLikes,
          [postId]: Math.max((prevLikes[postId] || 1) - 1, 0),
        }));
        loadPosts();
      }
    } catch (error) {
      console.error('Error sending like to backend:', error);
      Alert.alert('Error', 'Failed to like the post');
    }
  };

  const renderItem = ({item}) => {
    const isLiked = likedPosts.has(item._id);

    return (
      <View
        style={{
          marginTop: 4,
          backgroundColor: '#fff', // Make sure to set a background color to see the shadow
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2}, // Adjust height to move the shadow to the top
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserProfile', {userId: item.posterid})}
            style={{marginStart: 5, marginTop: -12}}>
            {item ? (
              <Image
                style={styles.imagg}
                size={100}
                source={{uri: item.profileImageUrl}}
              />
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 19,
                  resizeMode: 'cover',
                }}
                size={100}
                source={require('../assets/avatar.png')}
              />
            )}
          </TouchableOpacity>
          <View>
            <View style={{marginTop: 8}}>
              <Text style={styles.nameTextt}>{item.name}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#777',
                  marginStart: 11,
                }}>
                {item.visibility}
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 12,
                  color: '#777',
                  marginStart: 11,
                }}>
                {formatTime(item.createdAt)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{marginStart: 119, marginTop: -11}}
            onPress={() => toggleModal(item._id)}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 29}}>
              ...
            </Text>
          </TouchableOpacity>
          <Modal
            // animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={handleDeletePost}>
                  <Text style={styles.optionText}>No Option</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={toggleModal}>
                  <Text style={styles.optionText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <View>
            {item.caption && item.imageUrl ? (
              <>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 5,
                      marginStart: 15,
                      color: 'black',
                      marginBottom: 5,
                    }}>
                    {item.caption}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#0080ff',
                  }}>
                  <Image
                    source={{uri: item.imageUrl}}
                    style={{
                      width: '100%',
                      height: 450,
                    }}
                  />
                </View>
              </>
            ) : item.caption ? (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 15,
                    marginStart: 15,
                    marginEnd: 15,
                    color: 'black',
                    marginBottom: 15,
                    width: '95%',
                    //height: 50,
                  }}>
                  {item.caption}
                </Text>
              </View>
            ) : item.imageUrl ? (
              <View
                style={{
                  backgroundColor: '#0080ff',
                }}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={{
                    width: '100%',
                    height: 450,
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: '#E6E6E6',
                width: '45%',
                borderRadius: 15,
                borderWidth: 1,
                marginTop: 4,
                marginStart: 15,
              }}
              onPress={() => handleImageTouch(item._id)}>
              <Image
                source={{
                  uri: isLiked
                    ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png'
                    : 'https://cdn-icons-png.flaticon.com/512/833/833300.png',
                }}
                style={{
                  width: 30,
                  height: 30,
                  marginStart: 71, //% 2 === 0
                  marginTop: 4,
                  marginBottom: 3,
                }}
              />
              <Text
                style={{
                  marginTop: 3,
                  marginLeft: -48,
                  fontSize: 19,
                  color: 'black',
                }}>
                {item.likeCount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                backgroundColor: '#E6E6E6',
                borderWidth: 1,
                marginTop: 4,
                width: '45%',
                marginStart: 9,
              }}
              onPress={handlePress}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2593/2593491.png',
                }}
                style={{
                  width: 30,
                  height: 30,
                  marginStart: 71,
                  marginTop: 4,
                  marginBottom: 3,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: '#E6E6E6',
              borderBottomWidth: 1,
              borderColor: 'black',
              marginHorizontal: 13,
              marginVertical: 9, // Adjust this value as needed
            }}
          />
          <View style={{marginStart: 12}}>
            <Text>Comments</Text>
          </View>
          <View style={{marginTop: 5, marginStart: 14}}>
            {comments
              .filter(comments => comments.postId === item._id)
              .map(comments => (
                <View
                  key={comments._id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserProfile', {
                        userId: comments.userId,
                      })
                    }>
                    <Image
                      source={{uri: comments.profileImageUrl}}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>
                      {comments.name}
                    </Text>
                    <View style={{width: '92%', marginEnd: 32}}>
                      <Text style={{color: 'black', marginBottom: 8}}>
                        {comments.comment}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </View>
          {showInput && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TextInput
                style={{
                  height: 40,
                  width: 300, // Adjust width as needed
                  backgroundColor: '#7E7DE8',
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginStart: 22,
                  paddingHorizontal: 10,
                  fontWeight: 'bold', // Set font weight to bold
                }}
                placeholder="Enter Comment Here"
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity
                onPress={() => handleSend(item._id)}
                style={{
                  borderColor: 'gray',
                  backgroundColor: '#3837CE',
                  borderWidth: 1,
                  marginLeft: 5,
                  paddingHorizontal: 15,
                  justifyContent: 'center', // Center the text vertically
                  height: 40, // Match height with TextInput
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Send</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerr}>
      <View style={{marginTop: 1, backgroundColor: '#CCCCFF'}}>
        <Header onRefresh={refreshScreen} />
      </View>

      <View
        style={{
          marginTop: 21,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  likeButton: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 51,
    marginTop: 5,
  },
  liked: {
    color: 'green',
  },
  modalContainer: {
    // flex: 1,
    marginTop: 151,
    marginStart: 265,
  },
  modalView: {
    width: 150,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  optionButton: {
    padding: 1,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    color: 'black',
  },
  containerr: {
    flex: 1,
  },
  imagg: {
    borderRadius: 120,
    marginTop: 20,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#ffb3b3',
    flex: 1,
  },

  image: {
    width: 330,
    height: 330,
    marginTop: 10,
  },

  nameText: {
    color: 'black',
    fontSize: 28,
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameTextt: {
    color: 'black',
    marginStart: 12,
    //marginStart: -97, this is for view
    fontSize: 18,
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    //textAlign: 'center',
  },
});
export default HomeScreen;
