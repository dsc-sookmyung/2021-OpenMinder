import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOCAL } from '../../ipConfig'

class AuthenticationService {

    executeJwtSignUpService(username, password) {
        return axios.post(`${LOCAL}/api/auth/signUp`, {
            username, password
        });
    }

    // send username, password to the SERVER
    executeJwtAuthenticationService(username, password) {
        return axios.post(`${LOCAL}/api/auth/signIn`, {
            username, password
        });
    }

    executeHelloService() {
        console.log("===executeHelloService")
        return axios.get(`${LOCAL}/hello`);
    }

    async registerSuccessfullLoginForJwt(username, token, fileDownloadUri, userId, goal) {
        console.log("===registerSuccessfulLoginForJwt===")   
        
        console.log('token', token);
        console.log('username', username);
        console.log('fileDownloadUri', fileDownloadUri);
        console.log('userId', userId);
        console.log('goal', goal);
        
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('authenticatedUser', username);
        await AsyncStorage.setItem('fileDownloadUri', LOCAL + fileDownloadUri);
        await AsyncStorage.setItem('userId', userId);
        if (goal === null) {
            await AsyncStorage.setItem('goal', 'Try To Set Your Goal!');
        } else {
            await AsyncStorage.setItem('goal', goal);
        }
        this.setupAxiosInterceptors();
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    async setupAxiosInterceptors() {
        const token = await AsyncStorage.getItem('token');
        axios.interceptors.request.use(
            config => {
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            error => {
                Promise.reject(error)
            })
    }

    async logout() {
        try {
            let logout = await AsyncStorage.getItem('token')
            console.log("logout", logout)
            await AsyncStorage.removeItem('authenticatedUser');
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('fileDownloadUri');
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('goal');
            logout = await AsyncStorage.getItem('token')
            console.log("logout", logout)
        } catch (e) {
            console.log(e)
        }
        
    }

    async isUserLoggedIn() {
        const token = await AsyncStorage.getItem('token')
        console.log("===UserloggedInCheck===");
        console.log(token);

        if (token !== null) return true;
        return false;
    }

    async getLoggedInUserName() {
        let user = await AsyncStorage.getItem('authenticatedUser');
        if (user === null) return '';
        return user;
    }
}

export default new AuthenticationService();