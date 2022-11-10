import React  from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <NavLink to='/login'>Login</NavLink>
        </Route>
        <Route path='/login'>
          <LoginFormPage></LoginFormPage>
        </Route>
        <Route>Page not found.</Route>
      </Switch>
    </div>
  );
}

export default App;
