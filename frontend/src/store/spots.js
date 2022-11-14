import { csrfFetch } from './csrf';
import coordinatesDistance from '../components/Spots/spotDistance';

// regular actions
const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAIL = 'spots/getOneSpot';
const LOAD_OWNER_SPOTS = 'spots/ownerSpots';
const REMOVE_OWNER_SPOTS = 'spots/removeOwnerSpots';

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

const loadOwnerSpots = (spots) => {
    return {
        type: LOAD_OWNER_SPOTS,
        spots
    }
};

export const removeOwnerSpots = () => {
    return {
        type: REMOVE_OWNER_SPOTS
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

export const createOneSpot = (spotInfo) => async () => {
    console.log('----------reached creating a spot thunk----------')
    const options = {
        method: 'POST',
        body: JSON.stringify(spotInfo)
    };

    const response = await csrfFetch('/api/spots', options);

    if (response.ok) {
        console.log('-------------reached reponse ok-------------')
        const spot = await response.json();
        return spot;
    }
};

export const updateOneSpot = (spotInfo, spotId) => async () => {
    console.log('----------reached update a spot thunk----------')
    const options = {
        method: 'PUT',
        body: JSON.stringify(spotInfo)
    };

    const response = await csrfFetch(`/api/spots/${spotId}`, options);

    if (response.ok) {
        console.log('-------------reached reponse ok-------------')
        const spot = await response.json();
        return spot;
    }
};

export const getOwnerSpots = () => async (dispatch) => {
    console.log('getOwnerSpots thunk')
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const ownerSpots = await response.json();

        const normalSpots = normalizeArray(ownerSpots.Spots)
        dispatch(loadOwnerSpots(normalSpots));
    }
};

export const deleteOneSpot = (spotId) => async (dispatch) => {
    console.log('deleteOneSpot thunk')
    const options = {
        method: 'DELETE'
    }
    const response = await csrfFetch(`/api/spots/${spotId}`, options);

    if (response.ok) {
        const data = await response.json();
        console.log('deleteOneSpot thunk', data)
        return data.message;
    }
};

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
        case LOAD_OWNER_SPOTS: {
            // console.log('LOAD_LOAD_OWNER_SPOTS_SPOTS')
            newState = { ...state }
            newState.ownerSpots = action.spots
            return newState;            
        }
        case REMOVE_OWNER_SPOTS: {
            newState = { ...state }
            delete newState.ownerSpots;
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