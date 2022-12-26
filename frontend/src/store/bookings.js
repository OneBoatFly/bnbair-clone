import { csrfFetch } from './csrf';

// action consts
const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS';

// normal action creators
const loadUserBookings = (data) => {
    return {
        type: LOAD_USER_BOOKINGS,
        payload: data
    }    
}


// get all current users bookings
export const getUserBookings = () => async (dispatch) => {
    console.log('---------- getUserBookings thunk --------- ')

    const response = await csrfFetch(`/api/bookings/current`);
    if (response.ok) {
        const data = await response.json();
        console.log('response ok - data', data)
        dispatch(loadUserBookings(data));
    }
}

const initalState = {
    spotFutureBookings: [],
    spotPastBookings: [],
    userFutureBookings: [],
    userPastBookings: []
}

const bookingsReducer = (state = initalState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_BOOKINGS: {
            // console.log('--------- payload', action.payload)
            newState = {
                ...state, 
                userFutureBookings: action.payload.BookingsFuture,
                userPastBookings: action.payload.BookingsPast
            }
            return newState;
        }
        // case LOGOUT_USER: {
        //     // console.log('LOGOUT_USER')
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        // }
        default: {
            return state;
        }
    }
};

export default bookingsReducer;
