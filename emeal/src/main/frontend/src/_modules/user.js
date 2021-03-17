import AuthenticationService from "../auth/AuthenticationService";
import { LOCAL } from '../../ipConfig';

/* type */
const RESTORE_TOKEN = 'restore_token';

const SIGN_IN = 'sign_in';
const SIGN_IN_SUCCESS = 'sign_in_success';
const SIGN_IN_ERROR = 'sign_in_error';

const SIGN_OUT = 'sign_out';
const SIGN_OUT_SUCCESS = 'sign_out_success';
const SIGN_OUT_ERROR = 'sign_out_error';


/* action */
export const restoreToken = (token, avatarUri, userId, goal) => {
    return {
        type: 'restore_token',
        token: token,
        avatarUri: avatarUri,
        userId: userId,
        goal: goal
    }
}

export const signIn = (username, password) => async dispatch => {
    dispatch({ type: SIGN_IN });
    
    AuthenticationService
        .executeJwtAuthenticationService(username, password)
        .then(res => {
            console.log('res.data: ' ,res.data)
            const data = res.data;
            AuthenticationService.registerSuccessfullLoginForJwt(username, data.accessToken, data.fileDownloadUri, data.userId, data.goal);
            dispatch({ type: SIGN_IN_SUCCESS, payload: res.data });
        })
        .catch(e => dispatch({ type: SIGN_IN_ERROR, error: e }))
}

export const signOut = () => async dispatch => {
    dispatch({ type: SIGN_OUT });
    try {
        AuthenticationService.logout()
            .then(
                dispatch({ type: SIGN_OUT_SUCCESS })
            )
    } catch (e) {
        dispatch({ type: SIGN_OUT_ERROR, error: e });
    }
}


/* reducer */
const initialState = {
        isLoading: true,
        isSignout: false,
        userToken: null,
        avatarDownloadUri: null,
        userId: null,
        goal: null,
        error: null
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case RESTORE_TOKEN:
            return {
                    ...state.data,
                    userToken: action.token,
                    isLoading: false,
                    avatarDownloadUri: action.avatarUri,
                    userId: action.userId,
                    goal: action.goal,
                    error: null
            }
        case SIGN_IN:
            return {
                    ...state.data, 
                    userToken: null,
                    isLoading: true,
            }
        case SIGN_IN_SUCCESS:
            return {
                    ...state.data,
                    userToken: action.payload.accessToken,
                    isLoading: false,
                    avatarDownloadUri: LOCAL + action.payload.fileDownloadUri,
                    userId: action.payload.userId,
                    goal: action.payload.goal,
                    error: null
            }
        case SIGN_IN_ERROR:
            return {
                    ...state.data,
                    error: action.error,
                    isLoading: false,
            }
        case SIGN_OUT:
            return {
                    ...state.data,
                    isSignout: true
            }   
        case SIGN_OUT_SUCCESS:
            return {
                    ...state.data,
                    isLoading: false,
                    userToken: null,
                    isSignout: true,
                    avatarDownloadUri: null,
                    userId: null,
                    goal: null
            } 
        case SIGN_OUT_ERROR:
            return {
                    ...state.data,
                    isLoading: true,
                    error: action.error
            }
        default: 
            return state
    }
}