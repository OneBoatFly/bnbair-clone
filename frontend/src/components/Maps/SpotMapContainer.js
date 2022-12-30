import { useSelector } from 'react-redux';
import SpotMap from './SpotMap';
import './SpotMapContainer.css'

const SpotMapContainer = ({ spot }) => {
    const key = useSelector((state) => state.maps.key);

    if (!key) {
        return null;
    }

    return (
        <div className='spot-map-container'>
            <SpotMap apiKey={key} spot={spot} />
        </div>
    );
};

export default SpotMapContainer;