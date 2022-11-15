import { csrfFetch } from './csrf';

// regular actions
const LOAD_SPOT_REVIEWS = 'spots/:id/loadSpotReviews';

const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_SPOT_REVIEWS,
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