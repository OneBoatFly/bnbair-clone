import React, { useState, useEffect }  from 'react';
import { Switch, Route } from 'react-router-dom';

import { useDispatch } from "react-redux";

import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import { Spots, SpotDetails } from './components/Spots';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log('isLoaded---', isLoaded)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then((user) => {
      // console.log('restoreUser user---', user)
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div className='root-wrapper'>
      <div className='root-sub-wrapper'>
        <Navigation isLoaded={isLoaded} />
      </div>
      <Switch>
        <Route exact path='/'>
          <div className='root-sub-wrapper'>
            <Spots></Spots>
          </div>      
        </Route>
        <Route path='/spots/:spotId'>
          <SpotDetails></SpotDetails>
        </Route>
        <Route>Page not found.</Route>
      </Switch>
    </div>
  );
}

export default App;
