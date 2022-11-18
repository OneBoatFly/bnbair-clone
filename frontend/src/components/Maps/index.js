import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
import Maps from './Maps';
import './Maps.css';

const MapContainer = () => {
    const key = useSelector((state) => state.maps.key);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    if (!key) {
        return null;
    }

    return (
        <div className='home-page-map-container'>
            <Maps apiKey={key} />
        </div>
    );
};

export default MapContainer;