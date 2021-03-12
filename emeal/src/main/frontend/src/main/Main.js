import React from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from '../_modules/user';


const Main = ({ navigation }) => {

  const dispatch = useDispatch();
    
  
    return (
      <View>
        <Text>Main</Text>
        <Button
          title="Sign Out"
          onPress={() => {dispatch(signOut())}}
        />
        <Button
          title="Go Detail Page"
          onPress={() => {navigation.navigate('PostDetailPage')}}
        />
      </View>
    );
  }


export default Main;