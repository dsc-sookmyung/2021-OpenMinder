import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AuthenticationService from './AuthenticationService';

function Welcome() {

    const [welcomeMessage, setWelcomeMessage] = useState('');

    const retrieveWelcomeMessage = () => {
        AuthenticationService.executeHelloService()
            .then(res => handleSuccessfulResponse(res))
            .catch(e => handleError(e))
    }

    const handleSuccessfulResponse = (response) => {
        console.log(response)
        setWelcomeMessage(response.data)
    }

    const handleError = (error) => {
        console.log(error.response)
        let errorMessage = '';

        if (error.message) errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        setWelcomeMessage(errorMessage);
    }

    return (
        <View>
            <Text>Welcome</Text>
            <View>
                <Text>Check if axiosInterceptors is working well!</Text>
                <Button title="Get Message" onPress={retrieveWelcomeMessage} />
            </View>
            <View>
                <Text>{welcomeMessage}</Text>
            </View>
        </View>
    )
}

export default Welcome;