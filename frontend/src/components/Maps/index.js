import { useSelector } from 'react-redux';

import Maps from './Maps';
import './Maps.css';

const MapContainer = ({ setQuery }) => {
    const key = useSelector((state) => state.maps.key);

    if (!key) {
        return null;
    }

    return (
        <div className='home-page-map-container'>
            <Maps apiKey={key} setQuery={setQuery} />
        </div>
    );
};

export default MapContainer;