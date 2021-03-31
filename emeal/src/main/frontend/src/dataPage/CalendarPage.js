import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import DateTime from 'react-native-customize-selected-date'
import _ from 'lodash'
import image from '../Images/coffee-cup.png'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


function CalendarPage() {

    const user = useSelector(state => state.user);
    const [time, setTime] = useState('');

    const getMenus = async (date) => {
        alert(date);
        /*
        let name = await AsyncStorage.getItem('authenticatedUser');
        let config = { params: { username: name, date: date } };
        axios.get(`${LOCAL}/download/userOneday`, config)
            .then(res => {
                console.log('res.data: ', res.data);
                alert(res.data);
            })
            .catch(e => console.log(e))
        */
    }

    const onChangeDate = (date) => {
        getMenus(date);
    }

    //Account에서 물 값 가져와 물 value가 버튼 1번당 100씩 추가, 5번 누를 때마다 5개 물컵이 1개 큰컵으로 바뀜.
    const renderChildDay = (day) => {
        if (_.includes(['2018-11-15', '2018-12-10', '2021-03-03'], day)) {
            return <Image source={{ uri: '../Images/coffee-cup.png' }} style={styles.icLockBig}></Image>
        }
        if (_.includes(['2018-11-16', '2018-12-12', '2018-12-21', '2021-03-21'], day)) {
            return <Image source={{ uri: '../Images/coffee-cup.png' }} style={styles.icLocksmall}></Image>
        }
    }

    return (
        <View style={styles.container}>
            <DateTime
                date={time}
                changeDate={(date) => onChangeDate(date)}
                format='YYYY-MM-DD'
                renderChildDay={(day) => renderChildDay(day)}
            />
        </View>
    );
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
