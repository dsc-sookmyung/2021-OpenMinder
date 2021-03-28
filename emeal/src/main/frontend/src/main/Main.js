import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Header, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import { useDispatch } from 'react-redux';
import { signOut } from '../_modules/user';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';
import CardComponent from '../component/CardComponent';
import DetailPage from '../community/DetailPage';

const Main = ({ navigation }) => {
  const dispatch = useDispatch();

  const [recentPostData, setrecentPostData] = useState([]);

  const getRecentPosts = () => {
    let config = { params: { numPosts: 10 } };
    axios.get(`${LOCAL}/download/recentPosts`, config)
      .then(res => {
        console.log(res.data)
        setrecentPostData(res.data)
      })
      .catch(e => console.log(e));
  }

  const renderCards = recentPostData.map((data, index) => {
    return (
      <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => navigation.navigate('DetailPage', { postId: data.postId })}>
        <CardComponent
          userId={data.userId}
          mealType={data.mealType}
          imageSource={LOCAL + data.pictures[0].pictureDownloadUri}
          likes='0'
          date={data.insertTime}
          content={data.content}
          avatar={data.avatarDownloadUri}
        />
      </TouchableOpacity>
    )
  })

  useEffect(() => {
    console.log('reload')
    getRecentPosts();
  }, [])


  return (
    <Container style={style.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20 }}>
        <TouchableOpacity onPress={() => { dispatch(signOut()) }}>
          <View style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='log-out' />
            <Text style={{ fontSize: 10 }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{ fontFamily: 'Comfortaa-Regular', fontSize: 30 }}>What's New Meal ?</Text>
      </View>

      <Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true} style={style.scrollView}>
          {renderCards}
        </ScrollView>
      </Content>

      <View>
        <Text style={{ fontFamily: 'Comfortaa-Regular', fontSize: 30 }}>My Water</Text>
      </View>
    </Container>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: '#F2CE16'
  }
})

export default Main;