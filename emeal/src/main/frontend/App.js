import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/_modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';


import Root from './src/main/Root';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
  );
console.log(store.getState());

const App = () => {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};


export default App;




// import React, { useEffect, useReducer, useMemo } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './src/_modules/index';

// import Welcome from './src/auth/Welcome';
// import SignIn from './src/auth/SignIn';
// import SignUp from './src/auth/SignUp';
// import Main from './src/main/Main';
// import Splash from './src/main/Splash';
// import PostDetailPage from './src/myPage/PostDetailPage';
// import AuthenticationService from './src/auth/AuthenticationService';
// import { AuthContext } from './src/context'
// import { LOCAL } from './ipConfig';


// const Stack = createStackNavigator();

// const store = createStore(rootReducer);
// console.log(store.getState());

// const App = () => {

//   const [state, dispatch] = useReducer(
//     (prevState, action) => {
//       switch (action.type) {
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//             avatarDownloadUri: action.avatarDownloadUri
//           }
//           case 'SIGN_IN':
//             return {
//               ...prevState,
//               isSignout: false,
//               userToken: action.token,
//               avatarDownloadUri: action.avatarDownloadUri
//             }
//           case 'SIGN_OUT':
//             return {
//               ...prevState,
//               isSignout: true,
//               userToken: null,
//               avatarDownloadUri: null
//             }
//       }
//     },
//     {
//       isLoading: true,
//       isSignout: false,
//       userToken: null,
//       avatarDownloadUri: null
//     }
//   )
  
//   useEffect(() => {
//     const bootstrapAsync = async () => {
//       let userToken;

//       try {
//         userToken = await AsyncStorage.getItem('token');
//         avatar = await AsyncStorage.getItem('fileDownloadUri');
//         console.log('userToken: ', userToken)
//       } catch (e) {
//         console.log(e)
//       }
//       dispatch({ type: 'RESTORE_TOKEN', token: userToken, avatarDownloadUri: avatar });
//     }
//     bootstrapAsync();
//   }, []);

//   const authContext = useMemo(
//     () => ({
//       signIn: (username, password) => {
//         AuthenticationService
//         .executeJwtAuthenticationService(username, password)
//         .then(res => {

//           console.log('res.data: ', res.data)
//           AuthenticationService.registerSuccessfullLoginForJwt(username, res.data.accessToken, res.data.fileDownloadUri)
//           dispatch({ type: 'SIGN_IN', token: res.data.accessToken, avatarDownloadUri: LOCAL + res.data.fileDownloadUri })

//         })
//       },
//       signOut: () => {
//         AuthenticationService.logout()
//         dispatch({ type: 'SIGN_OUT' })
//       }
//     }), []
//   )

//   if (state.isLoading) {
//     return <Splash />;
//   }

//   return (
//     <Provider store={store}>
//     <AuthContext.Provider value={authContext}>
//       <NavigationContainer>
//         <Stack.Navigator> 
//           {state.userToken === null ? (
//             <>
//               {console.log('login')}
//               <Stack.Screen name="SignIn" component={SignIn} />
//               <Stack.Screen name="SignUp" component={SignUp} />   
//             </>
//           ) : (
//             <>
//               {console.log('main')}
//               <Stack.Screen name="Main" component={Main} /> 
//               <Stack.Screen name="Welcome" component={Welcome} /> 
//               <Stack.Screen name="PostDetailPage" component={PostDetailPage} initialParams={{ avatar: state.avatarDownloadUri}} /> 
//             </> 
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthContext.Provider>
//     </Provider>
//   );
// };


// export default App;
