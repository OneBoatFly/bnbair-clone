import React, { useState, useEffect }  from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import { useDispatch } from "react-redux";

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('isLoaded---', isLoaded)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then((user) => {
      console.log('restoreUser user---', user)
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div>
      {isLoaded && <Switch>
        <Route exact path='/'>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/signup'>Signup</NavLink>
        </Route>
        <Route path='/login'>
          <LoginFormPage></LoginFormPage>
        </Route>
        <Route path='/signup'>
          <SignupFormPage></SignupFormPage>
        </Route>        
        <Route>Page not found.</Route>
      </Switch>}
    </div>
  );
}

export default App;
