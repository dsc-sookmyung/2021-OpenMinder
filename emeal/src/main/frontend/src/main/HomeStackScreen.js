import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';

import Main from './Main';
import CommunityRoot from '../community/CommunityRoot';
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
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Community') {
                iconName = focused 
                  ? 'md-planet' 
                  : 'md-planet-outline';
              } else if (route.name === 'Profile') {
                iconName = focused
                  ? 'md-folder-open'
                  : 'md-folder-open-outline'
              }
  
              // You can return any component that you like here!
              return <Icon name={iconName} size={size} style={{color: color}} />;
            },
          })}
        tabBarOptions={{
          activeTintColor: '#F2CE16',
          inactiveTintColor: 'gray',
          showIcon: true
        }}
      >
        <Tab.Screen name="Main" component={Main} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Community" component={CommunityRoot} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Profile" component={MyPageRoot} options={{ unmountOnBlur: true }} />
      </Tab.Navigator>
    );
  }

  export default HomeStackScreen;