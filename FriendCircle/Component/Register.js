import React, {useState} from 'react';
import styles from './Style';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [namelengtherror, setNameLenghtError] = useState(false);
  const [gender, setGender] = useState('');
  const [genderVerify, setGenderVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailerror, setEmailError] = useState(false);
  const [invalidError, setInvalidError] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = valid.test(email);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [password, setPassword] = useState('');
  const [passworderror, setPasswordError] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordlengtherror, setPasswordLenghtError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(null);
  const [matchpassworderror, setMatchPassworderror] = useState(false);

  // const openImagePicker = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     maxHeight: 2000,
  //     maxWidth: 2000,
  //   };

  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('Image picker error: ', response.error);
  //     } else {
  //       let imageUri = response.uri || response.assets?.[0]?.uri;
  //       setImage(imageUri);
  //     }
  //   });
  // };

  const validateEmail = text => {
    setEmail(text);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValid);
  };

  const validatePassword = text => {
    setPassword(text);
    const isValid = text.length >= 4; // Example: Password must be at least 6 characters long
    setIsPasswordValid(isValid);
  };

  const validateConfirmPassword = text => {
    setConfirmPassword(text);
    const isValid = text === password;
    setIsConfirmPasswordValid(isValid);
  };
  const Validation = () => {
    //name validation start
    if (!name) {
      setNameError(true);
      return false;
    } else {
      setNameError(false);
    }
    if (name.length < 4) {
      setNameLenghtError(true);
    } else {
      setNameLenghtError(false);
    }
    if (!gender) {
      setGenderVerify(true);
      return false;
    } else {
      setGenderVerify(false);
    }
    //email validation start
    if (!email) {
      setEmailError(true);
      return false;
    } else if (!isValid) {
      setInvalidError(true);
      return false;
    } else {
      setEmailError(false);
      setInvalidError(false);
    }
    if (!password) {
      setPasswordError(true);
      return false;
    } else if (password.length < 4) {
      setPasswordLenghtError(true);
      return false;
    } else {
      setPasswordError(false);
      setPasswordLenghtError(false);
    }
    if (password !== confirmPassword) {
      setMatchPassworderror(true);
      return false;
    } else {
      setMatchPassworderror(false);
    }
    // if (!image) {
    //   Alert.alert('Please select an image');
    //   return false;
    // }

    //edit start from here
    const userData = {
      name: name,
      gender: gender,
      email: email,
      password: password,
    };
    //console.log(image);

    if (
      !name ||
      name.length < 4 ||
      !email ||
      !isValid ||
      !password ||
      password !== confirmPassword
    ) {
      Alert.alert('Fill mandatory details');
      return false;
    } else {
      // If all validations pass, call handleSubmit
      axios
        .post('http://10.0.2.2:5001/register', userData)
        .then(res => {
          console.log(res.data);
          if (res.data.status == 'ok') {
            //setMessage('Registration successful! Please verify your email.');
            Alert.alert('Registrered Successfull!! Please verify your email.');
            // navigation.navigate('Login');
            navigation.navigate('OTPVerificationScreen', {email});
          } else {
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch(e => console.log(e));
    }
    console.log(userData, 'badhkfouih');
  };

  const Valid = () => {
    navigation.navigate('Login');
  };
  const [message, setMessage] = useState('');
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={{flex: 1}}>
        <View>
          <StatusBar
            backgroundColor="black"
            barStyle="default"
            hidden={false}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={styles.loginContainer}>
            <Text
              style={{
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: -15,
                marginBottom: -15,
              }}>
              FriendCircle
            </Text>
          </View>

          <View
            style={[
              styles.action,
              {borderColor: name.length > 4 === false ? 'red' : '#420475'},
            ]}>
            <TextInput
              style={styles.textInput}
              editable={true}
              contextMenuHidden={false}
              placeholder="@username"
              onChangeText={text => setName(text)}
              value={name}
            />
          </View>
          {nameError ? (
            <View style={{marginStart: 15, marginTop: 6}}>
              <Text style={{color: 'red'}}>Please enter username</Text>
            </View>
          ) : null}
          {namelengtherror ? (
            <View style={{marginStart: 15, marginTop: 6}}>
              <Text style={{color: 'red'}}>Enter atleast 5 Charecter</Text>
            </View>
          ) : null}

          <View
            style={[styles.action, {borderColor: !gender ? 'red' : '#420475'}]}>
            <Picker
              style={styles.textInput}
              selectedValue={gender}
              onValueChange={itemValue => setGender(itemValue)}>
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          {genderVerify ? (
            <View style={{marginStart: 15, marginTop: 6}}>
              <Text style={{color: 'red'}}>Please select Gender</Text>
            </View>
          ) : null}

          <View
            style={[
              styles.action,
              {borderColor: isValid === false ? 'red' : '#420475'},
            ]}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
          </View>
          {emailerror ? (
            <View>
              <Text style={{marginStart: 15, marginTop: 6, color: 'red'}}>
                Please enter a valid email address.
              </Text>
            </View>
          ) : null}

          <View
            style={[
              styles.action,
              {borderColor: password.length > 3 === false ? 'red' : '#420475'},
            ]}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={!isPasswordVisible}
            />
          </View>
          {passwordlengtherror ? (
            <View>
              <Text style={{marginStart: 15, marginTop: 6, color: 'red'}}>
                Password must be at least 4 characters long.
              </Text>
            </View>
          ) : null}

         
            <View
              style={[
                styles.action,
                {borderColor: confirmPassword.length > 3 === false ? 'red' : '#420475'},
                //{borderColor: matchpassworderror === true ? 'red': '#420475'},
              ]}>
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
              />
            </View>
        
          {matchpassworderror !== false && (
            <Text style={{marginStart: 15, marginTop: 6, color: 'red'}}>
              Passwords do not match.
            </Text>
          )}

          <View style={styles.button}>
            <TouchableOpacity onPress={Validation} style={styles.inBut}>
              <View style={{margin: 10, paddingStart: 22}}>
                <Text style={styles.textSign}>REGISTER</Text>
              </View>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
          </View>

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'black',
                  fontSize: 17,
                }}>
                Already have an
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={Valid}>
                <View>
                  <Text
                    style={{
                      marginStart: 7,
                      marginTop: 10,
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
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};
export default Register;
