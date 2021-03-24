import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Header, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';

import CardComponent from '../component/CardComponent';
 
function Community({navigation}) {

    const [postData, setPostData] = useState([])
    const [category, setCategory] = useState(0);

    const getPosts = (categoryState, categoryNum) => {
        let config = { params: { category: categoryState }}
        axios.get(`${LOCAL}/download/postCategory`, config)
            .then(res => {
                console.log(res.data)
                setPostData(res.data)
                setCategory(categoryNum)
            })
            .catch(e => console.log(e))
    }

    const renderCards = postData.map((data, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailPage', {postId: data.postId})}>
            <CardComponent 
                
                userId={data.userId}
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
        getPosts("OPH", 0);
    }, [])

    return (
        <Container style = {style.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 , paddingTop: 20, paddingBottom: 20 }}>
                <View  style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: `${ category === 0 ? '#F2CE16' : '#E6E6E6' }` , alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='happy' onPress={() => getPosts("OPH", 0)} />    
                    <Text style={{ fontSize: 10 }}>One Person</Text>
                    <Text style={{ fontSize: 10 }}>Household</Text>
                </View>
                <View  style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: `${ category === 1 ? '#F2CE16' : '#E6E6E6' }`, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='ios-barbell-outline'onPress={() => getPosts("WORKOUT", 1)} />
                    <Text style={{ fontSize: 10 }}>Work Out</Text>
                    <Text style={{ fontSize: 10 }}>Health</Text>
                </View>
                <View  style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: `${ category === 2 ? '#F2CE16' : '#E6E6E6' }`, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='md-bandage-sharp' onPress={() => getPosts("HEALTHCARE", 2)} />
                    <Text style={{ fontSize: 10 }}>Recovery</Text>
                    <Text style={{ fontSize: 10 }}>Care</Text>
                </View>
                <View  style={{ width: 70, height: 70, borderRadius: 25, backgroundColor: `${ category === 3 ? '#F2CE16' : '#E6E6E6' }`, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='nutrition' onPress={() => getPosts("VEGAN", 3)} />
                    
                    <Text style={{ fontSize: 10, marginTop: 10 }}>Vegan</Text>
                </View>
                {/* <Button title="Single-person Households" onPress={() => Alert.alert('1인가구(Single-person Households)')} />
                <Button title="Health/Diet" onPress={() => Alert.alert('헬스/다이어트(Health/Diet)')} />
                <Button title="Care/Health Recovery" onPress={() => Alert.alert('케어/건강회복(Care/Health Recovery)')} />
                <Button title="Vegan" onPress={() => Alert.alert('비건(Vegan)')} /> */}
            </View>
            <ScrollView contentContainerStyle={{ alignContent: 'center'}}>
                <View style={{ flex: 1 }}>
                {renderCards}
                </View>
            </ScrollView>
        </Container>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default Community;
