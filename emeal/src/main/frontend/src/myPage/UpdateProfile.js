import React, { useState, useEffect } from 'react';
import { Input, Item, Container, Header, Thumbnail, Left, Body, Right, Icon, Title, Content, List, ListItem } from 'native-base';
import { AppRegistry, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL } from '../../ipConfig';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from '../_modules/user';

function UpdateProfile({navigation}) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [pickedImage, setPickedImage] = useState('');
    const [avatar, setAvatar] = useState(user.avatarDownloadUri);
    const [imageName, setImageName] = useState('');
    // const [userId, setUserId] = useState(user.userId);
    // const [goal, setGoal] = useState(user.goal);
    const [newUserId, setNewUserId] = useState('');
    const [newGoal, setNewGoal] = useState('');

    let avatarFormData = new FormData();
    avatarFormData.append('file', {
        uri: pickedImage.path,
        type: pickedImage.mime,
        name: imageName,
        data: pickedImage.data
    });


    const selectImage = () => {
        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            console.log("image: ", image)
            setImageName(image.path.substring(image.path.lastIndexOf('/') + 1));
            setPickedImage(image);
            setAvatar(image.path);
        })
    }

    const changeAvatar = async () => {
        let username = await AsyncStorage.getItem('authenticatedUser');
        avatarFormData.append('username', username);

        console.log('userId: ', newUserId);
        console.log('goal: ', newGoal);

        axios.post(`${LOCAL}/updateProfile`, null, {
            params: {
                username: username,
                userId: newUserId,
                goal: newGoal
            }
        }).then(async (res) => {
            console.log('second res.data: ', res.data);
            if (res.data === 1) {
                console.log('userId: ', newUserId);
                console.log('goal: ', newGoal);
                await AsyncStorage.setItem('userId', newUserId);
                await AsyncStorage.setItem('goal', newGoal);
            }
        }).catch(e => console.log(e))

        axios.post(`${LOCAL}/uploadFile`, avatarFormData, {
            headers: {
                "Content-Type": `multipart/form-data`,
            }
        }).then(async (res) => {
            console.log('res.data: ', res.data);
            setAvatar(LOCAL + res.data);
            dispatch(restoreToken(user.userToken, LOCAL + res.data, newUserId, newGoal));
            await AsyncStorage.setItem('fileDownloadUri', LOCAL + res.data);
        }).catch(e => console.log(e))  

    }


    
    return (
        <Container>
            <Header style={{ backgroundColor: '#F2BB16' }} noShadow androidStatusBarColor='gray'>
                <Left>
                <Button
                    title="CANCEL"
                    color="#F2BB16"
                    onPress={() => navigation.goBack()}
                />
                </Left>
                <Right>
                <Button
                    title="EDIT"
                    color="#F2BB16"
                    onPress={changeAvatar}
                />
                </Right>
            </Header>
            <Content>
            <View style={{flex: 1, alignItems: 'center', paddingBottom: 30, paddingTop: 30}}>
                <Thumbnail source={{ uri: avatar }} style={{ width: 120, height: 120, borderRadius: 60 }} />
                <Text>{"\n"}</Text>
                <TouchableOpacity onPress={selectImage} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Comfortaa-Regular' }}>Change Profile Picture</Text>
                    <Icon name='ios-pencil' style={{ fontSize: 20, position: 'relative', top: 9, paddingLeft: 3 }} />
                </TouchableOpacity>
                <Text>{"\n"}</Text>

                <Item style={{ paddingLeft: 5, display: 'flex', marginLeft: 15, marginRight: 15 }}>
                    <Text>NAME</Text>
                    <TextInput style={{paddingLeft: 15, flex: 1 }} placeholder={user.userId} onChangeText={text => setNewUserId(text)} />
                </Item>
                <Text>{"\n"}</Text>

                <Item style={{paddingLeft: 5, display: 'flex', marginLeft: 15, marginRight: 15 }}>
                    <Text>GOAL</Text>
                    <TextInput style={{ paddingLeft: 15, flex: 1 }} placeholder={user.goal} onChangeText={text => setNewGoal(text)} />
                </Item>
            </View>
            </Content>
        </Container>
    )
}


export default UpdateProfile

