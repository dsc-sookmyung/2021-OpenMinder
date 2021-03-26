import React , {Component} from 'react';
import {
    StyleSheet,
    Text,
    processColor,
    ScrollView,
    Image,
} from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';
import _ from 'lodash'
import { LOCAL } from '../../ipConfig';
import axios from 'axios';

class pieChartPage extends React.Component{

    constructor() {
        super();

        let carbohydrate = 0;
        let protein = 0;
        let fat = 0;

        const { postId } = route.params;
        const [postData, setPostData] = useState(null);
        const [menuData, setMenuData] = useState([]);

        const getOnePost = () => {
            let config = { params: { postId: postId }}
            axios.get(`${LOCAL}/download/onePost`, config)
                .then(res => {
                    setPostData(res.data)
                })
                .catch(e => console.log(e))
            axios.get(`${LOCAL}/download/menuAndNutrient`, config) //날짜 가져와서 아점저 가져오게 수정해야 함.
                .then(res => {
                    console.log(res.data)
                    setMenuData(res.data);
                })
                .catch(e => console.log(e))
        }

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
            time: '',

            /*
            menuData.map((data, index) => {
                carbohydrate += data.nutrient.carbohydrate;
                protein += data.nutrient.protein;
                fat += data.nutrient.fat;

                //1)하루 아점저 값 가져와서 2)값들 전체 더하기..함수로 만들어서....
            })*/


            data: {
                dataSets: [{
                    values: [{value: carbohydrate, label: '탄수화물'},
                        {value: protein, label: '단백질'},
                        {value: fat, label: '지방'}],
                    config: {
                        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C')],
                        valueTextSize: 15,
                        valueTextColor: processColor('green'),
                        sliceSpace: 5,
                        selectionShift: 8,
                        // xValuePosition: "OUTSIDE_SLICE",
                        // yValuePosition: "OUTSIDE_SLICE",
                        valueFormatter: "#.#",
                        valueLineColor: processColor('green'),
                        valueLinePart1Length: 0.5
                    }
                }],
            },

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

    /*
    onChangeDate(date) {
        alert(date)
    }

    renderChildDay(day) {
        if (_.includes(['2018-11-15', '2018-12-10', '2021-03-03'], day)) {
            return <Image source={require('../Images/coffee-cup.png')} style={styles.icLockBig} />
        }
        if (_.includes(['2018-11-16', '2018-12-12', '2018-12-21', '2021-03-21'], day)) {
            return <Image source={require('../Images/coffee-cup.png')} style={styles.icLockRed} />
        }
    }
    물컵 생기는 함수 - 물 버튼으로 몇 번 눌렀는지에 따라 컵 사이즈 다르게 출력하기..해야함...
     */


    render() {
        return (
            <ScrollView
                style={{flex: 1}}
                ref={(c) => {this.scroll = c}}
                nestedScrollEnabled={true} >


                <Text style={styles.titleText}>나의 통계 페이지</Text>
                <Text style={styles.subText}>탄단지 비율 분석</Text>
                <Text style={styles.subText}>    #탄수화물  #지방  #단백질</Text>
                <PieChart
                    style={styles.chart}
                    logEnabled={true}
                    chartDescription={this.state.description}
                    data={this.state.data}
                    legend={this.state.legend}
                    highlights={this.state.highlights}

                    extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

                    entryLabelColor={processColor('green')}
                    entryLabelTextSize={15}
                    entryLabelFontFamily={'HelveticaNeue-Medium'}
                    drawEntryLabels={true}

                    rotationEnabled={true}
                    rotationAngle={45}
                    usePercentValues={true}
                    styledCenterText={{text:'72kcal', color: processColor('black'), fontFamily: 'HelveticaNeue-Medium', size: 20}}
                    centerTextRadiusPercent={100}
                    holeRadius={40}
                    holeColor={processColor('#f0f0f0')}
                    transparentCircleRadius={45}
                    transparentCircleColor={processColor('#f0f0f088')}
                    maxAngle={350}
                    onSelect={this.handleSelect.bind(this)}
                    onChange={(event) => console.log(event.nativeEvent)}
                />


            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    chart: {
        flex: 1
    },
    titleText:{
        fontFamily: 'Comfortaa-Bold',
        fontSize: 40,
        color: '#000000',
        width: 300,
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 30,
        marginBottom: 20,
        paddingTop: 20
    },
    subText:{
        fontFamily: 'Comfortaa-Bold',
        fontSize: 15,
        color: '#000000',
        width: 300,
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 30,
        marginBottom: 10
    },
    icLockRed: {
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


export default pieChartPage;