import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Pressable,
    TextInput,
    Alert,
  } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import {useFocusEffect, useRoute} from '@react-navigation/native';
  import React, {useEffect, useState, useCallback} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import axios from 'axios';
  import {fetchPostsByPosterId} from '../postget';
  const {jwtDecode} = require('jwt-decode');
  import {fetchPublicPostsByPosterId} from '../postget';
  
  const UserProfile = () => {
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
    const [namee, setNamee] = useState('');
    const route = useRoute(); // Access the route object
    useEffect(() => {
        const { userId } = route.params; // Get userId from navigation parameters
        console.log(userId,"this is user Id from home page navigation");
        setUserId(userId); // Set userId in state
        setId(userId);
      }, [route.params]);


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
        userId:Idd,
        name:namee,
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
  
    const toggleModal = postId => {
      setSelectedPostId(postId);
      console.log(postId, 'this is post id ');
      setModalVisible(!modalVisible);
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
  
  

    const [userDataa, setUserDataa] = useState([]);
    const [Idd, setIdd] = useState('');

    const fetchloginUserData = async () => {
        const userId = Idd;
        if (userId) {
           
          try {
            const response = await axios.get(
              `http://10.0.2.2:5001/userr/${userId}`,
            );
            setUserDataa(response.data);
            setNamee(response.data.name);
           
          } catch (err) {
            console.log('error retrieving users data', err);
          }
        }
      };

      useEffect(() => {
        fetchloginUserData();
      }, [Idd]);


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
      const userIId = decodedToken.userId;
      setIdd(userIId);
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
  
  
  
    //start to post
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [Pimage, setPImage] = useState('');
    const [visibility, setVisibility] = useState('public'); // Default visibility is public
  
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
    console.log(Pimage, ' public \\profile pic kko');
  
  
  
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPublicPostsByPosterId(posterid);
        console.log(fetchedPosts, 'fetchedPosts');
        setPosts(fetchedPosts);
        console.log(posts, 'saroj ho hai van dai');
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };
   
  
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
          userId:Idd,
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
                    >
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
                    <Image
                      source={{uri: comments.profileImageUrl}}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        marginRight: 10,
                      }}
                    />
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
                // borderRadius: 120,profileImageUrlFirst
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
  
                  
            <View
              style={{
                borderRadius: 120,
                marginTop: -147,
                marginLeft: 79,
                //backgroundColor: 'white',
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
         
         
  
          <View style={{marginTop: 20}}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
  
         
{/* 
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
           // onPress={editProfileData}
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
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           // onPress={logout}
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
          </TouchableOpacity>
        </View> */}


          <View style={{marginTop: 8, marginHorizontal: 25}}>
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
  export default UserProfile;
  




// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Pressable,
//   TextInput,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {useFocusEffect, useRoute} from '@react-navigation/native';
// import React, {useEffect, useState, useCallback} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
// import {fetchPostsByPosterId} from '../postget';
// const {jwtDecode} = require('jwt-decode');
// import {fetchPublicPostsByPosterId} from '../postget';

// const UserProfile = () => {
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
//   const [namee, setNamee] = useState('');
//   const route = useRoute(); // Access the route object
//   useEffect(() => {
//       const { userId } = route.params; // Get userId from navigation parameters
//       console.log(userId,"this is user Id from home page navigation");
//       setUserId(userId); // Set userId in state
//       setId(userId);
//     }, [route.params]);




//     //THIS IS TO CHECK FRIEND OR NOT , REQUEST OR NOT
//     const [isFriend, setIsFriend] = useState(false);
//     const [receivedRequest, setReceivedRequest] = useState(false); // Track if the current user has received a friend request from this user//added for view accept in search friend

//     const checkIfFriend = async (currentUserId, selectedUserId) => {
//       try {
//         const response = await axios.get(
//           `http://10.0.2.2:5001/user/${currentUserId}`,
//         );
//         const friends = response.data.friends || [];
//         const sentFriendRequests = response.data.sentFriendRequests || []; //added for view accept in search friend
//         if (friends.includes(selectedUserId)) {
//           setIsFriend(true);
//           console.log('kklsanam', isFriend);
//         } else if (sentFriendRequests.includes(selectedUserId)) {
//           //added for view accept in search friend
//           setRequestSent(true);
//         }
//       } catch (error) {
//         console.error('Error checking if friend:', error);
//       }
//     };
  
//     // Function to check if a friend request is received
//     const checkFriendRequestReceived = async (currentUserId, selectedUserId) => {
//       try {
//         const response = await axios.get(
//           `http://10.0.2.2:5001/user/${currentUserId}`,
//         );
//         const friendRequests = response.data.friendRequests || [];
  
//         if (friendRequests.includes(selectedUserId)) {
//           setReceivedRequest(true);
//         }
//       } catch (error) {
//         console.error('Error checking friend request received:', error);
//       }
//     };
  
//     useEffect(() => {
//       fetchProfilepicByPosterId();
//       checkIfFriend(Idd, userId);
//       checkFriendRequestReceived(Idd, userId); // Call the function to check friend request received
//     }, [posterid, Idd, userId]);
  
//     const [requestSent, setRequestSent] = useState(false);
//     const sendFriendRequest = async (currentUserId, selectedUserId) => {
//       try {
//         const response = await fetch('http://10.0.2.2:5001/friend-request', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({currentUserId, selectedUserId}),
//         });
//         if (response.ok) {
//           setRequestSent(true);
//         }
//       } catch (error) {
//         console.log('error message', error);
//       }
//     };
  
//     const cancelFriendRequest = async (currentUserId, selectedUserId) => {
//       try {
//         const response = await fetch(
//           'http://10.0.2.2:5001/friend-request/cancel',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({currentUserId, selectedUserId}),
//           },
//         );
//         if (response.ok) {
//           setRequestSent(false);
//         } else {
//           console.error(
//             'Failed to cancel friend request:',
//             response.status,
//             response.statusText,
//           );
//         }
//       } catch (error) {
//         console.log('error message', error);
//       }
//     };
  
//     //added for view accept in search friend
//     const acceptFriendRequest = async (currentUserId, selectedUserId) => {
//       try {
//         const response = await fetch(
//           'http://10.0.2.2:5001/friend-request/accept',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               senderId: currentUserId,
//               recepientId: selectedUserId,
//             }),
//           },
//         );
//         if (response.ok) {
//           setIsFriend(true);
//           setReceivedRequest(false); // Reset received request state
//         } else {
//           console.error(
//             'Failed to accept friend request:',
//             response.status,
//             response.statusText,
//           );
//         }
//       } catch (error) {
//         console.log('error message', error);
//       }
//     };
//     //END OF THIS SECTION

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
//       userId:Idd,
//       name:namee,
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

//   const toggleModal = postId => {
//     setSelectedPostId(postId);
//     console.log(postId, 'this is post id ');
//     setModalVisible(!modalVisible);
//   };

 
//   const fetchUserData = async () => {
//     if (userId) {
//       try {
//         const response = await axios.get(
//           `http://10.0.2.2:5001/userr/${userId}`,
//         );
//         setUserData(response.data);
//         setName(response.data.name);
//         setEmail(response.data.email);
//         setGender(response.data.gender);
//       } catch (err) {
//         console.log('error retrieving users data', err);
//       }
//     }
//   };
//   useEffect(() => {
//     fetchUserData();
//   }, [userId]);



//   const [userDataa, setUserDataa] = useState([]);
//   const [Idd, setIdd] = useState('');

//   const fetchloginUserData = async () => {
//       const userId = Idd;
//       if (userId) {
         
//         try {
//           const response = await axios.get(
//             `http://10.0.2.2:5001/userr/${userId}`,
//           );
//           setUserDataa(response.data);
//           setNamee(response.data.name);
         
//         } catch (err) {
//           console.log('error retrieving users data', err);
//         }
//       }
//     };

//     useEffect(() => {
//       fetchloginUserData();
//     }, [Idd]);


//   console.log(userData, ' user data ');
//   console.log(name, 'name from user data ');
//   console.log(email, 'email from user data ');
//   console.log(gender, ' gender form user data ');

//   const fetchUsers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found');
//     }
//     console.log(token, 'token in home page');
//     const decodedToken = jwtDecode(token);
//     console.log(decodedToken, 'decodedToken in home page');
//     const userIId = decodedToken.userId;
//     setIdd(userIId);
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



//   //start to post
//   const [profileImageUrl, setProfileImageUrl] = useState('');
//   const [Pimage, setPImage] = useState('');
//   const [visibility, setVisibility] = useState('public'); // Default visibility is public

//   const fetchProfilepicByPosterId = async () => {
//     try {
//       const response = await axios.get(
//         `http://10.0.2.2:5001/profilepic/${posterid}`,
//       );
//       console.log(response.data, 'Response from backend'); // Add this line for debugging

//       if (!response.data || !response.data.profileImageUrl) {
//         // If profileImageUrl is empty or undefined, alert the user
//         console.log('Please upload your profile picture.');
//       } else {
//         setProfileImageUrl(response.data.profileImageUrl);
//         console.log(response.data.profileImageUrl, 'thtiththththtt');
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };
//   console.log(Pimage, ' public \\profile pic kko');



//   const loadPosts = async () => {
//     try {
//       const fetchedPosts = await fetchPublicPostsByPosterId(posterid);
//       console.log(fetchedPosts, 'fetchedPosts');
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

//   //Like
//   const [likes, setLikes] = useState({});

//   const [touchCount, setTouchCount] = useState(0);
//   const [likedPosts, setLikedPosts] = useState(new Set());

//   const handleImageTouch = async postId => {
//     if (likedPosts.has(postId)) {
//       return; // User already liked this post
//     }

//     try {
//       const response = await axios.post('http://10.0.2.2:5001/likes/toggle', {
//         postId,
//         userId:Idd,
//       });
//       if (response.data.message === 'Post liked successfully.') {
//         setLikedPosts(new Set([...likedPosts, postId]));
//         setLikes(prevLikes => ({
//           ...prevLikes,
//           [postId]: (prevLikes[postId] || 0) + 1,
//         }));
//         loadPosts();
//       } else if (response.data.message === 'Post unliked successfully.') {
//         const updatedLikedPosts = new Set(likedPosts);
//         updatedLikedPosts.delete(postId);
//         setLikedPosts(updatedLikedPosts);
//         setLikes(prevLikes => ({
//           ...prevLikes,
//           [postId]: Math.max((prevLikes[postId] || 1) - 1, 0),
//         }));
//         loadPosts();
//       }
//     } catch (error) {
//       console.error('Error sending like to backend:', error);
//       Alert.alert('Error', 'Failed to like the post');
//     }
//   };

//   const renderItem = ({item}) => {
//     console.log(item, 'this is item and id jsjs');
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
//                   >
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
//             {item.caption && item.imageUrl ? (
//               <>
//                 <View>
//                   <Text
//                     style={{
//                       fontSize: 16,
//                       marginTop: 5,
//                       marginStart: 15,
//                       color: 'black',
//                       marginBottom: 5,
//                     }}>
//                     {item.caption}
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     backgroundColor: '#0080ff',
//                   }}>
//                   <Image
//                     source={{uri: item.imageUrl}}
//                     style={{
//                       width: '100%',
//                       height: 450,
//                     }}
//                   />
//                 </View>
//               </>
//             ) : item.caption ? (
//               <View>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     marginTop: 15,
//                     marginStart: 15,
//                     marginEnd: 15,
//                     color: 'black',
//                     marginBottom: 15,
//                     width: '95%',
//                     //height: 50,
//                   }}>
//                   {item.caption}
//                 </Text>
//               </View>
//             ) : item.imageUrl ? (
//               <View
//                 style={{
//                   backgroundColor: '#0080ff',
//                 }}>
//                 <Image
//                   source={{uri: item.imageUrl}}
//                   style={{
//                     width: '100%',
//                     height: 450,
//                   }}
//                 />
//               </View>
//             ) : null}
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
//               onPress={() => handleImageTouch(item._id)}>
//               <Image
//                 source={{
//                   uri: isLiked
//                     ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png'
//                     : 'https://cdn-icons-png.flaticon.com/512/833/833300.png',
//                 }}
//                 style={{
//                   width: 30,
//                   height: 30,
//                   marginStart: 71,
//                   marginTop: 4,
//                   marginBottom: 3,
//                 }}
//               />
//               <Text
//                 style={{
//                   marginTop: 3,
//                   marginLeft: -48,
//                   fontSize: 19,
//                   color: 'black',
//                 }}>
//                 {item.likeCount}
//               </Text>
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
//                     <View style={{width: '92%', marginEnd: 32}}>
//                       <Text style={{color: 'black', marginBottom: 8}}>
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

//   console.log(imageUrl, 'fkjufheniu');
//   return (
//     <ScrollView showsVerticalScrollIndicator={true}>
//       <View>


//         <View>
//           <Image
//             style={{
//               // borderRadius: 120,profileImageUrlFirst
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
       
       

//         <View style={{marginTop: 20}}>
//           <Text style={styles.nameText}>{name}</Text>
//         </View>

       



//         {isFriend ? (
//           <Pressable
//             onPress={() => navigation.navigate('Messages', {userId: userId})}
//             style={{
//               backgroundColor: '#001FBF',
//               padding: 10,
//               borderRadius: 6,
//               width: 80,
//             }}>
//             <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
//               Chat
//             </Text>
//           </Pressable>
//         ) : receivedRequest ? ( // Show "Accept" button if friend request is received
//           <Pressable
//             onPress={() => acceptFriendRequest(Idd, userId)}
//             style={{
//               backgroundColor: '#008000',
//               padding: 10,
//               borderRadius: 6,
//               width: 80,
//             }}>
//             <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
//               Accept
//             </Text>
//           </Pressable>
//         ) : requestSent ? (
//           <Pressable
//             onPress={() => cancelFriendRequest(Idd, userId)}
//             style={{
//               backgroundColor: '#001FBF',
//               padding: 10,
//               borderRadius: 6,
//               width: 115,
//             }}>
//             <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
//               Cancel Request
//             </Text>
//           </Pressable>
//         ) : (
//           <Pressable
//             onPress={() => sendFriendRequest(Idd, userId)}
//             style={{
//               backgroundColor: '#001FBF',
//               padding: 10,
//               borderRadius: 6,
//               width: 105,
//             }}>
//             <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
//               Add Friend
//             </Text>
//           </Pressable>
//         )}

// {/* 
//         <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 10,
//           marginTop: 20,
//           marginStart: 20,
//           marginEnd: 20,
//         }}>
//         <TouchableOpacity
//          // onPress={editProfileData}
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: 10,
//             borderColor: 'black',
//             borderWidth: 1,
//             borderRadius: 5,
//           }}>
//           <Text style={{color: 'black', fontWeight: 'bold'}}>
//             Friends
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//          // onPress={logout}
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: 10,
//             borderColor: 'black',
//             borderWidth: 1,
//             borderRadius: 5,
//           }}>
//           <Text style={{color: 'black', fontWeight: 'bold'}}>Logout</Text>
//         </TouchableOpacity>
//       </View> */}


//         <View style={{marginTop: 8, marginHorizontal: 25}}>
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
//   chooseImageButton: {
//     color: '#007bff',
//     marginBottom: 6,
//     marginTop: 6,
//     textAlign: 'center',
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
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 18,
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
// export default UserProfile;
