import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import AuthenticationService from './AuthenticationService';

const SignUp = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    

    const handleSignUp = () => {
      AuthenticationService  
        .executeJwtSignUpService(username, password)
            .then(res => {
                Alert.alert('successfully registered');
                console.log(res)
                navigation.navigate('SignIn')
            })
            .catch(e => console.log(e))
    }

  
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Register</Text>
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
          onPress={handleSignUp}
       >
         <Text style={styles.buttonText}> REGISTER </Text>
       </TouchableOpacity>
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
    width: 250,
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
    alignItems: 'center',
    justifyContent: 'center',
    color: '#F2F2F2'
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
});


export default SignUp;