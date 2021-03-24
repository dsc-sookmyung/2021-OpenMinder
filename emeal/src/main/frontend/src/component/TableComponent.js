import React from 'react'
import { Text } from 'react-native';
import { Card, CardItem } from 'native-base';

function TableComponent(props) {
    return (
        <Card style={{ width: 250, marginRight: 10, marginLeft: 10, marginTop: 20 }}>
            <CardItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, marginLeft: 10, marginRight: 10 }}>
                <Text style={{ fontFamily: 'Comfortaa-Bold' }}>{props.name}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Calorie:  </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.calorie}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Carbohydrate: </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.carbohydrate}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Protein:  </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.protein}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Fat:  </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.fat}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Sugars:   </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.sugars}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Sodium:   </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.sodium}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Cholesterol:  </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.cholesterol}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Fatty Acid:   </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.fattyAcid}</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>Trans Fat:   </Text>
                <Text style={{ fontFamily: 'Comfortaa-Regular' }}>{props.transFat}</Text>
            </CardItem>
        </Card>
    )
}

export default TableComponent
