// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   Modal,
//   TextInput,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';

// import {Picker} from '@react-native-picker/picker';
// import {launchImageLibrary} from 'react-native-image-picker';
// import React, {useEffect, useState, useCallback} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {fetchPostsByPosterId} from '../postget';
// import FriendsScreen from './FriendsScreen';
// const {jwtDecode} = require('jwt-decode');

// const ProfileScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [gender, setGender] = useState('');
//   const navigation = useNavigation();
//   const [posts, setPosts] = useState([]);
//   const [posterid, setId] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [userData, setUserData] = useState([]);
//   const [userId, setUserId] = useState('');
//   //const [PostId, setPostId] = useState('');

//   console.log(userId, ' is id');
//   //console.log(PostId," this is post id from render item");

//   //this code is for commect
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
//       name,
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

//   //for delete post

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedPostId, setSelectedPostId] = useState(null);

//   const handleDeletePost = async () => {
//     try {
//       await axios.delete(`http://10.0.2.2:5001/postss/${selectedPostId}`);
//       Alert.alert('Post deleted successfully');
//       setModalVisible(false);
//       loadPosts(); // Reload posts after deletion
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   const toggleModal = postId => {
//     setSelectedPostId(postId);
//     console.log(postId, 'this is post id ');
//     setModalVisible(!modalVisible);
//   };

// // for edit post

//  // State for editing post
//  const [editModalVisible, setEditModalVisible] = useState(false);
//  const [editCaption, setEditCaption] = useState('');
//  const [editImageUrl, setEditImageUrl] = useState('');

//  const handleEditPost = async () => {
//    try {
//      const updatedPost = {
//        caption: editCaption,
//        imageUrl: editImageUrl,
//      };

//      await axios.put(`http://10.0.2.2:5001/postss/${selectedPostId}`, updatedPost);
//      Alert.alert('Post updated successfully');
//      setEditModalVisible(false);
//      loadPosts(); // Reload posts after editing
//    } catch (error) {
//      console.error('Error editing post:', error);
//    }
//  };

//  const openEditModal = post => {
//    setSelectedPostId(post._id);
//    setEditCaption(post.caption);
//    setEditImageUrl(post.imageUrl);
//    setEditModalVisible(true);
//  };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (userId) {
//         try {
//           const response = await axios.get(
//             `http://10.0.2.2:5001/userr/${userId}`,
//           );
//           setUserData(response.data);
//           setName(response.data.name);
//           setEmail(response.data.email);
//           setGender(response.data.gender);
//         } catch (err) {
//           console.log('error retrieving users data', err);
//         }
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   console.log(userData, ' user data ');
//   console.log(name, 'name from user data ');
//   console.log(email, 'email from user data ');
//   console.log(gender, ' gender form user data ');

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
//       //setName(decodedToken.name);
//       //setEmail(decodedToken.email);
//       //setGender(decodedToken.gender);
//       const response = await axios.get(`http://10.0.2.2:5001/users/${userId}`);
//       console.log(response.data, 'response.data of user from backend');
//       setUsers(response.data);
//     } catch (error) {
//       console.log('error retrieving users', error);
//     }
//   };
//   useEffect(() => {
//     console.log('herere');
//     fetchUsers();
//   }, []);
//   console.log('users hhh kkk', users);

//   console.log(posterid, 'lets see the id of profil ');

//   const logout = () => {
//     clearAuthToken();
//   };
//   const clearAuthToken = async () => {
//     await AsyncStorage.removeItem('authToken');
//     console.log('Cleared auth token');
//     navigation.replace('Login');
//   };

//   const FriendRequest = () => {
//     navigation.navigate('FriendRequest', {Id: users._id});
//   };

//   const Friends = () => {
//     navigation.navigate('Friends');
//   };

//   //start to post
//   const [profileImageUrl, setProfileImageUrl] = useState('');
//   const [profileImageUrlFirst, setProfileImageUrlFirst] = useState('');
//   const [Pimage, setPImage] = useState('');
//   const [caption, setCaption] = useState('');
//   const [visibility, setVisibility] = useState('public'); // Default visibility is public

//   const pickImage = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         const imageUri = response.uri || response.assets?.[0]?.uri;
//         setImageUrl(imageUri);
//         //setProfilePic(imageUri);
//       }
//     });
//   };

//   console.log(imageUrl);

//   //for profile pic start
//   const pickprofileImage = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         const imageUri = response.uri || response.assets?.[0]?.uri;
//         setProfileImageUrlFirst(imageUri);
//         console.log(imageUri, 'this is profile imageee');
//       }
//     });
//   };

//   const Postprofile = async () => {
//     if (!profileImageUrlFirst || !posterid) {
//       Alert.alert('Error', 'Please select an image and enter a caption.');
//       return;
//     }

//     const postPic = {
//       posterid,
//       profileImageUrl: profileImageUrlFirst,
//     };
//     axios
//       .post('http://10.0.2.2:5001/profilepic', postPic)
//       .then(res => {
//         console.log(res.data);
//         Alert.alert('Profile pic created successfully');

//         fetchProfilepicByPosterId();
//       })
//       .catch(e => console.log(e));
//   };

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
//   console.log(Pimage, ' public \\profile pic kko');

//   // profile pic end

//   const handlePost = async () => {
//     if (!imageUrl || !caption) {
//       Alert.alert('Error', 'Please select an image and enter a caption.');
//       return;
//     }
//     const postData = {
//       name,
//       posterid,
//       caption,
//       imageUrl,
//       profileImageUrl,
//       visibility,
//     };
//     axios
//       .post('http://10.0.2.2:5003/posts', postData)
//       .then(res => {
//         console.log(res.data);
//         Alert.alert('Post created successfully');
//         removeImage();
//         loadPosts();
//       })
//       .catch(e => console.log(e));
//   };

//   const removeImage = () => {
//     setImageUrl('');
//     setCaption('');
//   };

//   const loadPosts = async () => {
//     try {
//       const fetchedPosts = await fetchPostsByPosterId(posterid);
//       setPosts(fetchedPosts);
//       console.log(posts, 'saroj ho hai van dai');
//     } catch (error) {
//       console.error('Error loading posts:', error);
//     }
//   };

//   useEffect(() => {
//     if (posterid) {
//       loadPosts();
//       fetchProfilepicByPosterId();
//     }
//   }, [posterid]);

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

//   const [touchCount, setTouchCount] = useState(0);

//   const handleImageTouch = () => {
//     setTouchCount(prevCount => prevCount + 1);
//   };

//   const renderItem = ({item}) => {
//     console.log(item._id, 'this is item and id ');
//     // setPostId(item._id);
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
//             {profileImageUrl ? (
//               <Image
//                 style={styles.imagg}
//                 size={100}
//                 source={{uri: profileImageUrl}}
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
//               <Text style={styles.nameTextt}>{name}</Text>
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
//                   <Text style={styles.optionText}>Delete Post</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.optionButton}
//                   //onPress={editPost}
//                   >
//                   <Text style={styles.optionText}>Edit Post</Text>
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
//                     <View style={{ width:'92%'}}>
//                     <Text style={{color: 'black', marginBottom:5}}>{comments.comment}</Text>
//                   </View>
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

//   console.log(imageUrl, 'fkjufheniu');
//   return (
//     <ScrollView showsVerticalScrollIndicator={true}>
//       <View>
//         <View>
//           <Image
//             style={{
//               // borderRadius: 120,
//               marginTop: 1,
//               backgroundColor: 'white',
//               height: 250,
//               width: '100%',
//               padding: 20,
//               borderColor: '#ccc',
//               borderWidth: 1,
//               elevation: 4,
//             }}
//             size={100}
//             source={require('../assets/Cover.png')}
//           />
//         </View>
//         <TouchableOpacity onPress={pickprofileImage}>
//           <View
//             style={{
//               borderRadius: 120,
//               marginTop: -147,
//               marginLeft: 79,
//               //backgroundColor: 'white',
//               height: 250,
//               width: 250,
//               padding: 20,
//               borderColor: '#ccc',
//               borderWidth: 1,
//               elevation: 4,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             {profileImageUrl ? (
//               <Image
//                 style={{
//                   borderRadius: 120,
//                   marginTop: 0,
//                   // backgroundColor: 'white',
//                   height: 250,
//                   width: 250,
//                   padding: 20,
//                   //borderColor: '#ccc',
//                   borderWidth: 1,
//                   elevation: 4,
//                 }}
//                 size={100}
//                 source={{uri: profileImageUrl}}
//               />
//             ) : (
//               <Image
//                 style={{
//                   borderRadius: 120,
//                   marginTop: 0,
//                   backgroundColor: 'white',
//                   height: 250,
//                   width: 250,
//                   padding: 20,
//                   borderColor: '#ccc',
//                   borderWidth: 1,
//                   elevation: 4,
//                 }}
//                 size={100}
//                 source={require('../assets/avatar.png')}
//               />
//             )}
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             marginTop: -20,
//             marginStart: 270,
//             marginEnd: 99,
//           }}
//           onPress={Postprofile}>
//           <View
//             style={{
//               // flex: 1,
//               //justifyContent: 'center',
//               //alignItems: 'center',
//               padding: 1,
//               paddingStart: 5,
//               borderColor: 'gray',
//               borderWidth: 1,
//               borderRadius: 50,
//               backgroundColor: '#00FFFF',
//             }}>
//             <Text></Text>
//           </View>
//         </TouchableOpacity>

//         <View style={{marginTop: 20}}>
//           <Text style={styles.nameText}>{name}</Text>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 10,
//             marginTop: 20,
//             marginStart: 20,
//             marginEnd: 20,
//           }}>
//           <Pressable
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               padding: 10,
//               borderColor: 'black',
//               borderWidth: 1,
//               borderRadius: 5,
//             }}>
//             <Text style={{color: 'black', fontWeight: 'bold'}}>
//               Edit Profile
//             </Text>
//           </Pressable>

//           <Pressable
//             onPress={logout}
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               padding: 10,
//               borderColor: 'black',
//               borderWidth: 1,
//               borderRadius: 5,
//             }}>
//             <Text style={{color: 'black', fontWeight: 'bold'}}>Logout</Text>
//           </Pressable>
//         </View>
//         <View style={{marginStart: 20}}>
//           <Pressable
//             onPress={FriendRequest}
//             style={{
//               flex: 1,
//               padding: 10,
//             }}>
//             {/* <View style={styles.unreadv}>
//               <Text style={styles.unread}>11</Text>
//             </View> */}
//             <Text style={{color: 'green', fontWeight: 'bold'}}>
//               Friend Request
//             </Text>
//           </Pressable>
//         </View>
//         <View style={{marginStart: 20}}>
//           <Pressable
//             onPress={Friends}
//             style={{
//               flex: 1,
//               marginTop: -10,
//               padding: 10,
//             }}>
//             <Text style={{color: 'green', fontWeight: 'bold'}}>Friends</Text>
//           </Pressable>
//         </View>
//         <View style={{marginTop: 0, marginHorizontal: 25}}>
//           <View style={styles.infoMain}>
//             <View style={styles.infoCont}>
//               <View style={styles.infoText}>
//                 <Text style={styles.infoLarge_Text}>Email</Text>
//                 <Text style={styles.infoSmall_Text} numberOfLines={1}>
//                   {email}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.infoMain}>
//             <View style={styles.infoCont}>
//               <View style={styles.infoText}>
//                 <Text style={styles.infoLarge_Text}>Gender</Text>
//                 <Text style={styles.infoSmall_Text}>{gender}</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>

//       <View style={styles.container}>
//         <View style={{marginStart: 18, marginTop: 11}}>
//           <Text style={{color: 'black', fontWeight: 'bold'}}>Visibility:</Text>
//           <Picker
//             style={{marginTop: -14}}
//             selectedValue={visibility}
//             onValueChange={(itemValue, itemIndex) => setVisibility(itemValue)}>
//             <Picker.Item label="Public" value="public" />
//             <Picker.Item label="Private" value="private" />
//           </Picker>
//         </View>
//         <View style={styles.postSection}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter caption"
//             value={caption}
//             onChangeText={text => setCaption(text)}
//             //onChangeText={setCaption}
//           />

//           <View style={{marginStart: 11}}>
//             {imageUrl && (
//               <Image
//                 source={{
//                   // uri: imageUrl.uri,
//                   uri: imageUrl,
//                 }}
//                 style={styles.image}
//               />
//             )}
//           </View>

//           <View style={{marginTop: 11, flexDirection: 'row'}}>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#001FBF',
//                 padding: 10,
//                 borderRadius: 6,
//                 width: 105,
//               }}
//               onPress={pickImage}>
//               <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
//                 Pick an image
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#001FBF',
//                 padding: 10,
//                 borderRadius: 6,
//                 width: 105,
//                 marginStart: 141,
//               }}
//               onPress={handlePost}>
//               <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
//                 Post
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       {/* <View
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
//       </View> */}

//       {/* <View style={{marginTop: 21, backgroundColor: '#fff'}}>
//         {posts.map(item => renderItem({item}))}
//       </View> */}

//       <View style={{marginTop: 21, backgroundColor: '#fff'}}>
//         {posts.map(item => (
//           <View key={item._id}>{renderItem({item})}</View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   modalContainer: {
//     // flex: 1,
//     marginTop: 61,
//     marginStart: 261,
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
//   pickButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     marginVertical: 12,
//     borderRadius: 5,
//     color: 'black',
//   },
//   postButton: {
//     backgroundColor: '#2196F3',
//     padding: 10,
//     marginVertical: 12,
//     borderRadius: 5,
//     color: 'black',
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   userInfoSection: {
//     paddingHorizontal: 30,
//     marginBottom: 25,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//     fontWeight: '500',
//   },
//   infoBoxWrapper: {
//     flexDirection: 'row',
//     height: 100,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//   },
//   menuItemText: {
//     color: '#777777',
//     marginLeft: 20,
//     fontWeight: '600',
//     fontSize: 16,
//     lineHeight: 26,
//   },
//   postSection: {
//     paddingHorizontal: 30,
//     marginBottom: 25,
//   },
//   input: {
//     borderBottomWidth: 1,
//     marginBottom: 10,
//     padding: 5,
//   },
//   image: {
//     width: 330,
//     height: 330,
//     marginTop: 10,
//   },

//   //end
//   unreadv: {
//     position: 'absolute',
//     backgroundColor: '#ff3250',
//     right: -5,
//     marginTop: 10,
//     marginRight: 268,
//     top: -5,
//     borderRadius: 25,
//     width: 25,
//     height: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 100,
//   },

//   unread: {
//     color: 'white',
//     fontWeight: '600',
//   },

//   editIcon: {
//     zIndex: 1,
//     color: 'white',
//     position: 'absolute',
//     right: 2,
//     margin: 15,
//   },
//   backIcon: {
//     zIndex: 1,
//     color: 'white',
//     position: 'absolute',
//     left: 2,
//     margin: 15,
//   },
//   avatar: {
//     borderRadius: 120,
//     marginTop: 20,
//     backgroundColor: 'white',
//     height: 250,
//     width: 250,
//     padding: 20,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     elevation: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
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
//     fontSize: 18,
//     fontStyle: 'normal',
//     fontFamily: 'Open Sans',
//     fontWeight: 'bold',
//     //textAlign: 'center',
//   },
//   bookCountMain: {
//     borderColor: '#b0b0b0',
//     borderWidth: 1,
//     marginTop: 18,
//     marginHorizontal: 20,

//     borderRadius: 20,
//     flexDirection: 'row',
//     width: '88%',
//   },
//   bookCount: {
//     width: '50%',
//     borderColor: '#b0b0b0',
//     borderRightWidth: 1,
//     flexDirection: 'column',
//     paddingHorizontal: 10,
//     paddingVertical: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bookCountNum: {
//     color: '#5D01AA',
//     fontSize: 34,
//     fontWeight: '800',
//   },
//   bookCountText: {color: '#b3b3b3', fontSize: 14, fontWeight: '500'},
//   infoMain: {
//     marginTop: 1,
//   },
//   infoCont: {
//     width: '100%',
//     flexDirection: 'row',
//   },
//   infoIconCont: {
//     justifyContent: 'center',
//     height: 40,
//     width: 40,
//     borderRadius: 20,

//     alignItems: 'center',
//     elevation: -5,
//     borderColor: 'black',
//     backgroundColor: 'black',
//   },

//   infoText: {
//     width: '80%',
//     flexDirection: 'column',
//     marginLeft: 25,
//     borderBottomWidth: 1,
//     paddingBottom: 10,
//     borderColor: '#e6e6e6',
//   },
//   infoSmall_Text: {
//     fontSize: 14,
//     color: 'black',
//     fontWeight: '500',
//   },
//   infoLarge_Text: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   booksUploadedMain: {
//     paddingHorizontal: 10,
//     paddingBottom: 30,
//     marginTop: 20,
//   },
//   flatlistDiv: {
//     borderRadius: 15,
//     paddingHorizontal: 10,
//   },
//   booksUploadedText: {
//     fontSize: 26,
//     color: 'black',
//     fontWeight: '700',
//     paddingLeft: 20,
//     paddingBottom: 8,
//   },
//   booksUploadedCard: {
//     flexDirection: 'row',
//     width: '100%',
//     marginTop: 9,
//     marginBottom: 9,

//     backgroundColor: '#f2f2f2',
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderRadius: 15,
//     elevation: 3,
//   },
//   booksUploadedImgDiv: {
//     width: '28%',
//   },
//   booksUploadedImg: {
//     width: '100%',
//     height: 120,
//     borderRadius: 15,
//   },
//   cardMidDiv: {
//     paddingHorizontal: 10,
//     width: '55%',
//     position: 'relative',
//   },
//   approvedText: {
//     fontSize: 12,
//     color: '#0d7313',
//     fontWeight: '600',
//     marginLeft: 5,
//   },
//   cardBookNameText: {
//     fontSize: 24,
//     color: 'black',
//     fontWeight: '700',
//     marginTop: 2,
//   },
//   cardBookAuthor: {
//     fontSize: 14,
//     color: 'black',
//     fontWeight: '600',
//     marginTop: 1,
//   },
//   cardRating: {
//     position: 'absolute',
//     bottom: 0,
//     paddingHorizontal: 10,
//     flexDirection: 'row',
//   },
//   cardRatingCount: {
//     fontSize: 14,
//     marginTop: -2,
//     paddingLeft: 4,
//     color: '#303030',
//   },
//   cardEditDiv: {
//     width: '17%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardEditBtn: {
//     height: 44,
//     width: 44,
//     backgroundColor: '#774BBC',
//     borderRadius: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   footer: {
//     padding: 10,
//     justifyContent: 'center',

//     flexDirection: 'row',
//   },
//   loadMoreBtn: {
//     padding: 10,
//     backgroundColor: '#f5a002',
//     borderRadius: 4,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     paddingHorizontal: 20,
//   },
//   btnText: {
//     color: 'white',
//     fontSize: 15,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
// });
// export default ProfileScreen;

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchPostsByPosterId} from '../postget';
import FriendsScreen from './FriendsScreen';
const {jwtDecode} = require('jwt-decode');

const ProfileScreen = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [posterid, setId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState('');
  //const [PostId, setPostId] = useState('');

  console.log(userId, ' is id');
  //console.log(PostId," this is post id from render item");

  //this code is for commect
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
      name,
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

  //for delete post

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://10.0.2.2:5001/postss/${selectedPostId}`);
      Alert.alert('Post deleted successfully');
      setModalVisible(false);
      loadPosts(); // Reload posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const toggleModal = postId => {
    setSelectedPostId(postId);
    console.log(postId, 'this is post id ');
    setModalVisible(!modalVisible);
  };

  // for edit post
  const [editimageUrl, seteditPostsImageUrl] = useState('');
  //for profile pic start
  const editPostImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.uri || response.assets?.[0]?.uri;
        seteditPostsImageUrl(imageUri);
        console.log(imageUri, 'this is profile imageee');
      }
    });
  };

  // State for editing post
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editCaption, setEditCaption] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [selectedPosteditId, setSelectedPostEditId] = useState(null);

  const handleEditPost = async () => {
    try {
      const updatedPost = {
        postId: selectedPostId,
        caption: editCaption,
        imageUrl: editimageUrl,
        visibility,
      };
      console.log('this ei edit data', updatedPost);
      await axios.put(
        `http://10.0.2.2:5001/postsedit/${selectedPostId}`,
        updatedPost,
      );

      Alert.alert('Post updated successfully');
      setEditModalVisible(false);
      setModalVisible(false);
      loadPosts(); // Reload posts after editing
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const openEditModal = post => {
    //setSelectedPostEditId(post._id);
    setEditCaption(post.caption);
    seteditPostsImageUrl(post.imageUrl);
    setEditModalVisible(true);
  };

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5001/userr/${userId}`,
        );
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
      } catch (err) {
        console.log('error retrieving users data', err);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // }, [userId]);
  // useEffect(()=>{

  // },[handleSaveAndRefresh])

  console.log(userData, ' user data ');
  console.log(name, 'name from user data ');
  console.log(email, 'email from user data ');
  console.log(gender, ' gender form user data ');

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
      //setEmail(decodedToken.email);
      //setGender(decodedToken.gender);
      const response = await axios.get(`http://10.0.2.2:5001/users/${userId}`);
      console.log(response.data, 'response.data of user from backend');
      setUsers(response.data);
    } catch (error) {
      console.log('error retrieving users', error);
    }
  };
  useEffect(() => {
    console.log('herere');
    fetchUsers();
  }, []);
  console.log('users hhh kkk', users);

  console.log(posterid, 'lets see the id of profil ');

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('Cleared auth token');
    navigation.replace('Login');
  };

  const FriendRequest = () => {
    navigation.navigate('FriendRequest', {Id: users._id});
  };

  const Friends = () => {
    navigation.navigate('Friends');
  };

  //start to post
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [profileImageUrlFirst, setProfileImageUrlFirst] = useState('');
  const [Pimage, setPImage] = useState('');
  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState('public'); // Default visibility is public

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.uri || response.assets?.[0]?.uri;
        setImageUrl(imageUri);
        //setProfilePic(imageUri);
      }
    });
  };

  console.log(imageUrl);

  //for profile pic start
  const pickprofileImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.uri || response.assets?.[0]?.uri;
        setProfileImageUrlFirst(imageUri);
        console.log(imageUri, 'this is profile imageee');
      }
    });
  };

  const Postprofile = async () => {
    if (!profileImageUrlFirst || !posterid) {
      Alert.alert('Error', 'Please select an image and enter a caption.');
      return;
    }

    const postPic = {
      posterid,
      profileImageUrl: profileImageUrlFirst,
    };
    axios
      .post('http://10.0.2.2:5001/profilepic', postPic)
      .then(res => {
        console.log(res.data);
        Alert.alert('Profile pic created successfully');

        fetchProfilepicByPosterId();
      })
      .catch(e => console.log(e));
  };

  const fetchProfilepicByPosterId = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5001/profilepic/${posterid}`,
      );
      console.log(response.data, 'Response from backend'); // Add this line for debugging

      if (!response.data || !response.data.profileImageUrl) {
        // If profileImageUrl is empty or undefined, alert the user
        Alert.alert('Please upload your profile picture.');
      } else {
        setProfileImageUrl(response.data.profileImageUrl);
        console.log(response.data.profileImageUrl, 'thtiththththtt');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  console.log(Pimage, ' public \\profile pic kko');

  // profile pic end

  const handlePost = async () => {
    // if (!imageUrl && !caption) {
    //   Alert.alert('Error', 'Please select an image and enter a caption.');
    //   return;
    // }
    const postData = {
      name,
      posterid,
      caption: caption || '',
      imageUrl: imageUrl || '',
      profileImageUrl,
      visibility,
    };
    axios
      .post('http://10.0.2.2:5003/posts', postData)
      .then(res => {
        console.log(res.data);
        Alert.alert('Post created successfully');
        removeImage();
        loadPosts();
      })
      .catch(e => console.log(e));
  };

  const removeImage = () => {
    setImageUrl('');
    setCaption('');
  };

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPostsByPosterId(posterid);
      setPosts(fetchedPosts);
      console.log(posts, 'saroj ho hai van dai');
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };
  // useEffect(() => {
  //     loadPosts();

  // }, []);

  useEffect(() => {
    if (posterid) {
      loadPosts();
      fetchProfilepicByPosterId();
    }
  }, [posterid]);

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

  //for editProfile data
  const [editModalVisiblee, setEditModalVisiblee] = useState(false);
  // const [namee, setNamee] = useState('');
  //const [emaill, setEmaill] = useState('');
  //const [genderr, setGenderr] = useState('');
  const [oldpass, setOldpass] = useState('');
  const [newpass, setNewpass] = useState('');

  const editProfileData = () => {
    setEditModalVisiblee(true);
  };

  const handleSaveProfile = async () => {
    // Validate name
    if (name.trim() === '') {
      Alert.alert('Name cannot be empty');
      return;
    }
    // Validate email (simple email regex pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Invalid email format');
      return;
    }

    // Validate current and new passwords (assuming passwords should be non-empty)
    if (oldpass.trim() === '') {
      Alert.alert('Please enter password');
      return;
    }

    try {
      const updatedProfile = {
        userId,
        name: name,
        email: email,
        gender: gender,
        oldpass: oldpass,
        newpass: newpass,
      };
      await axios.put('http://10.0.2.2:5001/profile/edit', updatedProfile);
      Alert.alert('Profile updated successfully');
      setEditModalVisiblee(false);
      fetchUserData();
    } catch (error) {
      Alert.alert('Please enter the correct password');
    }
  };

  // const refreshScreen = () => {
  //   fetchUserData();
  // };

  const handleSaveAndRefresh = () => {
    handleSaveProfile(); // Then call handleSaveProfile
    // refreshScreen(); // Call refreshScreen
  };

  //Like
  const [likes, setLikes] = useState({});

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
    console.log(item, 'this is item and id jsjs');
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
          <View style={{marginStart: 5, marginTop: -12}}>
            {profileImageUrl ? (
              <Image
                style={styles.imagg}
                size={100}
                source={{uri: profileImageUrl}}
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
          </View>

          <View>
            <View style={{marginTop: 8}}>
              <Text style={styles.nameTextt}>{name}</Text>
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
                  <Text style={styles.optionText}>Delete Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => openEditModal(item._id)}>
                  <Text style={styles.optionText}>Edit Post</Text>
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
        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
                height: '85%',
                width: '90%',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.captionInput}
                placeholder="Edit caption..."
                value={editCaption}
                onChangeText={text => setEditCaption(text)}
              />
              <View style={{marginStart: -22, marginTop: -11}}>
                <Text>Visibility:</Text>
                <Picker
                  style={{marginTop: -17}}
                  selectedValue={visibility}
                  onValueChange={(itemValue, itemIndex) =>
                    setVisibility(itemValue)
                  }>
                  <Picker.Item label="Public" value="public" />
                  <Picker.Item label="Private" value="private" />
                </Picker>

                <View style={{marginTop: -16}}>
                  <Text>{visibility}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={editPostImage}>
                <Text style={styles.chooseImageButton}>Choose Image</Text>
                <View style={{marginStart: 5, marginTop: 12}}>
                  {editimageUrl ? (
                    <Image
                      style={{width: 250, height: 250}}
                      source={{uri: editimageUrl}}
                    />
                  ) : (
                    <Image
                      style={{width: 250, height: 250}}
                      source={require('../assets/avatarrr.png')}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={{
                  padding: 10,
                  backgroundColor: '#007bff',
                  borderRadius: 5,
                  marginTop: 10,
                  width: '40%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center', width: '100%'}}
                onPress={handleEditPost}>
                <Text
                  style={{
                    padding: 10,
                    marginTop: 10,
                    width: '40%',
                    backgroundColor: '#28a745',
                    borderRadius: 5,
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 18,
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
                  marginStart: 71,
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
                    <TouchableOpacity onPress={() =>
                      navigation.navigate('UserProfile', {userId: comments.userId})}>
                     
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

  console.log(imageUrl, 'fkjufheniu');
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View>
        <View>
          <Image
            style={{
              marginTop: 1,
              backgroundColor: 'white',
              height: 250,
              width: '100%',
              padding: 20,
              borderColor: '#ccc',
              borderWidth: 1,
              elevation: 4,
            }}
            size={100}
            source={require('../assets/Cover.png')}
          />
        </View>

        <TouchableOpacity onPress={pickprofileImage}>          
          <View
            style={{
              borderRadius: 120,
              marginTop: -147,
              marginLeft: 79,
              height: 250,
              width: 250,
              padding: 20,
              borderColor: '#ccc',
              borderWidth: 1,
              elevation: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {profileImageUrl ? (
              <Image
                style={{
                  borderRadius: 120,
                  marginTop: 0,
                  // backgroundColor: 'white',
                  height: 250,
                  width: 250,
                  padding: 20,
                  //borderColor: '#ccc',
                  borderWidth: 1,
                  elevation: 4,
                }}
                size={100}
                source={{uri: profileImageUrl}}
              />
            ) : (
              <Image
                style={{
                  borderRadius: 120,
                  marginTop: 0,
                  backgroundColor: 'white',
                  height: 250,
                  width: 250,
                  padding: 20,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  elevation: 4,
                }}
                size={100}
                source={require('../assets/avatar.png')}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: -20,
            marginStart: 270,
            marginEnd: 99,
          }}
          onPress={Postprofile}>
          <View
            style={{
              // flex: 1,
              //justifyContent: 'center',
              //alignItems: 'center',
              padding: 1,
              paddingStart: 5,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 50,
              backgroundColor: '#00FFFF',
            }}>
            <Text></Text>
          </View>
        </TouchableOpacity>

        <View style={{marginTop: 20}}>
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 20,
            marginStart: 20,
            marginEnd: 20,
          }}>
          <TouchableOpacity
            onPress={editProfileData}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisiblee}
            onRequestClose={() => {
              setEditModalVisiblee(!editModalVisiblee);
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <View
                style={{
                  margin: 20,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 35,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  width: '80%',
                }}>
                <Text style={{fontSize: 18, marginBottom: 20}}>
                  Edit Profile
                </Text>
                <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 20,
                    width: '100%',
                    paddingLeft: 10,
                  }}
                />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 20,
                    width: '100%',
                    paddingLeft: 10,
                  }}
                />
                <View
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 20,
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <Picker
                    selectedValue={gender}
                    onValueChange={itemValue => setGender(itemValue)}
                    style={{height: 40}}>
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
                <TextInput
                  placeholder="Old Password"
                  value={oldpass}
                  onChangeText={setOldpass}
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 20,
                    width: '100%',
                    paddingLeft: 10,
                  }}
                />
                <TextInput
                  placeholder="New Password"
                  value={newpass}
                  onChangeText={setNewpass}
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 20,
                    width: '100%',
                    paddingLeft: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Button
                    title="Cancel"
                    onPress={() => setEditModalVisiblee(false)}
                  />
                  <Button title="Save" onPress={handleSaveAndRefresh} />
                </View>
              </View>
            </View>
          </Modal>

          <Pressable
            onPress={logout}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Logout</Text>
          </Pressable>
        </View>
        <View style={{marginStart: 20}}>
          <Pressable
            onPress={FriendRequest}
            style={{
              flex: 1,
              padding: 10,
            }}>
            {/* <View style={styles.unreadv}>
              <Text style={styles.unread}>11</Text>
            </View> */}
            <Text style={{color: 'green', fontWeight: 'bold'}}>
              Friend Request
            </Text>
          </Pressable>
        </View>
        <View style={{marginStart: 20}}>
          <Pressable
            onPress={Friends}
            style={{
              flex: 1,
              marginTop: -10,
              padding: 10,
            }}>
            <Text style={{color: 'green', fontWeight: 'bold'}}>Friends</Text>
          </Pressable>
        </View>
        <View style={{marginTop: 0, marginHorizontal: 25}}>
          <View style={styles.infoMain}>
            <View style={styles.infoCont}>
              <View style={styles.infoText}>
                <Text style={styles.infoLarge_Text}>Email</Text>
                <Text style={styles.infoSmall_Text} numberOfLines={1}>
                  {email}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoMain}>
            <View style={styles.infoCont}>
              <View style={styles.infoText}>
                <Text style={styles.infoLarge_Text}>Gender</Text>
                <Text style={styles.infoSmall_Text}>{gender}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={{marginStart: 18, marginTop: 11}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Visibility:</Text>
          <Picker
            style={{marginTop: -14}}
            selectedValue={visibility}
            onValueChange={(itemValue, itemIndex) => setVisibility(itemValue)}>
            <Picker.Item label="Public" value="public" />
            <Picker.Item label="Private" value="private" />
          </Picker>
        </View>
        <View style={styles.postSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter caption"
            value={caption}
            onChangeText={text => setCaption(text)}
            //onChangeText={setCaption}
          />

          <View style={{marginStart: 11}}>
            {imageUrl && (
              <Image
                source={{
                  // uri: imageUrl.uri,
                  uri: imageUrl,
                }}
                style={styles.image}
              />
            )}
          </View>

          <View style={{marginTop: 11, flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#001FBF',
                padding: 10,
                borderRadius: 6,
                width: 105,
              }}
              onPress={pickImage}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
                Pick an image
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#001FBF',
                padding: 10,
                borderRadius: 6,
                width: 105,
                marginStart: 141,
              }}
              onPress={handlePost}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View
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
      </View> */}

      {/* <View style={{marginTop: 21, backgroundColor: '#fff'}}>
        {posts.map(item => renderItem({item}))}
      </View> */}

      <View style={{marginTop: 21, backgroundColor: '#fff'}}>
        {posts.map(item => (
          <View key={item._id}>{renderItem({item})}</View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
    marginTop: 61,
    marginStart: 261,
  },
  chooseImageButton: {
    color: '#007bff',
    marginBottom: 6,
    marginTop: 6,
    textAlign: 'center',
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
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  optionText: {
    fontSize: 18,
    color: 'black',
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
  pickButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 12,
    borderRadius: 5,
    color: 'black',
  },
  postButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginVertical: 12,
    borderRadius: 5,
    color: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    height: 100,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  postSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  image: {
    width: 330,
    height: 330,
    marginTop: 10,
  },

  //end
  unreadv: {
    position: 'absolute',
    backgroundColor: '#ff3250',
    right: -5,
    marginTop: 10,
    marginRight: 268,
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

  editIcon: {
    zIndex: 1,
    color: 'white',
    position: 'absolute',
    right: 2,
    margin: 15,
  },
  backIcon: {
    zIndex: 1,
    color: 'white',
    position: 'absolute',
    left: 2,
    margin: 15,
  },
  avatar: {
    borderRadius: 120,
    marginTop: 20,
    backgroundColor: 'white',
    height: 250,
    width: 250,
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    //textAlign: 'center',
  },
  bookCountMain: {
    borderColor: '#b0b0b0',
    borderWidth: 1,
    marginTop: 18,
    marginHorizontal: 20,

    borderRadius: 20,
    flexDirection: 'row',
    width: '88%',
  },
  bookCount: {
    width: '50%',
    borderColor: '#b0b0b0',
    borderRightWidth: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCountNum: {
    color: '#5D01AA',
    fontSize: 34,
    fontWeight: '800',
  },
  bookCountText: {color: '#b3b3b3', fontSize: 14, fontWeight: '500'},
  infoMain: {
    marginTop: 1,
  },
  infoCont: {
    width: '100%',
    flexDirection: 'row',
  },
  infoIconCont: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,

    alignItems: 'center',
    elevation: -5,
    borderColor: 'black',
    backgroundColor: 'black',
  },

  infoText: {
    width: '80%',
    flexDirection: 'column',
    marginLeft: 25,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#e6e6e6',
  },
  infoSmall_Text: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  infoLarge_Text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  booksUploadedMain: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    marginTop: 20,
  },
  flatlistDiv: {
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  booksUploadedText: {
    fontSize: 26,
    color: 'black',
    fontWeight: '700',
    paddingLeft: 20,
    paddingBottom: 8,
  },
  booksUploadedCard: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 9,
    marginBottom: 9,

    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 3,
  },
  booksUploadedImgDiv: {
    width: '28%',
  },
  booksUploadedImg: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  cardMidDiv: {
    paddingHorizontal: 10,
    width: '55%',
    position: 'relative',
  },
  approvedText: {
    fontSize: 12,
    color: '#0d7313',
    fontWeight: '600',
    marginLeft: 5,
  },
  cardBookNameText: {
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
    marginTop: 2,
  },
  cardBookAuthor: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    marginTop: 1,
  },
  cardRating: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  cardRatingCount: {
    fontSize: 14,
    marginTop: -2,
    paddingLeft: 4,
    color: '#303030',
  },
  cardEditDiv: {
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEditBtn: {
    height: 44,
    width: 44,
    backgroundColor: '#774BBC',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',

    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#f5a002',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    paddingHorizontal: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
});
export default ProfileScreen;
