import React from 'react';
import { View } from 'react-native';
import { Card, CardItem } from 'native-base';


function SkeletonComponent(props) {


    return (
        <Card style={{ marginBottom: 20, marginLeft: 10, marginRight: 10, width: props.cardWidth, height: props.cardHeight, marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
            <CardItem style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#D8D8D8', }} />
                <View>
                    <View style={{ width: 50, height: 8, borderRadius: 10, backgroundColor: '#D8D8D8', marginLeft: 10, marginBottom: 10 }} />
                    <View style={{ width: 80, height: 8, borderRadius: 10, backgroundColor: '#D8D8D8', marginLeft: 10, }} />
                </View>
            </CardItem>  
            <CardItem>
                <View style={{ width: props.imageWidth, height: props.imageHeight, backgroundColor: '#D8D8D8' }} />
            </CardItem>      
            <CardItem style={{ paddingBottom: 20, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                <View>
                    <View style={{ width: 50, height: 10, borderRadius: 10, backgroundColor: '#D8D8D8', marginBottom: 10 }} />
                    <View style={{ width: 100, height: 10, borderRadius: 10, backgroundColor: '#D8D8D8' }} />
                </View>
            </CardItem> 
        </Card>
    )
}


export default SkeletonComponent;