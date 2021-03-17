import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Profile';
import EditProfile from './EditProfile';
import ProfilePage from './ProfilePage';
import UpdateProfile from './UpdateProfile';

const Stack = createStackNavigator();

function MyPageRoot() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      </Stack.Navigator>
    );
  }

  export default MyPageRoot;