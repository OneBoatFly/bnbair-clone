import { csrfFetch } from './csrf';
import coordinatesDistance from '../components/Spots/spotDistance';

// regular actions
const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAIL = 'spots/getOneSpot';
const CREATE_SPOT = 'spots/createSpot';

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

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

// thunk actions
export const getAllSpots = (userCoord) => async (dispatch) => {
    // console.log('getAllSpots thunk')
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();

        // const userLat = userCoord.latitude;
        // const userLon = userCoord.longitude;
        // // console.log(userCoord)
        // // console.log(spots)
        // for (let id in spots.Spots) {
        //     const spot = spots.Spots[id];
        //     const { lat, lng } = spot;
        //     const distance = coordinatesDistance(userLat, userLon, lat, lng);
        //     spot.distance = Math.round(distance);
        // }

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

export const createOneSpot = (spotInfo) => async (dispatch) => {
    console.log('----------reached creating a spot thunk----------')
    const options = {
        method: 'POST',
        body: JSON.stringify(spotInfo)
    };

    const response = await csrfFetch('/api/spots', options);

    if (response.ok) {
        console.log('-------------reached reponse ok-------------')
        const spot = await response.json();
        
        // dispatch(loadSpotDetail(spot));
        return spot;
    }
}

// reducer allSpots: {}, spotDetails: {SpotImages: [], Owner: {}}
const initalState = {};
const spotsReducer = (state = initalState, action) => {
    // console.log(action)
    // console.log('*spots reducer: current state ------------ ', state)
    let newState;
    switch (action.type) {
        case LOAD_SPOTS: {
            // console.log('LOAD_SPOTS')
            newState = {...state}
            newState.allSpots = action.spots
            return newState;
        }
        case LOAD_SPOT_DETAIL: {
            // console.log('LOAD_SPOT_DETAIL')
            const newState = { ...state };
            newState.spotDetails = action.spot;
            return newState;
        }
        default: {
            // console.log('spots reducer DEFAULT')
            return state;
        }
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