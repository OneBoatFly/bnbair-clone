import React, { useEffect, useState } from 'react';
import './WhereQuery.css';
import { getBoundsOfDistance } from 'geolib';

import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

import PlacesAutocomplete from 'react-places-autocomplete';
import { useJsApiLoader } from '@react-google-maps/api';


export default function WhereQuery({ apiKey, hasSubmitted, errors, setErrors, minLat, setMinLat, maxLat, setMaxLat, minLng, setMinLng, maxLng, setMaxLng, setCenter, center }) {
    // console.log('------------- WhereQuery --------------')
    const [address, setAddress] = useState('')

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        // console.log('--- in handleSelect')
        // console.log(value) // Seattle, WA, USA
        // console.log(latLng) // {lat: 47.6062095, lng: -122.3320708}

        setAddress(value)
        setCenter(latLng)

        const bounds = getBoundsOfDistance({ latitude: latLng.lat, longitude: latLng.lng }, 500000);

        setMinLat(bounds[0].latitude)
        setMinLng(bounds[0].longitude)
        setMaxLat(bounds[1].latitude)
        setMaxLng(bounds[1].longitude)
    }

    const [libraries] = useState(['places']);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries
    });

    // console.log('------ address ------', address)
    // console.log('------ coordinates ------', coordinates)
    // console.log('------ minLat ------', minLat)
    // console.log('------ minLng ------', minLng)
    // console.log('------ maxLat ------', maxLat)
    // console.log('------ maxLng ------', maxLng)    

    return (
        <div className='where-query-wrapper' >
            <div className='where-search-wrapper'>
                {isLoaded &&
                    <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                        searchOptions={{ 'types': ['locality']}}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className='where-search-auto-complete'>
                                <span>where</span>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search destinations ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container" >
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion, idx) => {
                                        const className = suggestion.active
                                            ? `where-query-drop-down suggestion-item--active ${idx === 0 ? 'first' : ''} ${idx === suggestions.length - 1 ? 'last' : ''}`
                                            : `where-query-drop-down suggestion-item ${idx === 0 ? 'first' : ''} ${idx === suggestions.length - 1 ? 'last' : ''}`;
                                        return (
                                            <div key={suggestion.placeId}
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                })}
                                            >
                                                <button className='where-query-drop-down auto-search-location-button'>
                                                    <i className="where-query-drop-down fa-solid fa-location-dot"></i>
                                                </button>
                                                <span className='where-query-drop-down auto-suggest-span'>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                }
            </div>
            {/* {hasSubmitted && weekErrorsArr.map((err, idx) => {
                return (
                    <div key={idx} className='error-messages-wrapper'>
                        <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                        <span className='error-messages'>{err}</span>
                    </div>
                )
            })} */}
        </div>
    )
}
