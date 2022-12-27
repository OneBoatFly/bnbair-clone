import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';

import './AddSpotImages.css';

import MyButton from '../FormElements/MyButton';

import * as spotIamgesActions from '../../store/spotImages';
import { useParams } from 'react-router-dom';

export default function AddSpotImages() {
    console.log('---------AddSpotImages Component ---------')
    const { spotId } = useParams();
    const [imageUrlArr, setImageUrlArr] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        if (imageUpload === null) {
            return;
        }

        for (let image of imageUpload) {
            const imageRef = ref(storage, `spots/${spotId}/${image.name + v4()}`)
            uploadBytes(imageRef, image)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then(url => {
                        // console.log('uploading --- grabing url', url)
                        setImageUrlArr(arr => [...arr, url])
                        dispatch(spotIamgesActions.addImages({
                            url: url,
                            preview: false
                        }, spotId))
                    })
                })
                .catch((e) => {
                    // console.log('uploading --- error', e)
                })
        }
    }

    const imageFolderRef = ref(storage, `spots/${spotId}`)
    useEffect(() => {
        listAll(imageFolderRef)
            .then((response) => {
                // console.log('add spot image --- listAll response ---', response)
                response.items.forEach(item => {
                    getDownloadURL(item).then(url => {
                        setImageUrlArr(arr => [...arr, url])
                    })
                })
            })
            .catch(e => {
                // console.log('add spot image --- listAll error ---', e)
            })
    }, [])

    const history = useHistory();
    const handleBackToSpot = () => {
        history.push(`/spots/${spotId}`)
    }

  return (
    <div className='image-wrapper'>
        <div className='head-buttons-wrapper'>
            <i className="fa-solid fa-chevron-left all-photos" onClick={handleBackToSpot}></i>
            <h3>Add some photos of your house</h3>
        </div>
        <div className='button-wrapper'>
            <div className='image-input-wrapper image-upload-button'>
                <label htmlFor='image-add-photo'>Add</label>
                <input id='image-add-photo' type='file' multiple onChange={(e) => setImageUpload(e.target.files)} />
            </div>
            <div className='image-upload-button' onClick={handleSubmit}>
                <MyButton name='Upload' ></MyButton>
            </div>
        </div>
        <div className='image-upload-photos'>
            <div className='image-upload-photos-sub'>
                {imageUrlArr.map((url, idx) => {
                    const big = idx % 3 === 0 ? 'single-image-div-big' : 'single-image-div-small'
                    return (
                        <div key={idx} className={big}>
                            <img src={`${url}`} alt='room' />
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
