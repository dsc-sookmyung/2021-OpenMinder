import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import { View, Text, StyleSheet, Button, Alert, Header, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';


function lineGraphPage() {

    //x day, y 영양소 합계
    let data1 = [ //carbohydrate
        { x: -2, y: 1 },
        { x: -1, y: 0 },
        { x: 8, y: 13 },
        { x: 9, y: 11.5 },
        { x: 10, y: 12 }
    ];

    let data2 = [ //protein
        { x: -2, y: 15 },
        { x: -1, y: 10 },
        { x: 0, y: 12 },
        { x: 1, y: 7 },
        { x: 8, y: 12 },
        { x: 9, y: 13.5 },
        { x: 10, y: 18 }
    ];

    let data3 = [ //fat
        { x: -2, y: 15 },
        { x: -1, y: 10 },
        { x: 0, y: 12 },
        { x: 1, y: 7 },
        { x: 8, y: 12 },
        { x: 9, y: 13.5 },
        { x: 10, y: 18 }
    ];

    const user = useSelector(state => state.user);
    const [username, setUsername] = useState(user.userId);
    const [nutData, setNutData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getNutrients = () => {
        let config = { params: { username: username } };
        axios.get(`${LOCAL}/download/userNutrients`, config)
            .then(res => {
                console.log(res.data)
                setNutData(res.data)
                setLoading(false);
            })
            .catch(e => console.log(e));
    }

    useEffect(() => {
        setUsername(user.userId);
        getNutrients();
    }, [user])

    return (
        <Chart
            style={{ height: 200, width: '100%', backgroundColor: '#eee', flex: 1 }}
            xDomain={{ min: -2, max: 10 }}
            yDomain={{ min: -2, max: 20 }}
            padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
        >
            <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
            <HorizontalAxis tickCount={3} />
            <Line data={data1} smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
            <Line data={data2} smoothing="cubic-spline" theme={{ stroke: { color: 'blue', width: 1 } }} />
            <Line data={data3} smoothing="cubic-spline" theme={{ stroke: { color: 'green', width: 1 } }} />
        </Chart>
    );
}


export default lineGraphPage;

