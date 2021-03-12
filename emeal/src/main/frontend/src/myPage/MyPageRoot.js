import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Profile';
import EditProfile from './EditProfile';

const Stack = createStackNavigator();

function MyPageRoot() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    );
  }

  export default MyPageRoot;