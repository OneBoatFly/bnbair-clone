import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import './SpotImageSlider.css'

export default function SpotImageSlider({ previewImage, imageWidth, imageHeight }) {
    console.log(imageWidth, imageHeight, '--------SpotImageSlider')

    return (
        <SimpleImageSlider
            width={imageWidth}
            height={imageHeight}
            images={previewImage}
            showBullets={true}
            showNavs={true}
            navSize={25}
            navStyle={2}
        />
    );
}
