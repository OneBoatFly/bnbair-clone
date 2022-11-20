import React, { useState, useEffect }  from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";

import * as sessionActions from "./store/session";
// import * as spotsActions from './store/spots';
import Navigation from './components/Navigation';
import { Spots, SpotDetails, OwnerSpots } from './components/Spots';
import UserReviews from './components/Reviews/UserReviews';
import PageNotFound from './components/PageNotFound';
// import useSearchFetch from './components/Navigation/useSearchFetch';

function App() {
  // console.log('0. App component rendered')
  const prevLoaded = window.localStorage.getItem('isLoaded');
  const [isLoaded, setIsLoaded] = useState(prevLoaded);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(sessionActions.userLocation())
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });

  }, [dispatch]);

  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className='root-wrapper'>
      <div className='root-sub-wrapper-navigation'>
        <Navigation isLoaded={isLoaded} setIsLoaded={setIsLoaded} showDropDown={showDropDown} setShowDropDown={setShowDropDown} />
        {/* <Navigation setPage={setPage}  setQuery={setQuery} query={query}  /> */}
      </div>
      <Switch>
        <Route exact path='/'>
          <div className='root-sub-wrapper'>
            <Spots />
            {/* <Spots lastSpotElementRef={lastSpotElementRef} getSpotsErrors={getSpotsErrors} ></Spots> */}
          </div>      
        </Route>
        {isLoaded &&
          <Route exact path='/spots/current'>
            <div className='root-sub-wrapper'>
              <OwnerSpots isLoaded={isLoaded} />
              {/* <OwnerSpots isLoaded={isLoaded} setPage={setPage} hasMore={hasMore}></OwnerSpots> */}
            </div>
          </Route>
        }
        {isLoaded &&
          <Route exact path='/reviews/current'>
            <div className='root-sub-wrapper'>
              <UserReviews isLoaded={isLoaded} />
              {/* <UserReviews isLoaded={isLoaded} setPage={setPage}/> */}
            </div>
          </Route>
        }
        {!isLoaded &&
          <Route exact path='/spots/current'>
            <Redirect to='/' />
          </Route>
        }
        {!isLoaded &&
          <Route exact path='/reviews/current'>
            <Redirect to='/' />
          </Route>
        }  
        <Route exact path='/spots/:spotId'>
          <div className='root-sub-wrapper'>
            <SpotDetails isLoaded={isLoaded} />
            {/* <SpotDetails isLoaded={isLoaded} setPage={setPage}></SpotDetails> */}
          </div>
        </Route>
        <Route>
          <div className='root-sub-wrapper'>
            <PageNotFound />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
