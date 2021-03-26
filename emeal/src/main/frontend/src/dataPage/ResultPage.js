import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Button} from 'native-base';
import calendarPage from './CalendarPage';
import graphPage from './LineGraphPage';
import chartPage from './PieChartPage';

/*
function ResultPage({navigation}) {

    return (
        <Container style={{ paddingTop: 20 }}>
            <Content>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ paddingTop: 20 }}>
                        <Button
                            style={{ backgroundColor: 'white', paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderColor: 'black' }}
                            onPress={() => navigation.navigate('calendarPage')}
                        >
                            <Text style={{ fontFamily: 'Comfortaa-Light' }}>Go To calendar Post</Text>
                        </Button>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Button
                            style={{ backgroundColor: 'white', paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderColor: 'black' }}
                            onPress={() => navigation.navigate('chartPage')}
                        >
                            <Text style={{ fontFamily: 'Comfortaa-Light' }}>Go To chart Post</Text>
                        </Button>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Button
                            style={{ backgroundColor: 'white', paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderColor: 'black' }}
                            onPress={() => navigation.navigate('graphPage')}
                        >
                            <Text style={{ fontFamily: 'Comfortaa-Light' }}>Go To graph Post</Text>
                        </Button>
                    </View>
                </View>


            </Content>

        </Container>
    )
}
payload라고 저 navigate들을 찾을 수 없다고 뜸..
 */


export default ResultPage;
