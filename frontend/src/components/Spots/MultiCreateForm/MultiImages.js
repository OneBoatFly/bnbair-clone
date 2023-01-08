import React, { useEffect, useRef, useState } from 'react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import * as spotIamgesActions from '../../../store/spotImages';
import MyButton from '../../FormElements/MyButton';

import './MultiImages.css';

export default function MultiImages({ formData, setImageError, imageUpload, setImageUpload }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  let spot = useSelector(state => state.spots.spotDetails);
  const [imageUrlArr, setImageUrlArr] = useState([]);
  // const [imageUpload, setImageUpload] = useState([]);
  const [databaseUrlArr, setDatabaseUrlArr] = useState([]);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const validFileType = (file) => {
    return file.type === 'image/webp' || file.type === 'image/png' || file.type === 'image/jpeg'
  }

  const handleDrop = (e) => {
    console.log('------handleDrop----')
    e.preventDefault();

    const previewImages = Array.from(e.dataTransfer.files);
    if (imageUrlArr.length + previewImages.length > 6) {
      setError('Maximum of 6 images allowed');
      return
    }

    setError('');

    const validPreviewImages = previewImages.filter(file => {
      if (!validFileType(file)) setError('Files that are not .webp, .png, .jpeg type are excluded.')
      return validFileType(file)
    })

    setImageUpload(prev => [...prev, ...validPreviewImages])
    validPreviewImages.forEach((image) => {
      setImageUrlArr(prev => [...prev, { url: URL.createObjectURL(image) }])
    })
  };

  const handleSelect = (e) => {
    console.log('-------handleSelect---') // e.target.files
    e.preventDefault();

    const previewImages = Array.from(e.target.files)
    if (imageUrlArr.length + previewImages.length > 6) {
      setError('Maximum of 6 images allowed');
      return
    }

    setError('');

    const validPreviewImages = previewImages.filter(file => {
      // console.log(file.type, validFileType(file))
      return validFileType(file)
    })

    setImageUpload(prev => [...prev, ...validPreviewImages])
    validPreviewImages.forEach((image) => {
      setImageUrlArr(prev => [...prev, { url: URL.createObjectURL(image) }])
    })
  }

  const handleSubmit = (e) => {
    if (!imageUpload.length) {
      setError('No photos selected.')
      return;
    }

    setImageError('');
    imageUpload.forEach((image, idx) => {
      const imageRef = ref(storage, `spots/${formData.spotId}/${image.name + v4()}`)
      uploadBytes(imageRef, image)
        .then((snapshot) => {
          // const allTimeArr = [...databaseUrlArr];
          console.log('--------- databaseUrlArr ----------', databaseUrlArr)
          getDownloadURL(snapshot.ref).then(url => {
            setImageUpload([])
            const isPreview = databaseUrlArr.length >= 5 ? false : idx < 5 - databaseUrlArr.length;
            console.log('--- isPreview', isPreview, idx, databaseUrlArr.length)
            // allTimeArr.push(url);
            // console.log('--------- getDownloadURL ----------', allTimeArr)

            dispatch(spotIamgesActions.addImages({
              url: url,
              preview: isPreview
            }, formData.spotId)).then(() => {
              setShowSuccess(true)
              setTimeout(() => {
                setShowSuccess(false)
              }, 4000)
            })
          })
        })
        .catch((e) => {
          setError(e.code)
        })
    })
  }


  const handleDelete = (img, idx) => {

    if (img.id && img.url.includes('firebase')) {
      const imageRef = ref(storage, img.url)
      deleteObject(imageRef).then(() => {
        dispatch(spotIamgesActions.deleteImage(img.id, formData.spotId))
      }).catch((e) => {
        setError(e.code)
      })
    } else if (img.id) {
      dispatch(spotIamgesActions.deleteImage(img.id, formData.spotId))
    } else {
      const currentUrlArr = [...imageUrlArr];
      currentUrlArr.splice(idx, 1)
      setImageUrlArr([...currentUrlArr])
    }
  }

  useEffect(() => {
    if (!spot) return;

    const existingImages = spot.SpotImages || [];
    setImageUrlArr(existingImages);
    setDatabaseUrlArr(existingImages);

    return () => {
      setImageUrlArr([]);
      setDatabaseUrlArr([]);
    }
  }, [dispatch, spot])

  // useEffect(() => {

  // }, [imageUrlArr])


  // console.log('------- imageUpload', imageUpload)
  // console.log('------- imageUrlArr', imageUrlArr)
  // console.log('------- success', success)
  // console.log('----spot', spot)
  // console.log('--imageUrlArr', imageUrlArr)

  return (
    <div className='image-wrapper'>
      <div className='button-wrapper'>
        {showSuccess &&
          <span className='fade-in-out'>Images successfully uploaded.</span>
        }
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
      {imageUrlArr.length >= 6 ? 
        <div>Maximum of 6 photos allowed.</div>
        :
        <div
          className='drag-and-drap-wrapper'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <svg className='drag-drop-icon'>
            <path d="M41.636 8.404l1.017 7.237 17.579 4.71a5 5 0 0 1 3.587 5.914l-.051.21-6.73 25.114A5.002 5.002 0 0 1 53 55.233V56a5 5 0 0 1-4.783 4.995L48 61H16a5 5 0 0 1-4.995-4.783L11 56V44.013l-1.69.239a5 5 0 0 1-5.612-4.042l-.034-.214L.045 14.25a5 5 0 0 1 4.041-5.612l.215-.035 31.688-4.454a5 5 0 0 1 5.647 4.256zm-20.49 39.373l-.14.131L13 55.914V56a3 3 0 0 0 2.824 2.995L16 59h21.42L25.149 47.812a3 3 0 0 0-4.004-.035zm16.501-9.903l-.139.136-9.417 9.778L40.387 59H48a3 3 0 0 0 2.995-2.824L51 56v-9.561l-9.3-8.556a3 3 0 0 0-4.053-.009zM53 34.614V53.19a3.003 3.003 0 0 0 2.054-1.944l.052-.174 2.475-9.235L53 34.614zM48 27H31.991c-.283.031-.571.032-.862 0H16a3 3 0 0 0-2.995 2.824L13 30v23.084l6.592-6.59a5 5 0 0 1 6.722-.318l.182.159.117.105 9.455-9.817a5 5 0 0 1 6.802-.374l.184.162L51 43.721V30a3 3 0 0 0-2.824-2.995L48 27zm-37 5.548l-5.363 7.118.007.052a3 3 0 0 0 3.388 2.553L11 41.994v-9.446zM25.18 15.954l-.05.169-2.38 8.876h5.336a4 4 0 1 1 6.955 0L48 25.001a5 5 0 0 1 4.995 4.783L53 30v.88l5.284 8.331 3.552-13.253a3 3 0 0 0-1.953-3.624l-.169-.05L28.804 14a3 3 0 0 0-3.623 1.953zM21 31a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM36.443 6.11l-.175.019-31.69 4.453a3 3 0 0 0-2.572 3.214l.02.175 3.217 22.894 5.833-7.74a5.002 5.002 0 0 1 4.707-4.12L16 25h4.68l2.519-9.395a5 5 0 0 1 5.913-3.587l.21.051 11.232 3.01-.898-6.397a3 3 0 0 0-3.213-2.573zm-6.811 16.395a2 2 0 0 0 1.64 2.496h.593a2 2 0 1 0-2.233-2.496zM10 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#222"></path>
          </svg>
          <span className='drag-drop-title'>Drag your photos here</span>
          <span className='drag-drop-comment' >Accepts .webp, .png or .jpeg only.</span>
          <input
            id='image-add-photo'
            type='file'
            accept="image/webp image/png image/jpeg"
            multiple
            ref={inputRef}
            onClick={(e) => {
              e.target.value = null
            }}
            onChange={(e) => {
              handleSelect(e)
            }}
          />
          <span className='upload-from-device' onClick={() => inputRef.current.click()}>Upload from your device</span>
        </div>
      }
      <div className='image-upload-photos'>
        <div className='image-upload-photos-sub'>
          {imageUrlArr?.map((img, idx) => {
            const big = idx % 3 === 0 ? 'single-image-div-big' : 'single-image-div-small'
            return (
              <div key={idx} className={`upload-image-single-div ${big}`}>
                <img src={`${img?.url}`} alt='room' />
                <i className="fa-solid fa-trash single-image-div-delete-icon" onClick={() => handleDelete(img, idx)}></i>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
