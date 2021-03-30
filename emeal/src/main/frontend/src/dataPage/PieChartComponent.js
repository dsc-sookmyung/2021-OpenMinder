import React, { useState, useEffect } from 'react';
import { View, StyleSheet, processColor } from 'react-native';
import { PieChart } from 'react-native-charts-wrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';

function PieChartComponent() {

    const [nutrient, setNutrient] = useState({carbohydrate: 0, protein: 0, fat: 0, others: 1, calorie: 0 })

    let data = {
        dataSets: [
            {
              values: [
                { value: nutrient.carbohydrate, label: 'Carbohydrate' },
                { value: nutrient.protein, label: 'Protein' },
                { value: nutrient.fat, label: 'Fat' },
                { value: nutrient.others, label: 'Others' },
              ],
              label: '',
              config: {
                colors: [
                  processColor('#F2CE16'),
                  processColor('#ECA90C'),
                  processColor('#E6987C'),
                  processColor('#E0B5A6'),
                ],
                valueTextSize: 20,
                valueTextColor: processColor('#424242'),
                sliceSpace: 5,
                selectionShift: 13,
  
                valueFormatter: "#.#",
                valueLineColor: processColor('#424242'),
                valueLinePart1Length: 0.5,
              },
            },
        ]
    }

    let legend = {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',

        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true
    }

    let highlights = [{ x: 2 }]

    let description = {
        text: 'Your nutritional status for a day',
        textSize: 15,
        textColor: processColor('darkgray'),
    }

    useEffect(() => {
        console.log({...data})
        const getNutrient = async () => {
            let username = await AsyncStorage.getItem('authenticatedUser');
            let config = { params: { username: username }}
            axios.get(`${LOCAL}/PieChartPage`, config)
            .then(res => {
                console.log(res.data);
                console.log({...data})
                let carbohydrate = 0;
                let protein = 0;
                let fat = 0;
                let others = 0;
                let calorie = 0;

                res.data.map((data) => {
                    carbohydrate += data.carbohydrate;
                    protein += data.protein;
                    fat += data.fat;
                    others += (data.sugars + (data.sodium * 0.001) + (data.cholesterol * 0.001) + data.fattyAcid + data.transFat);
                    calorie += data.calorie;
                })
                
                setNutrient({ carbohydrate: carbohydrate, protein: protein, fat: fat, others: others, calorie: calorie })

            })
            .catch(e => console.log(e))
        }
        setTimeout(getNutrient, 300);
    }, [])

    return (
        <View style={{ flex: 1 }}>
  
          <View style={styles.container}>
            <PieChart
              style={styles.chart}
              logEnabled
              chartBackgroundColor={processColor('#fff')}
              chartDescription={description}
              data={data}
              legend={legend}
              highlights={highlights}
              entryLabelColor={processColor('#424242')}
              // entryLabelTextSize={10}
              drawEntryLabels={false}
              rotationEnabled
              rotationAngle={45}
              usePercentValues
              styledCenterText={{
                text: nutrient.calorie + 'kcal',
                color: processColor('#424242'),
                size: 17
              }}
              centerTextRadiusPercent={100}
              holeRadius={40}
              holeColor={processColor('#fff')}
              transparentCircleRadius={45}
              transparentCircleColor={processColor('#f0f0f088')}
              maxAngle={350}
              
            />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    chart: {
      width: '100%',
      height: 300
    },
})

export default PieChartComponent
