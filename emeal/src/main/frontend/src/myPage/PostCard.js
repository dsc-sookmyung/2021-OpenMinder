import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon,  } from 'native-base';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL } from '../../ipConfig';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from '../_modules/user';

const PostCard = () => {
    

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log("user.avatarDownloadUri: ", user.avatarDownloadUri)

    const [imageState, setImageState] = useState('');
    const [avatar, setAvatar] = useState(user.avatarDownloadUri);
    const [imageName, setImageName] = useState('')

    let formData = new FormData();
    formData.append('file', {
        uri: imageState.path,
        type: imageState.mime,
        name: imageName,
        data: imageState.data
    });

    const selectImage = () => {
        
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            cropping: true
        }).then(image => {
            console.log("image: ", image)
            console.log("image path: ", image.path)
            
            setImageName(image.path.substring(image.path.lastIndexOf('/') + 1))

            setImageState(image)

        })
    }

    const changeAvatar = async () => {
        let username = await AsyncStorage.getItem('authenticatedUser');
        formData.append('username', username);
        
        axios.post(`${LOCAL}/uploadFile`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
            }
        }).then(async (res) => {
            console.log(res.data)
            setAvatar(LOCAL + res.data)
            dispatch(restoreToken(user.userToken, LOCAL + res.data));
            await AsyncStorage.setItem('fileDownloadUri', LOCAL + res.data);
        })
        .catch(e => console.log(e))
       
    }

    return (
        <>
        
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={{ uri: avatar }} />
                    <Body>
                        <Text>Jane</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                <Image 
                    source={{ uri: 'https://img.huffingtonpost.com/asset/5e8d1d1e2500007900eaf1ee.jpeg?cache=sajSoCwOYV&ops=scalefit_630_noupscale' }}
                    style={{ height: 200, width: 100, flex: 1, marginLeft: 15, marginRight: 15 }} 
                />
            </CardItem>
            <CardItem style={{ height: 45 }}>
                <Left>
                    <Button transparent>
                        <Icon name='ios-heart-outline' style={{ color: 'black', fontSize: 30 }}/>
                    </Button>
                    <Button transparent>
                        <Icon name='ios-chatbubble-outline' style={{ color: 'black', fontSize: 25}} />
                    </Button>
                </Left>
                <Right>
                    <Button transparent>
                        <Icon name='ios-bookmark-outline' style={{ color: 'black', fontSize: 30 }} />
                    </Button>
                </Right>
            </CardItem>
            <CardItem>
                <Text>
                    <Text style={{ fontWeight: '900', marginRight: 30 }}>Jane</Text>
                    이번에는 리액트 네이티브(React Native)로 인스타그램 UI을 구현하는 포스팅입니다. 다른 앱을 따라 만들어 보는 것은 굉장히 재미있습니다. 구글에서 인스타그램 클론 코딩 강의를 찾아보니, 다른 개발자들이 올린 동영상 강의를 몇 개 찾을 수 있었습니다.
                </Text>
            </CardItem>
            {imageState ? (
                <>
                    {/* <Image 
                        source={{uri: image}}
                        style={{ width: '100%', height: 300 }}
                    /> */}
                    <Button
                        onPress={changeAvatar}
                        style={{ alignItems: 'center', padding: 10, margin: 30 }}>
                            <Text>Change My Avatar</Text>
                    </Button>
                </>
            ) : (
                <Button
                    onPress={selectImage}
                    style={{ alignItems: 'center', padding: 10, margin: 30 }}>
                        <Text>Add an Image</Text>
                </Button>
            )}
        </Card>
        </>
    );
}


export default PostCard;