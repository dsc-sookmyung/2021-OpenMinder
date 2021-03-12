import React, { Component } from 'react';
import { Input, Item, Container, Header, Thumbnail, Left, Body, Right, Icon, Title, Content, List, ListItem } from 'native-base';
import Modal from 'react-native-simple-modal';
import {AppRegistry, Text, TouchableOpacity, View, Button } from 'react-native';


class EditProfile extends Component {
  state = {open: false};
  render() {
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    return (
      <Container>
        <Header style={{backgroundColor:"#F2BB16"}}>
            <Left>
            <Button
                title="취소"
                color="#F2BB16"
                onPress={() => this.props.navigation.navigate('Profile')}
            />
            </Left>
            <Right>
            <Button
                title="완료"
                color="#F2BB16"
                onPress={() => this.props.navigation.navigate('Profile')}
            />
            </Right>
        </Header>

        <View style={{flex: 1, alignItems: 'center', paddingBottom: 30, paddingTop: 30}}>
            <Thumbnail large source={{uri: uri}} />
            <Text>{"\n"}</Text>

            <TouchableOpacity onPress={() => this.setState({open: true})}>
                <Text style={{fontSize: 25}}>프로필 변경</Text>
            </TouchableOpacity>
            <Text>{"\n"}</Text>

            <Item style={{paddingLeft: 15}}>
                <Text>이름</Text><Input style={{paddingLeft: 30}} placeholder="this.props에서 가져온 이름값 기본 넣기" />
            </Item>
            <Text>{"\n"}</Text>

            <Item style={{paddingLeft: 15}}>
                <Text>목표</Text><Input style={{paddingLeft: 30}} placeholder="this.props에서 가져온 목표값 기본 넣기" />
            </Item>

            <Modal
                offset={this.state.offset}
                open={this.state.open}
                modalDidOpen={() => console.log('modal did open')}
                modalDidClose={() => this.setState({open: false})}
                style={{alignItems: 'center'}}>
                <View>
                    <TouchableOpacity style={{margin: 5}}>
                        <Text>현재 사진 삭제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin: 5}}>
                        <Text>사진 업로드</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin: 5}}
                        onPress={() => this.setState({open: false})}>
                        <Text>취소</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    </Container>
    );
  }
}

export default EditProfile;
