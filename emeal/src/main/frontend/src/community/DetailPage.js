import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import { LOCAL } from '../../ipConfig';
import axios from 'axios';

import CardComponent from '../component/CardComponent';
import TableComponent from '../component/TableComponent';

function DetailPage({route}) {

    const { postId } = route.params;
    const [postData, setPostData] = useState(null);
    const [menuData, setMenuData] = useState([]);
    
    let calorie = 0;
    let carbohydrate = 0;
    let cholesterol = 0;
    let fat = 0;
    let fattyAcid = 0;
    let protein = 0;
    let sodium = 0;
    let sugars = 0;
    let transFat = 0;


    const getOnePost = () => {
        let config = { params: { postId: postId }}
        axios.get(`${LOCAL}/download/onePost`, config)
            .then(res => {
                setPostData(res.data)
            })
            .catch(e => console.log(e))
        axios.get(`${LOCAL}/download/menuAndNutrient`, config)
            .then(res => {
                console.log(res.data)
                setMenuData(res.data);
            })
            .catch(e => console.log(e))
    }


    const menuRenderCards = menuData.map((data, index) => {

        calorie += data.nutrient.calorie;
        carbohydrate += data.nutrient.carbohydrate;
        cholesterol += data.nutrient.cholesterol;
        fat += data.nutrient.fat;
        fattyAcid += data.nutrient.fattyAcid;
        protein += data.nutrient.protein;
        sodium += data.nutrient.sodium;
        sugars += data.nutrient.sugars;
        transFat += data.nutrient.transFat;

        return (
            <TableComponent
                key={index}
                name={data.menuName}
                calorie={data.nutrient.calorie}
                carbohydrate={data.nutrient.carbohydrate}
                cholesterol={data.nutrient.cholesterol}
                fat={data.nutrient.fat}
                fattyAcid={data.nutrient.fattyAcid}
                protein={data.nutrient.protein}
                sodium={data.nutrient.sodium}
                sugars={data.nutrient.sugars}
                transFat={data.nutrient.transFat}
            />
        )
    })


    useEffect(() => {
        getOnePost();
    }, [])


    return (
        <Container style = {style.container}>
        <Content>
            {
                postData && menuData ?
                (
                    <>
                    <CardComponent 
                        userId={postData.userId}
                        mealType={postData.mealType}
                        imageSource={LOCAL + postData.pictures[0].pictureDownloadUri}
                        imageWidth={null}
                        imageHeight={300}
                        likes='0'
                        date={postData.insertTime}
                        content={postData.content}
                        avatar={postData.avatarDownloadUri}
                    />
                    <ScrollView horizontal={true} style={{ backgroundColor: '#F2CE16', borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: 10 }}>
                        <TableComponent
                            name='Total'
                            calorie={calorie}
                            carbohydrate={carbohydrate}
                            cholesterol={cholesterol}
                            fat={fat}
                            fattyAcid={fattyAcid}
                            protein={protein}
                            sodium={sodium}
                            sugars={sugars}
                            transFat={transFat}
                        />
                        {menuRenderCards}
                    </ScrollView>
                    </>
                ) :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Comfortaa-Bold' }}>Loading...</Text>
                </View>
            }
           
        </Content>
    </Container>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default DetailPage;