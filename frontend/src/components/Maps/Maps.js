import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 81px + 24px)',
    position: 'absolute',
    top: '-24px',
    left: '0',
};

const Maps = ({ apiKey }) => {
    const [spotInfoArr, setSpotInfoArr] = useState([]);
    const [center, setCenter] = useState({
        lat: 47.6040349,
        lng: -122.3007308,
    })
    const spots = useSelector(state => state.spots.allSpots);
    const [libraries] = useState(['places']);    

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries
    });

    let spotsArr = [];
    if (spots) spotsArr = Object.values(spots);

    useEffect(() => {
        const spotInfo = []
        for (let spot of spotsArr) {
            spotInfo.push({ lat: spot.lat, lng:spot.lng, price:spot.price, id: spot.id })
        }

        setSpotInfoArr(spotInfo)

        return () => {
            setSpotInfoArr([])
        }
    }, [spots])
    
    const history = useHistory();
    const handleClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    // console.log('---- Maps Component ----', coordinates)


    const successGeo = (position) => {
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
    }

    const errorGeo = (error) => {
        // console.log(error);
    };

    const options = {
        enableHighAccuracy: true,
        timeout: 3000,
    }

    navigator.geolocation.getCurrentPosition(successGeo, errorGeo, options)

    return (
        <div className='google-map'>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={11}
                >
                {spotInfoArr.map(spot => {
                    console.log(spot)
                    return (
                        <div key={spot.id} className='overlay-container'>
                            <OverlayView
                                position={{ lat: spot.lat, lng: spot.lng }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                                <button onClick={() => handleClick(spot.id)} className='overlay-button'>${parseFloat((spot.price).toFixed(0)).toLocaleString()}</button>
                            </OverlayView>
                        </div>
                    )
                })}
                </GoogleMap>
            )}
        </div>
    );
};

export default React.memo(Maps);