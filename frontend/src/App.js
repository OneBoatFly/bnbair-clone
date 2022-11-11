import React, { useState, useEffect }  from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';

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
      <Navigation isLoaded={isLoaded} />
      {isLoaded && 
        <Switch>
          <Route exact path='/'>
          </Route>
          <Route>Page not found.</Route>
        </Switch>
      }
    </div>
  );
}

export default App;
