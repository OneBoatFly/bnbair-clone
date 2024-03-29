import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Spots, SpotDetails, OwnerSpots } from './components/Spots';
import UserReviews from './components/Reviews/UserReviews';
import PageNotFound from './components/PageNotFound';
import Trips from './components/Trips/Trips';
import MapContainer from './components/Maps/MapContainer';
import { getGeoKey, getKey } from './store/maps';
// import AddSpotImages from './components/Spots/AddSpotImages';
import Reservations from './components/Reservations/Reservations';
import Footer from './components/Footer/Footer';
import MainFormContainer from './components/Spots/MultiCreateForm/MainFormContainer';

function App() {
  const prevLoaded = window.localStorage.getItem('isLoaded');
  const [isLoaded, setIsLoaded] = useState(prevLoaded);
  const [query, setQuery] = useState({});
  const [center, setCenter] = useState({
    lat: 47.6040349,
    lng: -122.3007308,
  });
  const [userCenter, setUserCenter] = useState({});
  const key = useSelector((state) => state.maps.key);
  const geoKey = useSelector((state) => state.maps.geoKey);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }

    if (!geoKey) {
      dispatch(getGeoKey());
    }
  }, [dispatch, key]);

  const successGeo = (position) => {
    setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    setUserCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
  };

  const errorGeo = (error) => {
    console.error(error);
  };

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo, options);
  }, []);

  return (
    <div className='root-wrapper'>
      <div className='root-sub-wrapper-navigation'>
        <Navigation setQuery={setQuery} query={query} isLoaded={isLoaded} setIsLoaded={setIsLoaded} setCenter={setCenter} center={center} userCenter={userCenter} />
      </div>
      <Switch>
        <Route exact path='/'>
          <div className='root-sub-wrapper root-sub-wrapper-with-map'>
            <div className='map-allSpots-wrapper'>
              <Spots setQuery={setQuery} query={query} ></Spots>
              <MapContainer setQuery={setQuery} setCenter={setCenter} center={center} />
            </div>
          </div>
        </Route>
        {isLoaded &&
          <Route exact path='/spots/current'>
            <div className='root-sub-wrapper'>
              <OwnerSpots isLoaded={isLoaded} />
            </div>
          </Route>
        }
        {isLoaded &&
          <Route exact path='/reviews/current'>
            <div className='root-sub-wrapper'>
              <UserReviews isLoaded={isLoaded} />
            </div>
          </Route>
        }
        {isLoaded &&
          <Route exact path='/trips'>
            <div className='root-sub-wrapper'>
              <Trips />
            </div>
          </Route>
        }
        {isLoaded &&
          <Route exact path='/spots/:spotId/bookings'>
            <div className='root-sub-wrapper'>
              <Reservations />
            </div>
          </Route>
        }        
        {/* {isLoaded &&
          <Route exact path='/spots/:spotId/images'>
            <div className='root-sub-wrapper'>
              <AddSpotImages />
            </div>
          </Route>
        } */}
        {isLoaded &&
          <Route exact path='/spots/create'>
            <div className='root-sub-wrapper root-sub-wrapper-with-multi-form'>
              <MainFormContainer />
            </div>
          </Route>
        }       
        {!isLoaded &&
          <Route path={['/spots/current', '/spots/:spotId/bookings', '/reviews/current', '/trips', '/spots/create']}>
            <Redirect to='/' />
          </Route>
        }
        <Route exact path='/spots/:spotId'>
          <div className='root-sub-wrapper'>
            <SpotDetails isLoaded={isLoaded} />
          </div>
        </Route>
        <Route>
          <div className='root-sub-wrapper'>
            <PageNotFound />
          </div>
        </Route>
      </Switch>
      <div className='root-sub-wrapper-footer'>
       <Footer />
      </div>
    </div>
  );
}

export default App;
