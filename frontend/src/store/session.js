import { csrfFetch } from './csrf';
import { getLocationPromise } from './userLocation/userLocation';

// action consts
const LOGIN_USER = 'session/setUser';
const LOGOUT_USER = 'session/unSetUser';
const LOAD_USER_LOCATION = '/loadUserLocation';

// normal action creators
const setUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
};

const unsetUser = () => {
    return {
        type: LOGOUT_USER
    }
}

const loadUserLocation = (location) => {
    return {
        type: LOAD_USER_LOCATION,
        location
    }
}

// thunk action creators
export const login = (userCredentials) => async (dispatch) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(userCredentials)
    };

    const response = await csrfFetch('/api/session', options);

    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
};

export const signup = (signupInfo) => async (dispatch) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(signupInfo)
    };

    const response = await csrfFetch('/api/users', options);

    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
}

export const logout = () => async (dispatch) => {
    const options = {
        method: 'DELETE'
    }

    const response = await csrfFetch('/api/session', options);
    if (response.ok) {
        dispatch(unsetUser());
    }
}

export const userLocation = () => async (dispatch) => {
    const location = await getLocationPromise;
    dispatch(loadUserLocation(location));
}

const initalState = { user: null, userLocation: {} }

const sessionReducer = (state = initalState, action) => {
    let newState;
    switch (action.type) {
        case LOGIN_USER: {
            newState = Object.assign({}, state);
            const { id, username, email, firstName, lastName, profileUrl, isSuperhost } = action.user;
            if (id) newState.user = { id, username, email, firstName, lastName, profileUrl, isSuperhost };
            return newState;
        }
        case LOGOUT_USER: {
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }
        case LOAD_USER_LOCATION: {
            newState = { ...state };
            newState.userLocation = action.location;
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default sessionReducer;