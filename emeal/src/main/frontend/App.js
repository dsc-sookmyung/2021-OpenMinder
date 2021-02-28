import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Welcome from './src/auth/Welcome';
import SignIn from './src/auth/SignIn';
import SignUp from './src/auth/SignUp';
import Main from './src/main/Main';
import AuthenticationService from './src/auth/AuthenticationService';
import { AuthContext } from './src/context'


const Stack = createStackNavigator();


const App = () => {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
          case 'SIGN_IN':
            return {
              ...prevState,
              isSignout: false,
              userToken: action.token,
            }
          case 'SIGN_OUT':
            return {
              ...prevState,
              isSignout: true,
              userToken: null,
            }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  )
  
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    }
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: (username, password) => {
        AuthenticationService
        .executeJwtAuthenticationService(username, password)
        .then(res => {

          console.log('res.data: ', res.data)
          AuthenticationService.registerSuccessfullLoginForJwt(username, res.data.accessToken)
          dispatch({ type: 'SIGN_IN', token: res.data.accessToken })

        })
      },
      signOut: () => {
        AuthenticationService.logout()
        dispatch({ type: 'SIGN_OUT' })
      }
    }), []
  )


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator> 
          {state.userToken === null ? (
            <>
              {console.log('login')}
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />   
            </>
          ) : (
            <>
              {console.log('main')}
              <Stack.Screen name="Main" component={Main} /> 
              <Stack.Screen name="Welcome" component={Welcome} /> 
            </> 
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};


export default App;
