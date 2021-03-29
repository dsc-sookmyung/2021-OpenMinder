import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Button} from 'native-base';
import LineGraphPage from './LineGraphPage';
import PieChart from './PieChartPage';
import CalendarPage from "./CalendarPage";


function ResultPage({navigation}) {

    return (
        <Container style={{ paddingTop: 20 }}>
            <Content>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ paddingTop: 20 }}>
                        <Button
                            style={{ backgroundColor: 'white', paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderColor: 'black' }}
                            onPress={() => navigation.navigate('CalendarPage')}
                        >
                            <Text style={{ fontFamily: 'Comfortaa-Light' }}>Go To calendar Post</Text>
                        </Button>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Button
                            style={{ backgroundColor: 'white', paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderColor: 'black' }}
                            onPress={() => navigation.navigate('PieChartPage')}
                        >
                            <Text style={{ fontFamily: 'Comfortaa-Light' }}>Go To chart Post</Text>
                        </Button>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Button
                            style={{ backgroundColor: 'white', paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderColor: 'black' }}
                            onPress={() => navigation.navigate('LineGraphPage')}
                        >
                            <Text style={{ fontFamily: 'Comfortaa-Light' }}>Go To graph Post</Text>
                        </Button>
                    </View>
                </View>


            </Content>

        </Container>
    )
}


export default ResultPage;
