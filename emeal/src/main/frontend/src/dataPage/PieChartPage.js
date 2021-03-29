import React , {Component} from 'react';
import { StyleSheet, Text, processColor, View, Image } from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';
import _ from 'lodash'
import { LOCAL } from '../../ipConfig';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:8080/PieChartPage/`
})
class PieChartPage extends React.Component{

    constructor() {
        super();

        // 문제의 코드 - 아래쪽 label, value에 이 값을 설정하고 싶음
        let carbohydrate;
        let protein;
        let fat;
        let extra;
        let kcal;

        const getMyData = async () => {
            let config = { params: {userName: userName}}
            axios.get(`${LOCAL}/PieChartPage`, config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(e => console.log(e))
            carbohydrate = config.data.carbohydrate * 1;
            protein = config.data.protein * 1;
            fat = config.data.fat * 1;
            extra = (100 - carbohydrate - protein - fat) * 1;
            kcal = carbohydrate * 4 + protein * 4 + fat * 9;

            this.state.data.dataSets[0].values[0].value = carbohydrate;
            this.state.data.dataSets[0].values[1].value = protein;
            this.state.data.dataSets[0].values[2].value = fat;
            this.state.data.dataSets[0].values[3].value = extra;

        };

        this.state = {
            legend: {
                enabled: true,
                textSize: 15,
                form: 'CIRCLE',

                horizontalAlignment: "RIGHT",
                verticalAlignment: "CENTER",
                orientation: "VERTICAL",
                wordWrapEnabled: true
            },
            data: {
                dataSets: [{
                    //일단 value는 차트 값이 나와야 함으로 임의의 값으로 설정함.
                    values: [{value: 30, label: '탄수화물'},
                        {value: 20, label: '단백질'},
                        {value: 20, label: '지방'},
                        {value: 30, label: '기타'}],
                    label: '<영양소 성분>',
                    config: {
                        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF')],
                        valueTextSize: 15,
                        valueTextColor: processColor('green'),
                        sliceSpace: 5,
                        selectionShift: 8,
                        // xValuePosition: "OUTSIDE_SLICE",
                        // yValuePosition: "OUTSIDE_SLICE",
                        valueFormatter: "#.#",
                        valueLineColor: processColor('green'),
                        valueLinePart1Length: 0.5
                    },
                    calories : kcal
                }],
            },
            highlights: [{x:2}],

        };


    }



    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }

        console.log(event.nativeEvent)
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <View style={styles.container}>

                    <PieChart
                        style={styles.chart}
                        logEnabled={true}
                        data={this.state.data}
                        legend={this.state.legend}
                        highlights={this.state.highlights}

                        extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

                        entryLabelColor={processColor('green')}
                        entryLabelTextSize={20}
                        entryLabelFontFamily={'HelveticaNeue-Medium'}
                        drawEntryLabels={true}

                        rotationEnabled={true}
                        rotationAngle={45}
                        usePercentValues={true}
                        //여기 00에 this.states.calories 들어가야 함.
                        styledCenterText={{text:'00 kcal!', color: processColor('pink'), fontFamily: 'HelveticaNeue-Medium', size: 20}}
                        centerTextRadiusPercent={100}
                        holeRadius={40}
                        holeColor={processColor('#f0f0f0')}
                        transparentCircleRadius={45}
                        transparentCircleColor={processColor('#f0f0f088')}
                        maxAngle={350}
                        onSelect={this.handleSelect.bind(this)}
                        onChange={(event) => console.log(event.nativeEvent)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chart: {
        flex: 1
    }
});


export default PieChartPage;