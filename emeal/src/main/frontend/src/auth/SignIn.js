import React, { useState, useEffect, useContext, createContext } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../_modules/user';



const SignIn = ({ navigation }) => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const handleSignIn = (username, password) => {
      dispatch(signIn(username, password));
      console.log(user.error)
      if (user.error) {
        Alert.alert(
          "Login Failed",
          "The username or password you've entered doesn't match any account.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Log in</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder='username'
          placeholderTextColor = '#F2CE16'
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={'password'}
          secureTextEntry={true}
          placeholderTextColor = '#F2CE16'
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {handleSignIn(username, password)}}
        >
         <Text style={styles.buttonText}> LOG IN </Text>
        </TouchableOpacity>
        <Text style={styles.reigsterButton} onPress={() => {navigation.navigate('SignUp')}}>
          New User? Register Now!
        </Text>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  titleText:{
    fontFamily: 'Comfortaa-Bold',
    fontSize: 50,
    color: '#F2BB16',
    width: 200,
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 30,
    marginBottom: 20
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F2BB16',
    width: 350,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText:{
    fontFamily: 'Baskerville',
    fontSize: 20,
    color: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 350,
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F2CE16',
    marginVertical: 10,
  },
  reigsterButton: {
    fontFamily: 'Baskerville',
    fontSize: 15,
    color: '#F2BB16',
    marginTop: 20
  }
});


export default SignIn;