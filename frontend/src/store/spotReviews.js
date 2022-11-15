import { csrfFetch } from './csrf';

// regular actions
const LOAD_SPOT_REVIEWS = 'spots/:id/loadSpotReviews';
const LOAD_USER_REVIEWS = 'spots/:id/loadUserReviews';

const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        reviews
    }
};

const loadUserReviews = (reviews) => {
    return {
        type: LOAD_USER_REVIEWS,
        reviews
    }
};

// thunk actions
export const getSpotReviews = (spotId) => async (dispatch) => {
    console.log('getSpotReviews thunk ---- ')
    console.log('spotid', spotId)
    
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        console.log('response ok - data', data)

        if (data.Reviews) {
            // const reviewsNormal = normalizeArray(data.Reviews);
            const reviews = data.Reviews;
            const reviewsModified = reviews.map((review) => {
                const date = new Date(review.updatedAt);
                const month = date.toLocaleString('en-US', { month: 'long' });
                const year = date.getFullYear();
                return { ...review, updatedAt: `${month} ${year}`}
            })
            dispatch(loadSpotReviews(reviewsModified));

            return data.Reviews;
        } else {
            return data;
        }

    }
}

// get all current users reviews
export const getUserReviews = () => async (dispatch) => {
    console.log('getUserReviews thunk ---- ')

    const response = await csrfFetch(`/api/reviews/current`);
    if (response.ok) {
        const data = await response.json();
        console.log('response ok - data', data)

        if (data.Reviews) {
            const reviews = data.Reviews;
            const reviewsModified = reviews.map((review) => {
                const date = new Date(review.updatedAt);
                const month = date.toLocaleString('en-US', { month: 'long' });
                const year = date.getFullYear();
                return { ...review, updatedAt: `${month} ${year}` }
            })
            
            const reviewsNormal = normalizeArray(reviewsModified);
            console.log('user reviews --- ', reviewsNormal);

            dispatch(loadUserReviews(reviewsNormal));

            return data.Reviews;
        } else {
            return data;
        }
    }
}

// delete a review given a reviewId
export const deleteReview = (reviewId) => async (dispatch) => {
    console.log('deleteReview thunk ---- ')
    const options = {method: 'DELETE'};

    const response = await csrfFetch(`/api/reviews/${reviewId}`, options);
    if (response.ok) {
        const data = await response.json();
        console.log('response ok - data', data);

        dispatch(getUserReviews());
        return data.message;
    }
}

const initalState = {};

const spotsReviewReducer = (state = initalState, action) => {
    // console.log(action)
    console.log('*spotReview reducer: current state ------------ ', state)
    let newState;
    switch (action.type) {
        case LOAD_SPOT_REVIEWS: {
            console.log('LOAD_SPOT_REVIEWS')
            newState = { ...state }
            newState.spotAllReviews = action.reviews
            return newState;
        }
        case LOAD_USER_REVIEWS: {
            console.log('LOAD_USER_REVIEWS')
            newState = { ...state }
            newState.userAllReviews = action.reviews
            return newState;
        }
        default: {
            // console.log('spots reducer DEFAULT')
            return state;
        }
    }
};

export default spotsReviewReducer;

function normalizeArray(array) {
    const obj = {};

    array.forEach(element => {
        obj[element.id] = element
    });

    return obj;
}