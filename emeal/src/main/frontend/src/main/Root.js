import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from '../_modules/user';

import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Splash from './Splash';
import HomeStackScreen from './HomeStackScreen';


const Stack = createStackNavigator();

const Root = () => {

const dispatch = useDispatch();
const user = useSelector(state => state.user);
console.log(user)

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      let avatarUri;

      try {
        token = await AsyncStorage.getItem('token');
        avatarUri = await AsyncStorage.getItem('fileDownloadUri');
        userId = await AsyncStorage.getItem('userId');
        goal = await AsyncStorage.getItem('goal');
      } catch (e) {
        console.log(e)
      }
      dispatch(restoreToken(token, avatarUri, userId, goal));
    }
    bootstrapAsync();
  }, []);



  if (user.isLoading) {
    return <Splash />;
  }

  return (
    
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        > 
          {user.userToken === null ? (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />   
            </>
          ) : (
            <>
              <Stack.Screen name="Everyone's Meal" component={HomeStackScreen} /> 
              {/* <Stack.Screen name="Main" component={Main} /> 
              <Stack.Screen name="Welcome" component={Welcome} /> 
              <Stack.Screen name="PostDetailPage" component={PostDetailPage} />  */}
            </> 
          )}
        </Stack.Navigator>
      </NavigationContainer>
    
  );
};


export default Root;

