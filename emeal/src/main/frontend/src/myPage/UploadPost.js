import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Picker, Form, Icon, Item } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { LOCAL } from '../../ipConfig';
import axios from 'axios';

import TableComponent from '../component/TableComponent';

function UploadPost() {

    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [content, setContent] = useState('');
    const [dropdownState, setDropdownState] = useState(false);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    let formData = new FormData();
    formData.append('picture', {
        uri: image.path,
        type: image.mime,
        name: imageName,
        data: image.data
    })

    const selectImage = () => {
        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            setImageName(image.path.substring(image.path.lastIndexOf('/') + 1));
            setImage(image);
        })
    }

    const uploadPost = async () => {
        let username = await AsyncStorage.getItem('authenticatedUser');
        let userId = await AsyncStorage.getItem('userId');
        let avatar = await AsyncStorage.getItem('fileDownloadUri');

        axios.post(`${LOCAL}/upload/foodInfo`, {
            content: content,
            userId: userId,
            postType: postCategory,
            mealType: 'LUNCH',
            username: username,
            avatarDownloadUri: avatar
        }).then(res => {
            console.log('postId: ', res.data)
            formData.append('postId', res.data)

            axios.post(`${LOCAL}/upload/post`, formData, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                }
            }).then(res => {
                console.log('uploadPost: ', res)
            }).catch(e => console.log(e))
        }).catch(e => console.log(e))
    }

    const handleDropdown = () => {
        setDropdownState(!dropdownState);
    }

    const hadnleCategory = category => {
        setPostCategory(category);
    }

    return (
        <ScrollView style={{ backgroundColor: 'white'}} >
            <View style={{ paddingTop: 30, alignItems: 'center', justifyContent: 'center', }}>
            {image ? (
                <View style={{ paddingTop: 30, paddingBottom: 30 }}>
                    <Image
                        source={{ uri: image.path }}
                        style={{ width: 250, height: 250 }}
                        resizeMode='cover'
                    />
                </View>
            ) : (
                <View style={{ paddingTop: 30, paddingBottom: 30 }}>
                    <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6E6E6', padding: 10, width: 250, height: 200 }}
                        onPress={selectImage}
                    >
                        <Icon name='camera' />
                        <Text style={{ fontFamily: 'Comfortaa-Medium'}}>Choose a picture</Text>
                    </TouchableOpacity>
                </View>
                
            )}
            </View>
            <View style={{paddingLeft: 5, paddingRight: 5, display: 'flex', marginLeft: 15, marginRight: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'  }}>
                <Text style={{ paddingRight: 20, fontFamily: 'Comfortaa-Bold', fontSize: 13 }}>Category</Text>
                {
                    dropdownState ?
                        <Icon name='ios-caret-up' style={{ color: 'gray' }} onPress={handleDropdown} /> :
                        <Icon name='ios-caret-down' style={{ color: 'gray' }} onPress={handleDropdown} />
                }
                
                </View>
                {
                    dropdownState &&
                    <View style={{ borderWidth: 1, borderColor: '#D6D6D6' }}>
                        <TouchableOpacity 
                            style={{ paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#D6D6D6' }}
                            onPress={() => hadnleCategory('OPH')}
                        >
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>One Person Household</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{  paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#D6D6D6' }}
                            onPress={() => hadnleCategory('WORKOUT')}
                        >
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>Work Out/Health</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{  paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#D6D6D6' }}
                            onPress={() => hadnleCategory('HEALTHCARE')}
                        >
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>Recovery/Care</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{  paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}
                            onPress={() => hadnleCategory('VEGAN')}
                        >
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>Vegan</Text>
                        </TouchableOpacity>
                    </View>
                }
               
            </View>
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#D6D6D6', marginLeft: 10, marginRight: 10, paddingBottom: 20 }}/>
            <View style={{paddingLeft: 5, display: 'flex', marginLeft: 15, marginRight: 15, flexDirection: 'row' }}>
                <Text style={{ paddingRight: 20, paddingTop: 13, fontFamily: 'Comfortaa-Bold', fontSize: 13 }}>Content</Text>
                <TextInput
                    multiline
                    style={{ flex: 1 }}
                    placeholder="Write Your Story"
                    onChangeText={text => setContent(text)}
                />
            </View>
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#D6D6D6', marginLeft: 10, marginRight: 10, paddingBottom: 20 }}/>
            <View style={{ paddingTop: 30, alignItems: 'center', justifyContent: 'center', }}>
                <TouchableOpacity 
                    style={{ width: 200, padding: 10, borderWidth: 2, flex: 1, alignItems: 'center' }}
                    onPress={uploadPost}
                >
                    <Text style={{ fontFamily: 'Comfortaa-Bold'}}>Upload My Post</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default UploadPost
