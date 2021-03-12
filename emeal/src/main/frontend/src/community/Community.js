import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, Header } from 'react-native';
import { Icon, Container, Content } from 'native-base';
 
import CardComponent from '../component/CardComponent';
 
class Community extends Component{
 
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            < Icon name='ios-home' style={{color:tintColor}} />
        )
    }
 
    render(){
        return (
            <Container style = {style.container}>
                <View>
                    <Button title="Single-person Households" onPress={() => Alert.alert('1인가구(Single-person Households)')} />
                    <Button title="Health/Diet" onPress={() => Alert.alert('헬스/다이어트(Health/Diet)')} />
                    <Button title="Care/Health Recovery" onPress={() => Alert.alert('케어/건강회복(Care/Health Recovery)')} />
                    <Button title="Vegan" onPress={() => Alert.alert('비건(Vegan)')} />
                </View>
                <Content>
                    <CardComponent imageSource='1' likes='2324'/>
                    <CardComponent imageSource='2' likes='46'/>
                    <CardComponent imageSource='3' likes='208'/>
                </Content>
            </Container>
        );
    }
}
export default Community;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
