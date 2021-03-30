import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarPage from './CalendarPage';
import PieChartPage from './PieChartPage';
import LineGraphPage from './LineGraphPage';

const Stack = createStackNavigator();

function dataPageRoot() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="CalendarPage" component={CalendarPage} />
            <Stack.Screen name="LineGraphPage" component={LineGraphPage} />
            <Stack.Screen name="PieChartPage" component={PieChartPage} />
        </Stack.Navigator>
    );
}

export default dataPageRoot;