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
export const restoreToken = (token, avatarUri) => {
    return {
        type: 'restore_token',
        token: token,
        avatarUri: avatarUri
    }
}

export const signIn = (username, password) => async dispatch => {
    dispatch({ type: SIGN_IN });
    
    AuthenticationService
        .executeJwtAuthenticationService(username, password)
        .then(res => {
            console.log('res.data: ' ,res.data)
            AuthenticationService.registerSuccessfullLoginForJwt(username, res.data.accessToken, res.data.fileDownloadUri);
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
    error: null
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case RESTORE_TOKEN:
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
                avatarDownloadUri: action.avatarUri,
                error: null
            }
        case SIGN_IN:
            return {
                ...state, 
                userToken: null,
                isLoading: true,
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                userToken: action.payload.accessToken,
                isLoading: false,
                avatarDownloadUri: LOCAL + action.payload.fileDownloadUri,
                error: null
            }
        case SIGN_IN_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            }
        case SIGN_OUT:
            return {
                ...state,
                isSignout: true
            }   
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userToken: null,
                isSignout: true,
                avatarDownloadUri: null
            } 
        case SIGN_OUT_ERROR:
            return {
                ...state,
                isLoading: true,
                error: action.error
            }
        default: 
            return state        
    }
}