import { csrfFetch } from './csrf';

// regular action
const LOAD_API_KEY = 'maps/loadApiKey';
const LOAD_GEO_KEY = 'maps/loadGeoKey';

const loadApiKey = (key) => ({
    type: LOAD_API_KEY,
    payload: key,
});

const loadGeoKey = (key) => ({
    type: LOAD_GEO_KEY,
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

export const getGeoKey = () => async (dispatch) => {
    const res = await csrfFetch('/api/maps/geokey', {
        method: 'POST',
    });
    const data = await res.json();
    dispatch(loadGeoKey(data.geoAPIKey));
};



const initialState = { key: null, geoKey: null};

// reducer
const mapsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_API_KEY:
            return { ...state, key: action.payload };
        case LOAD_GEO_KEY:
            return { ...state, geokey: action.payload };            
        default:
            return state;
    }
};


export default mapsReducer;