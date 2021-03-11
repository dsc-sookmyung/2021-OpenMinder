import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context';

function Main({ navigation }) {
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