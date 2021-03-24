import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Community from './Community';
import DetailPage from './DetailPage';

const Stack = createStackNavigator();

function CommunityRoot() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
      </Stack.Navigator>
    );
  }

  export default CommunityRoot;