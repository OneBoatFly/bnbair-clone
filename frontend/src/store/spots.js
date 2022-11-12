import { csrfFetch } from './csrf';
import coordinatesDistance from '../components/Spots/spotDistance';

// regular actions
const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAIL = 'spots/getOneSpot';

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
};

const loadSpotDetail = (spot) => {
    return {
        type: LOAD_SPOT_DETAIL,
        spot
    }
};

// thunk actions
export const getAllSpots = (userCoord) => async (dispatch) => {
    // console.log('getAllSpots thunk')
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        // console.log('getAllSpots thunk: ', spots)

        const userLat = userCoord.latitude;
        const userLon = userCoord.longitude;
        // console.log(userCoord)
        // console.log(spots)
        for (let id in spots.Spots) {
            const spot = spots.Spots[id];
            const { lat, lng } = spot;
            const distance = coordinatesDistance(userLat, userLon, lat, lng);
            spot.distance = Math.round(distance);
        }

        const normalSpots = normalizeArray(spots.Spots)
        dispatch(loadSpots(normalSpots));
    }
};

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        console.log('getOneSpot thunk: ', spot)

        dispatch(loadSpotDetail(spot));
    }
};

// reducer
const initalState = {spots: {}, spotDetails: {}};
const spotsReducer = (state = initalState, action) => {
    // console.log(action)
    // console.log('spots: current state', state)
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = Object.assign(state, { spots: action.spots });
            // console.log(spots)
            return newState;
        }
        case LOAD_SPOT_DETAIL: {
            const newState = Object.assign(state, {spotDetails: action.spot});
            return newState;
        }
        default: return state;
    }
};

export default spotsReducer;

function normalizeArray(array) {
    const obj = {};

    array.forEach(element => {
        obj[element.id] = element
    });

    return obj;
}