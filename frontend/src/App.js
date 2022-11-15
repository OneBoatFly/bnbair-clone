import React, { useState, useEffect }  from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "./store/session";
import * as spotsActions from './store/spots';
import Navigation from './components/Navigation';
import { Spots, SpotDetails, OwnerSpots } from './components/Spots';
import UserReviews from './components/Reviews/UserReviews';

function App() {
  // console.log('0. App component rendered')
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots.allSpots);
  
  // const [userCoord, setUserCoord] = useState({});
  // const getCord = async () => {
  //   await navigator.geolocation.getCurrentPosition((location) => setUserCoord(location.coords))
  // };
  // getCord();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });

    dispatch(spotsActions.getAllSpots());
  }, [dispatch]);

  console.log("isLoaded", isLoaded)
  console.log('sessionUser', sessionUser)
  
  return (
    <div className='root-wrapper'>
      <div className='root-sub-wrapper-navigation'>
        <Navigation isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      </div>
      <Switch>
        <Route exact path='/'>
          <div className='root-sub-wrapper'>
            <Spots spots={spots} ></Spots>
          </div>      
        </Route>
        {isLoaded && sessionUser &&
          <Route path='/spots/current'>
            <div className='root-sub-wrapper'>
              <OwnerSpots isLoaded={isLoaded}></OwnerSpots>
            </div>
          </Route>
        }
        {isLoaded && sessionUser &&
          <Route path='/reviews/current'>
            <div className='root-sub-wrapper'>
              <UserReviews isLoaded={isLoaded} />
            </div>
          </Route>
        }        
        <Route path='/spots/:spotId'>
          <div className='root-sub-wrapper'>
            <SpotDetails isLoaded={isLoaded}></SpotDetails>
          </div>
        </Route>
        <Route>Page not found.</Route>
      </Switch>
    </div>
  );
}

export default App;
