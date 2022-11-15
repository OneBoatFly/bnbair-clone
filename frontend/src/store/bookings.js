import { csrfFetch } from './csrf';

// action consts

// normal action creators


// get all current users reviews
export const getUserBookings = () => async (dispatch) => {
    console.log('getUserBookings thunk ---- ')

    const response = await csrfFetch(`/api/bookings/current`);
    if (response.ok) {
        const data = await response.json();
        console.log('response ok - data', data)

        if (data.Bookings) {
            const bookings = data.Bookings;
            // const reviewsModified = bookings.map((review) => {
            //     const date = new Date(review.updatedAt);
            //     const month = date.toLocaleString('en-US', { month: 'long' });
            //     const year = date.getFullYear();
            //     return { ...review, updatedAt: `${month} ${year}` }
            // })

            // const reviewsNormal = normalizeArray(reviewsModified);
            // console.log('user reviews --- ', reviewsNormal);

            // dispatch(loadUserReviews(reviewsNormal));

            // return data.Reviews;
        } else {
            return data;
        }
    }
}

const initalState = {}

const bookingsReducer = (state = initalState, action) => {
    // console.log(action)
    // console.log('booking reducer: current state --------', state)
    let newState;
    switch (action.type) {
        // case LOGIN_USER: {
        //     // console.log('LOGIN_USER')
        //     newState = Object.assign({}, state);
        //     const { id, username, email, firstName, lastName } = action.user;
        //     // console.log(action.user)
        //     if (id) newState.user = { id, username, email, firstName, lastName };
        //     return newState;
        // }
        // case LOGOUT_USER: {
        //     // console.log('LOGOUT_USER')
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        // }
        default: {
            // console.log('session reducer DEFAULT')
            return state;
        }
    }
};

export default bookingsReducer;

// {
//     spotBookings: {}
//     userBookings: {}
// }