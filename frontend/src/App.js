import React, { useState, useEffect }  from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import { useDispatch } from "react-redux";

import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(isLoaded)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then((user) => {
      console.log('restoreUser user', user)
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div>
      {isLoaded && <Switch>
        <Route exact path='/'>
          <NavLink to='/login'>Login</NavLink>
        </Route>
        <Route path='/login'>
          <LoginFormPage></LoginFormPage>
        </Route>
        <Route>Page not found.</Route>
      </Switch>}
    </div>
  );
}

export default App;
