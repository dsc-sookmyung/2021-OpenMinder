import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import calendarPage from './CalendarPage';
import pieChartPage from './PieChartPage';
import lineGraphPage from './LineGraphPage';

const Stack = createStackNavigator();

function dataPageRoot() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="calendarPage" component={calendarPage} />
            <Stack.Screen name="graphPage" component={pieChartPage} />
            <Stack.Screen name="chartPage" component={lineGraphPage} />
        </Stack.Navigator>
    );
}

export default dataPageRoot;