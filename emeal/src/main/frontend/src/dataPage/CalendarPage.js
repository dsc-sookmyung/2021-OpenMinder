import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import DateTime from 'react-native-customize-selected-date'
import _ from 'lodash'
import image from '../Images/coffee-cup.png'

class CalendarPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: ''
        }
    }

    onChangeDate(date) {
        alert(date)
    }

    //Account에서 물 값 가져와 물 value가 버튼 1번당 100씩 추가, 5번 누를 때마다 5개 물컵이 1개 큰컵으로 바뀜.
    renderChildDay(day) {
        if (_.includes(['2018-11-15', '2018-12-10', '2021-03-03'], day)) {
            return <Image source={{ uri: image }} style={styles.icLockBig}></Image>
        }
        if (_.includes(['2018-11-16', '2018-12-12', '2018-12-21', '2021-03-21'], day)) {
            return <Image source={{ uri: image }} style={styles.icLocksmall}></Image>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <DateTime
                    date={this.state.time}
                    changeDate={(date) => this.onChangeDate(date)}
                    format='YYYY-MM-DD'
                    renderChildDay={(day) => this.renderChildDay(day)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icLocksmall: {
        width: 13 / 2,
        height: 9,
        position: 'absolute',
        top: 2,
        left: 1
    },
    icLockBig: {
        width: 20 / 2,
        height: 16,
        position: 'absolute',
        top: 2,
        left: 1
    }
});

export default CalendarPage;
