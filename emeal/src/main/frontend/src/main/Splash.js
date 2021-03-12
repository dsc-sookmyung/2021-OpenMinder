import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Splash = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>EVERYONE'S MEAL</Text>
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
    color: '#B4D966',
    width: 200,
  },
});


export default Splash;