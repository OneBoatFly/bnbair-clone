import { useSelector } from 'react-redux';

import Maps from './Maps';
import './Maps.css';

const MapContainer = () => {
    const key = useSelector((state) => state.maps.key);

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