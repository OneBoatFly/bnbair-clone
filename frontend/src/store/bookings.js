import { csrfFetch } from './csrf';

// action consts
const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS';
const LOAD_SPOT_BOOKINGS = 'bookings/LOAD_SPOT_BOOKINGS';

// normal action creators
const loadUserBookings = (data) => {
    return {
        type: LOAD_USER_BOOKINGS,
        payload: data
    }    
}

const loadSpotBookings = (data) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        payload: data
    }
}


// get all current users bookings
export const getUserBookings = () => async (dispatch) => {
    // console.log('---------- getUserBookings thunk --------- ')

    const response = await csrfFetch(`/api/bookings/current`);
    if (response.ok) {
        const data = await response.json();
        // console.log('response ok - data', data)
        dispatch(loadUserBookings(data));
    } else {
        return response
    }
}


// get all spot's bookings
export const getSpotBookings = (spotId) => async (dispatch) => {
    // console.log('---------- getSpotBookings thunk --------- ')

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    // console.log(response)
    if (response.ok) {
        const data = await response.json();
        // console.log('response ok - data', data)
        dispatch(loadSpotBookings(data));
    } else {
        return response
    }
}


export const deleteBooking = (bookingId) => async (dispatch) => {
    // console.log('---------- deleteBooking thunk --------- ', bookingId)
    const options = { method: 'DELETE' };
    const response = await csrfFetch(`/api/bookings/${bookingId}`, options);

    if (response.ok) {
        const data = await response.json();

        dispatch(getUserBookings());
        return data.message;
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
        case LOAD_SPOT_BOOKINGS: {
            // console.log('--------- payload', action.payload)
            newState = {
                ...state,
                spotFutureBookings: action.payload.BookingsFuture,
                spotPastBookings: action.payload.BookingsPast
            }
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default bookingsReducer;
