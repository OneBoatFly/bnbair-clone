import React from 'react';
import './AddProfileImage.css';

export default function AddProfileImage({ imageUrl, setImageUrl, setImageUpload, imageError, setImageError }) {
    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setImageError('')

        // console.log(e.dataTransfer.files[0].type)
        if (e.dataTransfer.files[0].type !== 'image/webp' && e.dataTransfer.files[0].type !== 'image/png') {
            setImageError('Accepts .webp or .png only.');
            return;
        }

        setImageUpload(e.dataTransfer.files[0])
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]))
    };


    return (
        <div className='profile-image-wrapper'>                  
            <div
                className='profile-drag-and-drap-wrapper'
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    id='profile-add-photo'
                    type='file'
                    accept="image/webp image/png"
                    hidden
                />
                {imageUrl.length > 0 ?
                    <img className='profile-image-preview' src={imageUrl} alt=''/>
                    :
                    <i className="fa-regular fa-user"></i>
                }
            </div>
            {imageError.length > 0 &&
                <div className='imageerror-messages-wrapper'>
                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                    <span className='imageerror-messages'>{imageError}</span>
                </div>
            }      
        </div>
    )
}
