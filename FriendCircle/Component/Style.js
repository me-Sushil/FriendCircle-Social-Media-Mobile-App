import { StyleSheet } from "react-native";
const styles = StyleSheet.create({

  Search: {
    flexDirection: 'row',
    alignContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 390,
    marginTop:12,
    borderRadius: 14,
    marginStart:10,
  },
    container: {
      backgroundColor: '#f8f8ff',
      flex: 1,
      marginHorizontal: 0,
    },
    input: {
      width: '100%',
      height: 50,
      marginVertical: 7,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    loginText: {
      marginTop: 10,
      marginBottom: 5,
    },
    Touchable: {
        height: 40,
        width: 110,
        marginTop: 10,
        backgroundColor: 'blue',
        borderColor: 'black',
        borderRadius: 10,
        alignSelf: 'center',
    },
    textSign: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      marginLeft: -19,
      
    },
    smallIcon: {
      marginRight: 10,
      fontSize: 24,
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 260,
      width: 260,
      marginTop: 30,
    },
    text_footer: {
      color: '#05375a',
      fontSize: 18,
    },
    action: {
      width: '90%',
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop: 14,
      paddingBottom: 3,
      marginTop: 15,
      marginStart: 19,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#420475',
      borderRadius: 50,
    },
    actions: {
      flexDirection: 'row',
      paddingTop: 14,
      paddingBottom: 3,
      marginTop: 15,
      paddingHorizontal: 15,
      borderWidth: 1,
     // borderColor: 'red',
      borderRadius: 50,
    },
    textInput: {
      fontSize: 22,
      flex: 1,
      marginTop: -12,
      
    },
    loginContainer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    header: {
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
    },
    text_header: {
      color: '#420475',
      fontWeight: 'bold',
      fontSize: 30,
    },
    button: {
      alignItems: 'center',
      marginTop: -20,
      alignItems: 'center',
      textAlign: 'center',
      margin: 20,
    },
    inBut: {
      width: '50%',
      backgroundColor: '#420475',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 40,
      marginTop:30,
    },
    inBut2: {
      backgroundColor: '#420475',
      height: 65,
      width: 65,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomButton: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    smallIcon2: {
      fontSize: 40,
      // marginRight: 10,
    },
    bottomText: {
      color: 'black',
      fontSize: 12,
      fontWeight: '600',
      marginTop: 5,
    },
  });

  export default styles;