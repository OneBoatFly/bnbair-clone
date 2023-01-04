import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid';

import './AddSpotImages.css';

import MyButton from '../FormElements/MyButton';

import * as spotIamgesActions from '../../store/spotImages';
import { useParams } from 'react-router-dom';
import { getOneSpot } from '../../store/spots';

export default function AddSpotImages() {
    // console.log('---------AddSpotImages Component ---------')
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.spotDetails);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [imageUrlArr, setImageUrlArr] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [error, setError] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        console.log('------handleDrop----')
        e.preventDefault();
        setError('')
        const previewImages = Array.from(e.dataTransfer.files)

        const validPreviewImages = previewImages.filter(file => {
            if (file.type !== 'image/webp') setError('Files that are not .webp type are excluded.')
            return file.type === 'image/webp'
        })

        setImageUpload(prev => [...prev, ...validPreviewImages])

        validPreviewImages.forEach((image) => {
            setImageUrlArr(prev => [...prev, URL.createObjectURL(image)])
        })
    };

    const handleSelect = (e) => {
        console.log('-------handleSelect---') // e.target.files
        e.preventDefault();
        setError('')
        const previewImages = Array.from(e.target.files)
        console.log('previewImages', previewImages)

        const validPreviewImages = previewImages.filter(file => {
            return file.type === 'image/webp'
        })

        setImageUpload(prev => [...prev, ...validPreviewImages])

        validPreviewImages.forEach((image) => {
            setImageUrlArr(prev => [...prev, URL.createObjectURL(image)])
        })        
    }

    const handleFetchExistingImages = () => {
        const imageFolderRef = ref(storage, `spots/${spotId}`)
        listAll(imageFolderRef)
            .then((response) => {
                response.items.forEach(item => {
                    getDownloadURL(item).then(url => {
                        setImageUrlArr(arr => [...arr, url])
                    })
                })
            })
            .catch(e => {
            })
    }

    const handleSubmit = (e) => {
        if (!imageUpload.length) {
            setError('No photos selected.')
            return;
        }

        imageUpload.forEach((image, idx) => {
            const imageRef = ref(storage, `spots/${spotId}/${image.name + v4()}`)
            uploadBytes(imageRef, image)
                .then((snapshot) => {
                    const allTimeArr = [...imageUrlArr];
                    getDownloadURL(snapshot.ref).then(url => {
                        // console.log('uploading --- grabing url', url)
                        // setImageUrlArr(arr => [...arr, url])
                        allTimeArr.push(url);
                        const isPreview = idx <= 5 - allTimeArr.length;

                        dispatch(spotIamgesActions.addImages({
                            url: url,
                            preview: isPreview
                        }, spotId))
                    })
                })
                .catch((e) => {
                    console.log('uploading --- error', e.code)
                    setError(e.code)
                })
        })
    }

    
    useEffect(() => {
        // handleFetchExistingImages();
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        if (!spot) return;
        const existingImages = spot.SpotImages;
        const existingImageUrls = existingImages?.map(img => img.url);

        setImageUrlArr(existingImageUrls)
    }, [dispatch, spot])

    const history = useHistory();
    const handleBackToSpot = () => {
        history.push(`/spots/current`)
    }

    // console.log('------- imageUpload', imageUpload)
    // console.log('------- imageUrlArr', imageUrlArr)

  return (
    <div className='image-wrapper'>
        <div className='head-buttons-wrapper'>
            <i className="fa-solid fa-chevron-left all-photos add-photos-backicon" onClick={handleBackToSpot}></i>
            <h3>Add some photos of your house</h3>
        </div>
        <div className='button-wrapper'>
            {error.length > 0 && 
                <div className='error-messages-wrapper'>
                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                    <span className='error-messages'>{error}</span>
                </div>
            }
            <div className='image-upload-button' onClick={handleSubmit}>
                <MyButton name='Upload' ></MyButton>
            </div>
        </div>
        <div 
            className='drag-and-drap-wrapper' 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <svg className='drag-drop-icon'>
                <path d="M41.636 8.404l1.017 7.237 17.579 4.71a5 5 0 0 1 3.587 5.914l-.051.21-6.73 25.114A5.002 5.002 0 0 1 53 55.233V56a5 5 0 0 1-4.783 4.995L48 61H16a5 5 0 0 1-4.995-4.783L11 56V44.013l-1.69.239a5 5 0 0 1-5.612-4.042l-.034-.214L.045 14.25a5 5 0 0 1 4.041-5.612l.215-.035 31.688-4.454a5 5 0 0 1 5.647 4.256zm-20.49 39.373l-.14.131L13 55.914V56a3 3 0 0 0 2.824 2.995L16 59h21.42L25.149 47.812a3 3 0 0 0-4.004-.035zm16.501-9.903l-.139.136-9.417 9.778L40.387 59H48a3 3 0 0 0 2.995-2.824L51 56v-9.561l-9.3-8.556a3 3 0 0 0-4.053-.009zM53 34.614V53.19a3.003 3.003 0 0 0 2.054-1.944l.052-.174 2.475-9.235L53 34.614zM48 27H31.991c-.283.031-.571.032-.862 0H16a3 3 0 0 0-2.995 2.824L13 30v23.084l6.592-6.59a5 5 0 0 1 6.722-.318l.182.159.117.105 9.455-9.817a5 5 0 0 1 6.802-.374l.184.162L51 43.721V30a3 3 0 0 0-2.824-2.995L48 27zm-37 5.548l-5.363 7.118.007.052a3 3 0 0 0 3.388 2.553L11 41.994v-9.446zM25.18 15.954l-.05.169-2.38 8.876h5.336a4 4 0 1 1 6.955 0L48 25.001a5 5 0 0 1 4.995 4.783L53 30v.88l5.284 8.331 3.552-13.253a3 3 0 0 0-1.953-3.624l-.169-.05L28.804 14a3 3 0 0 0-3.623 1.953zM21 31a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM36.443 6.11l-.175.019-31.69 4.453a3 3 0 0 0-2.572 3.214l.02.175 3.217 22.894 5.833-7.74a5.002 5.002 0 0 1 4.707-4.12L16 25h4.68l2.519-9.395a5 5 0 0 1 5.913-3.587l.21.051 11.232 3.01-.898-6.397a3 3 0 0 0-3.213-2.573zm-6.811 16.395a2 2 0 0 0 1.64 2.496h.593a2 2 0 1 0-2.233-2.496zM10 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#222"></path>
            </svg>
            <span className='drag-drop-title'>Drag your photos here</span>
            <span className='drag-drop-comment' >Accepts .webp only.</span>
            <input 
                id='image-add-photo'
                type='file' 
                accept="image/webp"
                multiple 
                ref={inputRef}
                onChange={(e) => {
                    handleSelect(e)
                }}
            />
            <button className='image-input-button' onClick={() => inputRef.current.click()}>Select Photos</button>
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
