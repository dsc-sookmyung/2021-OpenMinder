import React, { useState, useEffect, useContext, createContext } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';

import { Container, Content } from 'native-base';
import PostCard from './PostCard';

const PostDetailPage = ({ navigation }) => {

    return (
      <Container style={styles.container}>
          <Content>
              <PostCard />
          </Content>
      </Container>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  tagContainer: {
    marginBottom: 10,

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


export default PostDetailPage;