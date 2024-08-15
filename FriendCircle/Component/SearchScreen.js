// import React, {useEffect, useState} from 'react';
// import styles from './Style';
// import {Text, View,TextInput, Image, ScrollView} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import User from './User';

// const {jwtDecode} = require('jwt-decode');

// const SearchScreen = () => {
//   const [Id, setId] = useState('');
//   const [users, setUsers] = useState([]);
//   const fetchUsers = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }
//       console.log(token, 'token in home pageeee');
//       const decodedToken = jwtDecode(token);
//       console.log(decodedToken, 'decodedToken in home page');
//       const userId = decodedToken.userId;
//       console.log('usersId', userId);
//       setId(userId);
//       const response = await axios.get(`http://10.0.2.2:5001/users/${userId}`);
//       console.log(response.data, 'response.data');
//       setUsers(response.data);
//     } catch (error) {
//       console.log('error retrieving users', error);
//     }
//   };

//   useEffect(() => {
//     console.log('herere');
//     fetchUsers();
//   }, []);
//   console.log('users', users);

//   return (
//     <View>
//       <View style={styles.Search}>
//         <View>
//           <Image
//             source={{
//               uri: 'https://cdn-icons-png.flaticon.com/128/3917/3917132.png',
//             }}
//             style={{
//               width: 30,
//               height: 30,
//               marginTop: 8,
//               marginStart: 12,
//             }}
//           />
//         </View>
//         <View>
//           <TextInput placeholder="Search User Here" style={{marginLeft:12,fontSize: 18}} />
//         </View>
//       </View>

//       <View style={{padding: 10, marginTop: 5}}>
//         {users.length ? (
//           users.map((item, index) => <User key={index} item={item} Id={Id} />)
//         ) : (
//           <Text>No users found</Text>
//         )}
//       </View>
//     </View>
//   );
// };

// export default SearchScreen;

import React, {useEffect, useState} from 'react';
import styles from './Style';
import {Text, View, TextInput, Image, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import User from './User';
import {useNavigation} from '@react-navigation/native';
const {jwtDecode} = require('jwt-decode');

const SearchScreen = () => {
  const navigation = useNavigation();
  const [Id, setId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUser, setFilterUser] = useState([]);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      console.log(token, 'token in home pageeee');
      const decodedToken = jwtDecode(token);
      console.log(decodedToken, 'decodedToken in home page');
      const userId = decodedToken.userId;
      console.log('usersId', userId);
      setId(userId);
      const response = await axios.get(`http://10.0.2.2:5001/users/${userId}`);
      console.log(response.data, 'response.data');
      setUsers(response.data);
      setFilterUser(response.data);
    } catch (error) {
      console.log('error retrieving users', error);
    }
  };

  useEffect(() => {
    console.log('herere');
    fetchUsers();
  }, []);
  console.log('users', users);

  //here start for search
  useEffect(() => {
    handleSearch(); // Call handleSearch whenever searchQuery changes
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery === '') {
      setFilterUser(users);
    } else {
      const filterUser = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilterUser(filterUser);
    }
  };

  return (
    <View>



      <View style={styles.Search}>
        <View>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3917/3917132.png',
            }}
            style={{
              width: 30,
              height: 30,
              marginTop: 8,
              marginStart: 12,
            }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Search User Here"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            style={{marginLeft: 12, fontSize: 18}}
          />
        </View>
      </View>

      <View style={{padding: 10, marginTop: 5}}>
        {users.length ? (
          <FlatList
            data={filterUser}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <User item={item} Id={Id} navigation={navigation}/>}
          />
        ) : (
          <Text>No users found</Text>
        )}
      </View>

      {/* <View style={{padding: 10, marginTop: 5}}>
        {users.length ? (
          users.map((item, index) => <User key={index} item={item} Id={Id} />)
        ) : (
          <Text>No users found</Text>
        )}
      </View> */}
    </View>
  );
};

export default SearchScreen;
