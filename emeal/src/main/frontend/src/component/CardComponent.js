import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon, View } from 'native-base';


function CardComponent(props) {

    const [heartState, setHeartState] = useState(false);

    const handleHeart = () => {
        setHeartState(heartState => !heartState);
    }

    const formatDate = (date) => {
        let d = new Date(date)
        let month = d.getMonth() + 1
        let day = d.getDate()
        let year = d.getFullYear();
        return [year, month, day].join('.');
    }

    const handleMealType = type => {
        switch (type) {
            case 'BREAKFAST':
                return 'md-partly-sunny-outline';
            case 'LUNCH':
                return 'ios-sunny-outline';
            case 'DINNER':
                return 'ios-moon-outline';
            default:
                break;
        }
    }

    return (
        <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
                <CardItem bordered style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Left>
                        <Thumbnail source={{ uri: props.avatar }} />
                        <Body>
                            <Text style={{ fontFamily: 'Comfortaa-Bold' }}>{props.userId}</Text>
                            <Text style={{ fontFamily: 'Comfortaa-Light', fontSize: 12 }} note>{formatDate(props.date)}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Icon name={handleMealType(props.mealType)} style={{ color: 'black' }} />
                        <Text style={{ fontFamily: 'Comfortaa-Light', fontSize: 10 }}>{props.mealType}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    {/* <Image source={require('../assets/react_native.jpg')} style={{height:200, width:null, flex:1}}/> */}
                    {/* <Image source={{ uri: props.imageSource }} style={{height:300, width:null, flex:1}}/> */}
                    <Image source={{ uri: props.imageSource }} style={{ height: props.imageHeight, width: props.imageWidth, flex:1}}/>
                </CardItem>
                <CardItem style={{height:40}}>
                    <Left>
                        <Button transparent onPress={handleHeart}>
                            {
                                heartState ?
                                    <Icon name='ios-heart' style={{color:'black'}}/> :
                                    <Icon name='ios-heart-outline' style={{color:'black'}}/>
                            }
                        </Button>
                        <Button transparent>
                            <Icon name='ios-chatbubbles-outline' style={{color:'black'}}/>
                        </Button>
                        <Button transparent>
                            <Icon name='ios-send-outline' style={{color:'black'}}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={{ fontFamily: 'Comfortaa-Bold' }}>{props.likes} Likes</Text>    
                    </Right>
                </CardItem>
                
                <CardItem style={{ flex: 1, paddingBottom: 20, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{ fontFamily: 'Comfortaa-Bold', marginRight: 10 }}>{props.userId}</Text>
                    <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.content}</Text>
                </CardItem>
            </Card>
    )
}


export default CardComponent;