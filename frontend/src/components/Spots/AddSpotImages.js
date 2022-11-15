import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AddSpotImages.css';

import MyButton from '../FormElements/MyButton';

import * as spotIamgesActions from '../../store/spotImages';

export default function AddSpotImages({spotid}) {
    const [images, setImages] = useState({});
    const [imageUrls, setImageUrls] = useState({});
    const [imageUrlArr, setImageUrlArr] = useState([]);

    const [previewId, setPreviewId] = useState('');

    const handleImageUpload = (e) => {
        console.log(e.target.files, typeof e.target.files)
        const images = Object.values(e.target.files);

        const imageObj = {};

        images.forEach((img) => {
            console.log('img from e.target.file')
            console.log(img, typeof img)
            console.log(img.name)
            imageObj[img.name] = img
        });

        setImages(imageObj);
    }

    // const handleDelete = (e) => {
    //     console.log('handleDelete event.target >>>', e.target, e.target.id);
    //     console.log('handleDelete event.currentTarget >>>', e.currentTarget, e.currentTarget.id);
    //     console.log('images', images)
    //     setImages((images) => {
    //         delete images[e.currentTarget.id];
    //     })
    //     // console.log('imageUrls', imageUrls)
    //     // setImageUrls((imageUrls) => {
    //     //     delete imageUrls[e.currentTarget.id];
    //     // })
    // }

    const dispatch = useDispatch();
    useEffect(() => {
        if (!images) return;
        if (!Object.values(images).length) return;

        const newImageUrls = {};
        console.log('images ---', images)

        for (let name in images) {
            const image = images[name];
            console.log('each image ---', image)
            newImageUrls[name] = {
                imgUrl: URL.createObjectURL(image),
                name: name
            };
        }

        console.log('imageUrls ---', newImageUrls);
        setImageUrls(newImageUrls);
        // window.localStorage.setItem('images', images);
    }, [images])

    useEffect(() => {
        if (imageUrls) {
            const imageUrlsOnly = Object.values(imageUrls);
            const imageUrlswithPreview = imageUrlsOnly.map((image, idx) => {
                console.log(idx)
                return {
                    url: image.imgUrl,
                    preview: previewId == idx + 1
                }
            })

            setImageUrlArr(imageUrlswithPreview);
        }
        else setImageUrlArr([]);

    }, [imageUrls]);

    // console.log('AddSpotImages watch on images', images);
    // console.log('AddSpotImages watch on imageUrls', imageUrls);
    console.log('AddSpotImages urls to map', imageUrlArr);
    console.log('previewId', previewId)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit image fired', imageUrlArr, spotid)
        dispatch(spotIamgesActions.addImages(imageUrlArr, spotid));
    }

  return (
    <div className='image-wrapper'>
        <div className='image-form-wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='image-input-wrapper'>
                    <label htmlFor='image'>Upload Images</label>
                    <input id='image' type='file' multiple accept='image/*' onChange={handleImageUpload} />
                </div>
                {imageUrlArr.length > 0 &&
                    <select name='preview-image' value={previewId} onChange={(e) => setPreviewId(e.target.value)}>
                        <option value=''>Please select a preview image...</option>
                        {imageUrlArr.map((image, idx) => {
                            return (
                                <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                            )
                        })}
                    </select>
                }
                <button>Add images</button>
            </form>
        </div>
        <div className='loaded-images-wrapper'>
            {imageUrlArr.length > 0 && 
                imageUrlArr.map((image, idx) => {
                    return (
                        <div key={idx}>
                            <img src={image.url} alt='uploads' />
                            {/* <span className='upload-delete' id={image.name} onClick={(e) => handleDelete(e)}><i className="fa-solid fa-trash"></i></span> */}
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
