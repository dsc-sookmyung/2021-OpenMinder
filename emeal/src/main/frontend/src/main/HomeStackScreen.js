import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';

import Main from './Main';
import Community from '../community/Community';
import MyPageRoot from '../myPage/MyPageRoot';

const Tab = createBottomTabNavigator();

function HomeStackScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Main') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Community') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
  
              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showIcon: true
        }}
      >
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Profile" component={MyPageRoot} />
      </Tab.Navigator>
    );
  }

  export default HomeStackScreen;