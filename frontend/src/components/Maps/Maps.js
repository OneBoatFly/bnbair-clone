import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
};

const center = {
    lat: 47.6040349,
    lng: -122.3007308,
};

const Maps = ({ apiKey }) => {
    const [libraries] = useState(['places']);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries
    });

    return (
        <div className='google-map'>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={11}
                />
            )}
        </div>
    );
};

export default React.memo(Maps);