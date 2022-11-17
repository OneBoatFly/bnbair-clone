import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';

import './AddSpotImages.css';

import MyButton from '../FormElements/MyButton';

import * as spotIamgesActions from '../../store/spotImages';

export default function AddSpotImages({ spotId, setShowAddImageForm }) {
    // console.log('AddSpotImages')
    
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(imageUrl)
        // console.log('valid url', validator.isURL(imageUrl))
        if (!imageUrl.length || !validator.isURL(imageUrl)) setErrors('A valid preview image url is required');
        else setErrors('');

    }, [imageUrl])


    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (errors) {
            console.log('has errors', errors);
            return;
        }

        const imageUrlArr = [
            {
                url: imageUrl,
                preview: false
            }
        ]

        // console.log(spotId)
        dispatch(spotIamgesActions.addImages(imageUrlArr, spotId))
            .then(() => {
                setHasSubmitted(false);
                setShowAddImageForm(false);
            })
    }

  return (
    <div className='image-wrapper'>
        <div className='login exit-button-wrapper'>
            <div className='login exit-button-div' onClick={() => setShowAddImageForm(false)}>
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div className='image-form-wrapper'>
            <div className='upload-image-header'>
                <h3>Upload images url</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='image-input-wrapper'>
                    <input id='image-url' type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <div className='errors' style={{ marginTop: '4px', marginBottom: '4px' }}>
                {
                    hasSubmitted && errors.length > 0 && (
                        <div className='error-messages-wrapper'>
                            <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                            <span className='error-messages'>{errors}</span>
                        </div>
                    )
                }
                </div>
                <MyButton name='Upload images'></MyButton>
            </form>
        </div>
    </div>
  )
}
