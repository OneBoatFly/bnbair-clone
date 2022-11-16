import { csrfFetch } from './csrf';

// action consts
const LOGIN_USER = 'session/setUser';
const LOGOUT_USER = 'session/unSetUser';

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

// thunk action creators
export const login = (userCredentials) => async (dispatch) => {
    // expect userCredentials = {credential: 'sth', password: 'sth'}
    // console.log('*** reaching login thunk')
    const options = {
        method: 'POST',
        body: JSON.stringify(userCredentials)
    };

    // console.log('options', options)
    const response = await csrfFetch('/api/session', options);

    if (response.ok) {
        const user = await response.json();
        // console.log('user', user)
        dispatch(setUser(user));
        return user;
    }
};

export const restoreUser = () => async (dispatch) => {
    // console.log('in restoreUser thunk')
    const response = await csrfFetch('/api/session');
    // console.log(response, response.ok)
    if (response.ok) {
        const user = await response.json();
        // console.log('user', user)
        dispatch(setUser(user));
        return user;
    }
};

export const signup = (signupInfo) => async (dispatch) => {
    // console.log("************** hitting singup thunk")
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

const initalState = { user: null }

const sessionReducer = (state = initalState, action) => {
    // console.log(action)
    // console.log('session: current state --------', state)
    let newState;
    switch (action.type) {
        case LOGIN_USER: {
            // console.log('LOGIN_USER')
            newState = Object.assign({}, state);
            const {id, username, email, firstName, lastName} = action.user;
            // console.log(action.user)
            if (id) newState.user = { id, username, email, firstName, lastName };
            return newState;
        }
        case LOGOUT_USER: {
            // console.log('LOGOUT_USER')
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }
        default: {
            // console.log('session reducer DEFAULT')
            return state;
        }
    }
};

export default sessionReducer;

// {
//     user: {
//         id,
//             email,
//             username,
//             createdAt,
//             updatedAt
//     }
// }