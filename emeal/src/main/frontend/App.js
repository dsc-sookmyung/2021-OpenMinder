import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Welcome from './src/auth/Welcome';
import SignIn from './src/auth/SignIn';
import SignUp from './src/auth/SignUp';
import Main from './src/main/Main';
import Profile from './src/main/Profile';
import EditProfile from './src/main/EditProfile';
import Community from './src/main/Community';
import AuthenticationService from './src/auth/AuthenticationService';
import { AuthContext } from './src/context'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Profile" component={Root} />
    </Tab.Navigator>
  );
}

function App() {

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
              <Stack.Screen name="Everyone's Meal" component={HomeStackScreen} />
            </> 
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;