import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet, Button } from 'react-native';

import { AuthContext } from '../context';

const Main = ({ navigation }) => {

    const { signOut } = useContext(AuthContext);
  
    return (
      <View>
        <Text>Main</Text>
        <Button
          title="Sign Out"
          onPress={() => {signOut()}}
        />
      </View>
    );
  }


export default Main;