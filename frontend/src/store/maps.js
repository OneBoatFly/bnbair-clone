import { csrfFetch } from './csrf';

// regular action
const LOAD_API_KEY = 'maps/loadApiKey';

const loadApiKey = (key) => ({
    type: LOAD_API_KEY,
    payload: key,
});

// thunk
export const getKey = () => async (dispatch) => {
    const res = await csrfFetch('/api/maps/key', {
        method: 'POST',
    });
    const data = await res.json();
    dispatch(loadApiKey(data.googleMapsAPIKey));
};

const initialState = { key: null };

// reducer
const mapsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_API_KEY:
            return { key: action.payload };
        default:
            return state;
    }
};


export default mapsReducer;