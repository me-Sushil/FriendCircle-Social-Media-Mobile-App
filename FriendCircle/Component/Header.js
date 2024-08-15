// import React from 'react';
// import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

// const Header = () => {
//   return (
//     <View styles={styles.containerr}>
//       <TouchableOpacity>
//         <Image
//           style={styles.logo}
//           source={require('../assets/logo.png1.png')}
//         />
//         <Text
//           style={{
//             marginTop: -2,
//             marginBottom: 3,
//             fontSize: 16,
//             marginLeft: 11,
//             fontWeight: 'bold',
//             color: 'black',
//           }}>
//           FriendCircle
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <View style={styles.unreadv}>
//           <Text style={styles.unread}>11</Text>
//         </View>
//         <Image
//           source={{
//             uri: 'https://cdn-icons-png.flaticon.com/128/16309/16309890.png',
//           }}
//           style={{
//             width: 30,
//             height: 30,
//             marginLeft: 358,
//             marginTop: -69,
//           }}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   logo: {
//     width: 90,
//     height: 50,
//     marginTop: 9,
//     // resizeMode: 'contain',
//   },
//   containerr: {
//     // flex:1,
//   },

//   unreadv: {
//     position: 'absolute',
//     backgroundColor: '#ff3250',
//     right: -5,
//     marginTop:-57,
//     marginRight:13,
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
// });

// export default Header;


import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const Header = ({ onRefresh }) => {
  return (
    <View styles={styles.containerr}>
      <TouchableOpacity onPress={onRefresh}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png1.png')}
        />
        <Text
          style={{
            marginTop: -2,
            marginBottom: 3,
            fontSize: 16,
            marginLeft: 11,
            fontWeight: 'bold',
            color: 'black',
          }}>
          FriendCircle
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <View style={styles.unreadv}>
          <Text style={styles.unread}>11</Text>
        </View>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/16309/16309890.png',
          }}
          style={{
            width: 30,
            height: 30,
            marginLeft: 358,
            marginTop: -69,
          }}
        />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 90,
    height: 50,
    marginTop: 9,
    // resizeMode: 'contain',
  },
  containerr: {
    // flex:1,
  },

  unreadv: {
    position: 'absolute',
    backgroundColor: '#ff3250',
    right: -5,
    marginTop:-57,
    marginRight:13,
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
});

export default Header;
