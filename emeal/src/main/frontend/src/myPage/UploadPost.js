import React, { useState } from 'react';
import { View, Image, TextInput, Text, StyleSheet } from 'react-native';
import { Button, Picker, Form, Icon, Item } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { LOCAL } from '../../ipConfig';
import axios from 'axios';

function UploadPost() {

    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [content, setContent] = useState('');

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
            postType: 'OPH',
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

    return (
        <View>
            {image ? (
                <Image
                    source={{ uri: image.path }}
                    style={{ width: 120, height: 120 }}
                />
            ) : (
                <Button
                    onPress={selectImage}
                    style={styles.imgButton}>
                        <Text>Add an Image</Text>
                </Button>
            )}
            <Item style={{paddingLeft: 5, display: 'flex', marginLeft: 15, marginRight: 15 }}>
            {/* <Form>
                <Item picker>
                    <Picker
                        mode='dropdown'
                        iosIcon={<Icon name='caret-down' />}
                        style={{ width: undefined }}
                        placeholder="Select Post Category"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor='#007aff'
                        selectedValue={postCategory}
                        onValueChange={setPostCategory}
                    >
                        <Picker.Item label="one-person household" value="one-person household" />
                        <Picker.Item label="weigth control" value="weight control" value="weight control" />
                        <Picker.Item label="health care" value="health care" />
                        <Picker.Item label="vegan" value="vegan" />  
                    </Picker>
                </Item>
            </Form> */}
            <Text>CONTENT</Text>
            <TextInput
                style={{ flex: 1 }}
                placeholder="Write Your Story"
                onChangeText={text => setContent(text)}
            />
            </Item>
           
            <Button
                style={styles.uploadButton}
                onPress={uploadPost}
            >
                <Text>Upload My Post</Text>
            </Button>
        </View>
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
