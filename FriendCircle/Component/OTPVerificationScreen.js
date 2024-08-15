// OTPVerificationScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const OTPVerificationScreen = ({ navigation, route }) => {
  const { email } = route.params; // Get email from route params
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5001/verify-otp', { email, otp });
      if (response.data.message === "Email verified successfully") {
        setMessage('Email verified successfully!');
        // Navigate to home screen or another screen after successful verification
        navigation.navigate('Login');
      } else {
        setMessage('Invalid OTP, please try again.');
      }
    } catch (error) {
      //console.error(error);
      setMessage('Error verifying OTP, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter OTP sent to {email}</Text>
      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        placeholder="Enter OTP"
        maxLength={6}
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

export default OTPVerificationScreen;



// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// const OTPVerificationScreen = ({ navigation, route }) => {
//   const { email } = route.params; // Get email from route params
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [message, setMessage] = useState('');

//   const handleVerifyOtp = async () => {
//     const otpCode = otp.join('');
//     try {
//       const response = await axios.post('http://10.0.2.2:5001/verify-otp'/verify-otp, { email, otp: otpCode });
//       if (response.data.message === "Email verified successfully") {
//         setMessage('Email verified successfully!');
//         // Navigate to home screen or another screen after successful verification
//         navigation.navigate('Login');
//       } else {
//         setMessage('Invalid OTP, please try again.');
//       }
//     } catch (error) {
//       //console.error(error);
//       setMessage('Error verifying OTP, please try again.');
//     }
//   };

//   const handleOtpChange = (text, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);
//     if (text && index < otp.length - 1) {
//       nextInput(index);
//     }
//   };

//   const nextInput = (index) => {
//     const nextIndex = index + 1;
//     if (nextIndex < otp.length) {
//       otpRefs[nextIndex].focus();
//     }
//   };

//   const otpRefs = [];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>OTP Verification</Text>
//       <Text style={styles.subTitle}>Enter the OTP sent to</Text>
//       <Text style={styles.email}>{email}</Text>
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={(ref) => otpRefs[index] = ref}
//             style={styles.otpInput}
//             value={digit}
//             onChangeText={(text) => handleOtpChange(text, index)}
//             keyboardType="numeric"
//             maxLength={1}
//           />
//         ))}
//       </View>
//       <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
//         <Text style={styles.verifyButtonText}>Verify OTP</Text>
//       </TouchableOpacity>
//       {message ? <Text style={styles.message}>{message}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color:"black",
//   },
//   subTitle: {
//     fontSize: 18,
//     textAlign: 'center',
//     color:'black',
//   },
//   email: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#555',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     textAlign: 'center',
//     fontSize: 18,
//     backgroundColor: '#fff',
//     color:'black',
//   },
//   verifyButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   verifyButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   message: {
//     marginTop: 20,
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'red',
//   },
// });

// export default OTPVerificationScreen;
