// import React, {useEffect, useState} from 'react';
// import styles from './Style';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const Login = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [gender, setGender] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [condition, setCondition] = useState(true);
//   const Valid = () => {
//     console.log(email, password);
//     const userData = {
//       //name: name,
//       //gender: gender,
//       email: email,
//       password,
//     };
//     axios.post('http://10.0.2.2:5001/login-user', userData).then(res => {
//       console.log(res.data);
//       if (res.data.status === 'ok') {
//         // Alert.alert('Logged In Successfull!!');
//         console.log(res.data.data, 'login token');
//         AsyncStorage.setItem('token', res.data.data);
//         navigation.navigate('Main');
//       } else {
//         Alert.alert('Invalid email or password');
//       }
//     });
//   };

//   return (
//     <View>
//       <View>
//         <StatusBar backgroundColor="black" barStyle="default" hidden={false} />
//       </View>
//       <View style={styles.loginContainer}>
//         <Text style={styles.text_header}>FriendCircle</Text>
//       </View>
//       <View style={styles.action}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="@email"
//           onChangeText={setEmail}
//           value={email}
//         />
//       </View>

//       <View>
//         <View
//           style={{
//             width: '90%',
//             height: 55,
//            // alignItems: 'center',
//             flexDirection: 'row',
//             paddingTop: 14,
//             paddingBottom: 3,
//             justifyContent:"space-between",
//             marginTop: 15,
//             marginStart: 19,
//             paddingHorizontal: 15,
//             borderWidth: 1,
//             borderColor: '#420475',
//             borderRadius: 50,
//           }}>
//           <View>
//             <TextInput
//               style={styles.textInput}
//               placeholder="Password"
//               onChangeText={setPassword}
//               value={password}
//               secureTextEntry={condition}
//             />
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             {condition ? (
//               <View>
//                 <TouchableOpacity onPress={() => setCondition(false)}>
//                   <Text style={{fontWeight: 'bold', color: 'black'}}>Show</Text>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View>
//                 <TouchableOpacity onPress={() => setCondition(true)}>
//                   <Text style={{fontWeight: 'bold', color: 'black'}}>Hide</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </View>
//       </View>
// {/* <View
//         style={{
//           marginTop: 8,
//           marginRight: 10,
//           marginStart: 260,
//         }}>
//         <TouchableOpacity onPress={Valid}>
//           <View>
//             <Text style={{color: '#420475', fontWeight: '700'}}>
//               Forget Password
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View> */}

//       <View style={styles.button}>
//         <TouchableOpacity onPress={Valid} style={styles.inBut}>
//           <View style={{margin: 10, paddingStart: 22}}>
//             <Text style={styles.textSign}>LOGIN</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//       <View style={{flexDirection: 'row', alignSelf: 'center'}}></View>
//       <View>
//         <Text
//           style={{
//             marginTop: 10,
//             marginLeft: 130,
//             marginBottom: 10,
//             color: 'black',
//             fontSize: 17,
//           }}>
//           Don't have an
//         </Text>
//       </View>

//       <View>
//         <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//           <View>
//             <Text
//               style={{
//                 marginStart: 235,
//                 marginTop: -33,
//                 color: '#420475',
//                 fontWeight: 'bold',
//                 fontSize: 17,
//               }}>
//               Account?
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// export default Login;



import React, {useEffect, useState} from 'react';
import styles from './Style';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [condition, setCondition] = useState(true);

  const Valid = () => {
    console.log(email, password);
    const userData = {
      //name: name,
      //gender: gender,
      email: email,
      password,
    };
    
    axios.post('http://10.0.2.2:5001/login-user', userData).then(res => {
      console.log(res.data);
      if (res.data.status === 'ok') {
        // Alert.alert('Logged In Successfull!!');
        console.log(res.data.data, 'login token');
        AsyncStorage.setItem('token', res.data.data);
        navigation.navigate('Main');
      } else {
        Alert.alert('Invalid email or password');
      }
    
    });
  };

  return (
    <View>
      <View>
        <StatusBar backgroundColor="black" barStyle="default" hidden={false} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.text_header}>FriendCircle</Text>
      </View>
      <View style={styles.action}>
        <TextInput
          style={styles.textInput}
          placeholder="@email"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View>
        <View
          style={{
            width: '90%',
            height: 55,
           // alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 14,
            paddingBottom: 3,
            justifyContent:"space-between",
            marginTop: 15,
            marginStart: 19,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: '#420475',
            borderRadius: 50,
          }}>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={condition}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            {condition ? (
              <View>
                <TouchableOpacity onPress={() => setCondition(false)}>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>Show</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={() => setCondition(true)}>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>Hide</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
{/* <View
        style={{
          marginTop: 8,
          marginRight: 10,
          marginStart: 260,
        }}>
        <TouchableOpacity onPress={Valid}>
          <View>
            <Text style={{color: '#420475', fontWeight: '700'}}>
              Forget Password
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}

      <View style={styles.button}>
        <TouchableOpacity onPress={Valid} style={styles.inBut}>
          <View style={{margin: 10, paddingStart: 22}}>
            <Text style={styles.textSign}>LOGIN</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}></View>
      <View>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 130,
            marginBottom: 10,
            color: 'black',
            fontSize: 17,
          }}>
          Don't have an
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <View>
            <Text
              style={{
                marginStart: 235,
                marginTop: -33,
                color: '#420475',
                fontWeight: 'bold',
                fontSize: 17,
              }}>
              Account?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;
