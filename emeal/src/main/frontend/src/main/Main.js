import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Header, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Thumbnail, Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../_modules/user';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CardComponent from '../component/CardComponent';
import SkeletonComponent from '../component/SkeletonComponent';
import PieChartComponent from '../dataPage/PieChartComponent';
import DetailPage from '../community/DetailPage';

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [recentPostData, setrecentPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [water, setWater] = useState(0);
  const [recommendedWater, setRecommendedWater] = useState(160);

  const getRecentPosts = () => {
    let config = { params: { numPosts: 10 } };
    axios.get(`${LOCAL}/download/recentPosts`, config)
      .then(res => {
        console.log(res.data)
        setrecentPostData(res.data)
        setLoading(false);
      })
      .catch(e => console.log(e));
  }

  const renderCards = recentPostData.map((data, index) => {
    return (
      <TouchableOpacity style={{ width: 300, height: 400 }} key={index} activeOpacity={0.8} onPress={() => navigation.navigate('DetailPage', { postId: data.postId })}>
        <CardComponent
          userId={data.userId}
          mealType={data.mealType}
          imageSource={LOCAL + data.pictures[0].pictureDownloadUri}
          imageWidth={150}
          imageHeight={200}
          likes='0'
          date={data.insertTime}
          content={data.content}
          avatar={data.avatarDownloadUri}
        />
      </TouchableOpacity>
    )
  })

  const handelLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Log out",
          onPress: () => dispatch(signOut())
        }
      ]
    );
  }

  const addWater = async () => {
    let name = await AsyncStorage.getItem('authenticatedUser');
    let formData = new FormData();
    formData.append('username', name);
    axios.post(`${LOCAL}/update/waterPlus`, formData)
      .then(res => {
        console.log('res.data: ', res.data);
        if (res.data === 1) {
          console.log('successfully added water!');
          checkWater();
        }
      }).catch(e => console.log(e))
  }

  const subWater = async () => {
    let name = await AsyncStorage.getItem('authenticatedUser');
    let formData = new FormData();
    formData.append('username', name);
    axios.post(`${LOCAL}/update/waterMinus`, formData)
      .then(res => {
        console.log('res.data: ', res.data);
        if (res.data === 1) {
          console.log('successfully substracted water!');
          checkWater();
        }
      }).catch(e => console.log(e))
  }

  const checkWater = async () => {
    let name = await AsyncStorage.getItem('authenticatedUser');
    let config = { params: { username: name } }
    axios.get(`${LOCAL}/download/userWater`, config)
      .then(res => {
        console.log('water: ', res.data);
        setWater(res.data);

        axios.get(`${LOCAL}/download/userWeight`, config)
          .then(res => {
            console.log('weight: ', res.data);
            setRecommendedWater(Math.round(res.data * 30 / 200));
          })
          .catch(e => console.log(e))
      })
      .catch(e => console.log(e))
  }


  useEffect(() => {
    console.log('reload')

    const getCards = async () => {
      try {
        setTimeout(getRecentPosts, 500);
      } catch (e) {
        console.log(e)
      }
    }
    getCards();
    checkWater();

  }, [])


  return (
    <Container style={style.container}>
      <Content>
        <View style={{ height: 300, backgroundColor: '#F2CE16', borderBottomLeftRadius: 100 }} />
        <View style={{ height: 200, width: 200, borderRadius: 100, bottom: 400, right: 50, backgroundColor: '#ECA90C' }} />

        <View style={{ position: 'relative', bottom: 500 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20 }}>
            <View>
              <Text style={{ color: '#6E6E6E', fontFamily: 'Comfortaa-Light', fontSize: 15 }}>{user.goal}</Text>
              <Text style={{ color: '#424242', fontFamily: 'Comfortaa-Bold', fontSize: 20 }}>Hello! {user.userId}</Text>
            </View>
            <TouchableOpacity onPress={handelLogout}>
              <Thumbnail source={{ uri: user.avatarDownloadUri }} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ fontFamily: 'Comfortaa-Regular', fontSize: 30, paddingLeft: 10, paddingBottom: 10, color: '#424242' }}>What's New Meal ?</Text>
          </View>



          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true} >
            {
              loading ?
                <>
                  <SkeletonComponent cardWidth={280} cardHeight={375} imageWidth={245} imageHeight={200} />
                  <SkeletonComponent cardWidth={280} cardHeight={375} imageWidth={245} imageHeight={200} />
                  <SkeletonComponent cardWidth={280} cardHeight={375} imageWidth={245} imageHeight={200} />
                </> :
                renderCards
            }
          </ScrollView>
          <View>
            <Text style={{ fontFamily: 'Comfortaa-Regular', fontSize: 30, paddingLeft: 10, color: '#424242' }}>My Water</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20 }}>
            <TouchableOpacity onPress={addWater} style={{ paddingLeft: 10 }}>
              <View style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: '#47b8e0', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='water' />
                <Text style={{ fontSize: 20 }}>+ 1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={subWater} style={{ paddingLeft: 10 }}>
              <View style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: '#47b8e0', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='water' />
                <Text style={{ fontSize: 20 }}>- 1</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontFamily: 'Comfortaa-Regular', fontSize: 15, paddingLeft: 10 }}>You drank {water} glasses of water today.</Text>
            <Text style={{ fontFamily: 'Comfortaa-Regular', fontSize: 15, paddingLeft: 10 }}>You need to drink {recommendedWater} glasses of water today.</Text>
          </View>

          <View>
            <Text style={{ fontFamily: 'Comfortaa-Regular', fontSize: 30, paddingLeft: 10, paddingTop: 20, color: '#424242' }}>My Nutrients</Text>
          </View>
          <View>
            <PieChartComponent />
          </View>
        </View>
      </Content>
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
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 5,
  }
})

export default Main;