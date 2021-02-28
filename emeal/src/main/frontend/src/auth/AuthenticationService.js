import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOCAL } from '../../ipConfig'

class AuthenticationService {

    executeJwtSignUpService(username, password) {
        return axios.post(`http://${LOCAL}:8080/api/auth/signUp`, {
            username, password
        });
    }

    // send username, password to the SERVER
    executeJwtAuthenticationService(username, password) {
        return axios.post(`http://${LOCAL}:8080/api/auth/signIn`, {
            username, password
        });
    }

    executeHelloService() {
        console.log("===executeHelloService")
        return axios.get(`http://${LOCAL}:8080/hello`);
    }

    async registerSuccessfullLoginForJwt(username, token) {
        console.log("===registerSuccessfulLoginForJwt===")   
        const jsonToken = JSON.stringify(token)
        const jsonUser = JSON.stringify(username)
        console.log('token', token);
        console.log('username', username);
        console.log('token', jsonToken);
        console.log('username', jsonUser);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('authenticatedUser', username);
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