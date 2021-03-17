import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button, Thumbnail } from 'native-base';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

let images=[
    require('../../assets/1.jpg'),
    require('../../assets/2.jpg'),
    require('../../assets/3.jpg'),
    require('../../assets/4.jpg'),
    require('../../assets/5.jpg'),
    require('../../assets/6.jpg'),
    require('../../assets/7.jpg'),
    require('../../assets/8.jpg'),
    require('../../assets/9.jpg'),
    require('../../assets/10.jpg')
]

let { width, height } = Dimensions.get('window');


function ProfilePage({navigation}) {

    const user = useSelector(state => state.user);
    const [avatar, setAvatar] = useState(user.avatarDownloadUri);
    const [activeIndex, setActiveIndex] = useState(0);
    const [username, setUsername] = useState(user.userId);
    const [goal, setGoal] = useState(user.goal);
    console.log('user: ', user);

    

    const renderSectionOne = () => {
        if (images.length > 6) {

        }
        return images.map((image, index) => {
            return (
                <View key={index} style={{width:(width-30)/2, height:(width-30)/2, margin: 5}}>
                    <Image style={{flex:1, width:undefined, height:undefined}} source = {image} />
                </View>
            )
        })
    }
  

    const sections = renderSectionOne();


    useEffect(() => {
        setAvatar(user.avatarDownloadUri);
        setUsername(user.userId);
        setGoal(user.goal);
    }, [user])

    return (
        <Container style={{ paddingTop: 20 }}>
            <Content>
            <View style={{ alignItems: 'center' }}>
                <Thumbnail source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                <Icon name='ios-pencil' style={{ position: 'relative', right: -50, top: -30 }} onPress={() => navigation.navigate('UpdateProfile')} />
                <Text style={{ fontFamily: 'Comfortaa-Regular', fontSize: 30 }}>{username}</Text>
                <Text style={{ fontFamily: 'Comfortaa-Light', fontSize: 15, marginTop: 5 }}>{goal}</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 20, marginBottom: 20, width: 330 }} />
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ fontFamily: 'Comfortaa-Light', fontSize: 13, marginRight: 30 }}>POSTS</Text>     
                    <Text style={{ fontFamily: 'Comfortaa-Light', fontSize: 13, marginLeft: 20 }}>BOOKMARKED</Text>
                </View>
            </View>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5, marginRight: 5 }}>
                {sections}
            </View>
            </Content>
        </Container>
    )
}


export default ProfilePage;
