import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const SpotMap = ({ apiKey, spot }) => {
    const [libraries] = useState(['places']);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries
    });

    console.log('SpotMap Component -------- ')
    console.log('spot:', spot)
    console.log('lat and lng', spot.lat, spot.lng, typeof spot.lat, typeof spot.lng)

    const center = {
        lat: parseFloat(spot.lat),
        lng: parseFloat(spot.lng)
    };

    if (!spot) {
        return null
    }

    return (
        <div className='spot-google-map'>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                >
                <div className='overlay-container'>
                    <OverlayView
                        position={{ lat: spot.lat, lng: spot.lng }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div className='spot-map-house-outer'>
                            <button className='spot-map-house-inner'>
                                <div className='spot-map-label-box'>Exact location provided after booking.</div>
                                <div className='spot-map-label-pointer'></div>
                                <div className='spot-map-icon-container'>
                                    <i className="fa-solid fa-house spot-map-house-icon"></i>
                                    <i className="fa-brands fa-airbnb spot-map-airbnb-icon"></i>
                                </div>
                            </button>
                        </div>
                    </OverlayView>
                </div>
                </GoogleMap>
            )}
        </div>
    );
};

export default React.memo(SpotMap);