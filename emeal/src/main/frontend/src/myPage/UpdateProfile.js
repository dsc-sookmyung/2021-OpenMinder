import React, { useState, useEffect } from 'react';
import { Item, Container, Header, Thumbnail, Left, Right, Icon, Content } from 'native-base';
import { Text, TouchableOpacity, View, Button, TextInput, Alert } from 'react-native';
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
    const [userId, setUserId] = useState('');
    const [goal, setGoal] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [prevHeight, setPrevHeight] = useState('');
    const [prevWeight, setPrevWeight] = useState('');
    const [prevAge, setPrevAge] = useState('');

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

        console.log('userId: ', userId);
        console.log('goal: ', goal);

        axios.post(`${LOCAL}/updateProfile`, { username, userId, goal, height, weight, age })
            .then(async (res) => {
                console.log('second res.data: ', res.data);
                if (res.data === 1) {
                    console.log('userId: ', userId);
                    console.log('goal: ', goal);
                    await AsyncStorage.setItem('userId', userId);
                    await AsyncStorage.setItem('goal', goal);
                    await AsyncStorage.setItem('height', height);
                    await AsyncStorage.setItem('weight', weight);
                    await AsyncStorage.setItem('age', age);
                }
        }).catch(e => console.log(e))

        axios.post(`${LOCAL}/uploadFile`, avatarFormData, {
            headers: {
                "Content-Type": `multipart/form-data`,
            }
        }).then(async (res) => {
            console.log('res.data: ', res.data);
            setAvatar(LOCAL + res.data);
            dispatch(restoreToken(user.userToken, LOCAL + res.data, userId, goal));
            await AsyncStorage.setItem('fileDownloadUri', LOCAL + res.data);

            axios.post(`${LOCAL}/update/postAccountInfo`, {
                username: username,
                userId: userId,
                avatarDownloadUri: LOCAL + res.data
            }).then(() => Alert.alert(
                "Successfully Updated",
                "Your profile is successfully updated.",
                [
                  { text: "OK", onPress: () => navigation.goBack() }
                ]
              )
            ).catch(e => console.log(e))
        }).catch(e => console.log(e))  

    }

    useEffect(() => {
        const getPhysicalInfo = async () => {
            const height = await AsyncStorage.getItem('height');
            const weight = await AsyncStorage.getItem('weight');
            const age = await AsyncStorage.getItem('age');
         
            setPrevHeight(height);
            setPrevWeight(weight);
            setPrevAge(age);
        }
        getPhysicalInfo();
    }, [])
    
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
                    <TextInput style={{paddingLeft: 15, flex: 1 }} placeholder={user.userId} onChangeText={text => setUserId(text)} />
                </Item>
                <Item style={{paddingLeft: 5, display: 'flex', marginLeft: 15, marginRight: 15 }}>
                    <Text>GOAL</Text>
                    <TextInput style={{ paddingLeft: 15, flex: 1 }} placeholder={user.goal} onChangeText={text => setGoal(text)} />
                </Item>
                <Item style={{paddingLeft: 5, display: 'flex', marginLeft: 15, marginRight: 15 }}>
                    <Text>HEIGHT</Text>
                    <TextInput style={{ paddingLeft: 15, flex: 1 }} placeholder={prevHeight} onChangeText={text => setHeight(text)} />
                </Item>
                <Item style={{paddingLeft: 5, display: 'flex', marginLeft: 15, marginRight: 15 }}>
                    <Text>WEIGHT</Text>
                    <TextInput style={{ paddingLeft: 15, flex: 1 }} placeholder={prevWeight} onChangeText={text => setWeight(text)} />
                </Item>
                <Item style={{paddingLeft: 5, display: 'flex', marginLeft: 15, marginRight: 15 }}>
                    <Text>AGE</Text>
                    <TextInput style={{ paddingLeft: 15, flex: 1 }} placeholder={prevAge} onChangeText={text => setAge(text)} />
                </Item>
            </View>
            </Content>
        </Container>
    )
}


export default UpdateProfile

