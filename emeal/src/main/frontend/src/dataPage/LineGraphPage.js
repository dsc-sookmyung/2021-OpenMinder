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
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 400 },
        { x: 8, y: 200 },
        { x: 9, y: 300 }
    ];

    let data2 = [ //protein
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 0 },
        { x: 8, y: 0 },
        { x: 9, y: 0 }
    ];

    let data3 = [ //fat
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 0 },
        { x: 8, y: 0 },
        { x: 9, y: 0 }
    ];

    const user = useSelector(state => state.user);
    const [username, setUsername] = useState(user.userId);
    //const [nutData, setNutData] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [carbohydrate, setCarbohydrate] = useState([]);
    //const [protein, setProtein] = useState([]);
    //const [fat, setFat] = useState([]);

    const getNutrients = () => {
        let config = { params: { username: username } };
        axios.get(`${LOCAL}/download/userNutrients`, config)
            .then(res => {
                console.log(res.data)
                //setNutData(res.data)
                console.log(res.data.length);
                for (var i = 0; i < res.data.length; i++) {
                    data1[data1.length - i - 1].y = res.data[i]['carbohydrate'];
                    data2[data2.length - i - 1].y = res.data[i]['protein'];
                    data3[data3.length - i - 1].y = res.data[i]['fat'];
                }
                console.log("data: ", data1, data2, data3);
                setLoading(false);
            })
            .catch(e => console.log(e));
    }

    useEffect(() => {
        setUsername(user.userId);
        const getNuts = async () => {
            try {
                setTimeout(getNutrients, 500);
            } catch (e) {
                console.log(e)
            }
        }
        getNuts();
    }, [user])

    return (
        <Chart
            style={{ height: 200, width: '100%', backgroundColor: '#eee', flex: 1 }}
            xDomain={{ min: -2, max: 10 }}
            yDomain={{ min: -2, max: 500 }}
            padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
        >
            <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
            <HorizontalAxis tickCount={3} />
            {
                loading ?
                    <>
                        <Line data={data1} smoothing="cubic-spline" theme={{ stroke: { color: 'red', width: 1 } }} />
                        <Line data={data2} smoothing="cubic-spline" theme={{ stroke: { color: 'blue', width: 1 } }} />
                        <Line data={data3} smoothing="cubic-spline" theme={{ stroke: { color: 'green', width: 1 } }} />
                    </> :
                    <>
                        <Line data={data1} smoothing="cubic-spline" theme={{ stroke: { color: 'red', width: 1 } }} />
                        <Line data={data2} smoothing="cubic-spline" theme={{ stroke: { color: 'blue', width: 1 } }} />
                        <Line data={data3} smoothing="cubic-spline" theme={{ stroke: { color: 'green', width: 1 } }} />
                    </>
            }
        </Chart>
    );
}


export default lineGraphPage;

