import { async } from '@firebase/util';
import { csrfFetch } from './csrf';
import * as spotsActions from './spots';

// regular actions

// thunk actions
export const addImages = (imageInfo, spotId) => async (dispatch) => {
    // console.log('add image thunk ---- ')
    // console.log('imageUrls', imageInfo)
    // console.log('spotid', spotId)
    const options = {
        method: 'POST',
        body: JSON.stringify({
            url: imageInfo.url,
            preview: imageInfo.preview
        })
    }

    const response = await csrfFetch(`/api/spots/${spotId}/images`, options);

    if (response.ok) {
        const data = await response.json();
        // console.log('response ok - data', data)
        // dispatch(spotsActions.getOneSpot(spotId));
        return data;
    }
}

export const deleteImage = (imageId, spotId) => async (dispatch) => {
    // console.log('delete image thunk ---- ')
    // console.log('imageId', imageId)
    const options = {
        method: 'DELETE',
    }

    const response = await csrfFetch(`/api/spot-images/${imageId}`, options);

    if (response.ok) {
        const data = await response.json();
        dispatch(spotsActions.getOneSpot(spotId));
        return data;
    }    
}

const initalState = {};

const spotsImageReducer = (state = initalState, action) => {
    // console.log(action)
    // console.log('*spotImage reducer: current state ------------ ', state)
    let newState;
    switch (action.type) {
        // case HOLD_IMAGES: {
        //     console.log('HOLD_IMAGES')
        //     newState = { ...state }
        //     newState.allSpots = action.imageUrls
        //     return newState;
        // }
        default: {
            // console.log('spots reducer DEFAULT')
            return state;
        }
    }
};

export default spotsImageReducer;
