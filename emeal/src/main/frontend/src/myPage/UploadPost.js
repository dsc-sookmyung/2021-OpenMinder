import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';
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
    const [mealTime, setMealTime] = useState('BREAKFAST');
    const [categoryName, setCategoryName] = useState('One Person Household');
    const [content, setContent] = useState('');
    const [categoryDropdownState, setCategoryDropdownState] = useState(false);
    const [mealTimeDropdownState, setMealTimeDropdownState] = useState(false);

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
            mealType: mealTime,
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
                Alert.alert(
                    "Successfully Uploaded",
                    "Your post is successfully uploaded.",
                    [
                      { text: "OK", onPress: () => navigation.goBack() }
                    ]
                )
            }).catch(e => console.log(e))
        }).catch(e => console.log(e))
    }

    const handleDropdown = type => {
        switch (type) {
            case 0:
                setCategoryDropdownState(!categoryDropdownState);
                break;
            case 1:
                setMealTimeDropdownState(!mealTimeDropdownState);
                break;
            default:
                break;
        }
    }

    const hadnleCategory = category => {
        setPostCategory(category);
        switch (category) {
            case 'OPH':
                setCategoryName('One Person Household');
                break;
            case 'WORKOUT':
                setCategoryName('Work Out / Health');
                break;
            case 'HEALTHCARE':
                setCategoryName('Recovery / Care');
                break;
                case 'VEGAN':
                setCategoryName('Vegan');
                break;
            default:
            break;
        }
    }

    const handleMealTime = time => {
        setMealTime(time);
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
                <Text style={{ paddingRight: 20, fontFamily: 'Comfortaa-Bold', fontSize: 13 }}>{categoryName}</Text>
                {
                    categoryDropdownState ?
                        <Icon name='ios-caret-up' style={{ color: 'gray' }} onPress={() => handleDropdown(0)} /> :
                        <Icon name='ios-caret-down' style={{ color: 'gray' }} onPress={() => handleDropdown(0)} />
                }
                
                </View>
                {
                    categoryDropdownState &&
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
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>Work Out / Health</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{  paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#D6D6D6' }}
                            onPress={() => hadnleCategory('HEALTHCARE')}
                        >
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>Recovery / Care</Text>
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

            <View style={{paddingLeft: 5, paddingRight: 5, paddingTop: 13, display: 'flex', marginLeft: 15, marginRight: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'  }}>
                <Text style={{ paddingRight: 20, fontFamily: 'Comfortaa-Bold', fontSize: 13 }}>Meal Time</Text>
                <Text style={{ paddingRight: 20, fontFamily: 'Comfortaa-Bold', fontSize: 13 }}>{mealTime}</Text>
                {
                    mealTimeDropdownState ?
                        <Icon name='ios-caret-up' style={{ color: 'gray' }} onPress={() => handleDropdown(1)} /> :
                        <Icon name='ios-caret-down' style={{ color: 'gray' }} onPress={() => handleDropdown(1)} />
                }
                
                </View>
                {
                    mealTimeDropdownState &&
                    <View style={{ borderWidth: 1, borderColor: '#D6D6D6' }}>
                        <TouchableOpacity 
                            style={{ paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#D6D6D6' }}
                            onPress={() => handleMealTime('BREAKFAST')}
                        >
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>BREAKFAST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{  paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#D6D6D6' }}
                            onPress={() => handleMealTime('LUNCH')}
                        >
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>LUNCH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{  paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}
                            onPress={() => handleMealTime('DINNER')}
                        >
                            <Text style={{ fontSize: 10, fontFamily: 'Comfortaa-Medium' }}>DINNER</Text>
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
            <View style={{ paddingTop: 30, paddingBottom: 30, alignItems: 'center', justifyContent: 'center', }}>
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
const styles = StyleSheet.create({
    uploadButton : {
        padding: 10, backgroundColor: 'white', borderRadius: 5
    },
    imgButton : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2BB16',
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
    },
    imageButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 30
    }
})


export default UploadPost
