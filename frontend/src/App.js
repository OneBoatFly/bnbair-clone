import React, { useState, useEffect, useCallback, useRef }  from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "./store/session";
// import * as spotsActions from './store/spots';
import Navigation from './components/Navigation';
import { Spots, SpotDetails, OwnerSpots } from './components/Spots';
import UserReviews from './components/Reviews/UserReviews';
import PageNotFound from './components/PageNotFound';
import useSearchFetch from './components/Navigation/useSearchFetch';

function App() {
  console.log('0. App component rendered')
  const prevLoaded = window.localStorage.getItem('isLoaded');
  const [isLoaded, setIsLoaded] = useState(prevLoaded);
  
  // console.log('isLoaded', isLoaded)
  // const sessionUser = useSelector(state => state.session.user);
  
  // const spots = useSelector(state => state.spots.allSpots);
  const pagination = useSelector(state => state.spots.pagination);

  let hasMore = false;
  if (pagination) hasMore = pagination.spotsFound - pagination.page * pagination.size > 0;

  const [page, setPage] = useState(1);
  // console.log('page', page)
  const [query, setQuery] = useState({});
  // console.log('query', query)
  const { loading, getSpotsErrors } = useSearchFetch(query);
  // console.log('query', query)
  // console.log(loading, getSpotsErrors, hasMore)
  // console.log('__________________________________________________')

  useEffect(() => {
    setQuery((query => {
      const newQuery = {...query};
      newQuery.page = page;
      return newQuery;
    }))
  }, [page])

  const observer = useRef();
  const lastSpotElementRef = useCallback(node => {
    if (loading) {
        // console.log('is loading? ', loading);
        return;
    }

    if (observer.current) {
      // console.log('there is an observer: ', observer.current);
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // console.log('Visible -----------------')
        setPage(prev => prev + 1);
      }
    })

    if (node) {
      // console.log('lastSpotElementRef')
      // console.log(node)
      observer.current.observe(node)
    }

  }, [loading, hasMore])

  // end of infinite scroll setting

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });

    // dispatch(spotsActions.getAllSpots());
  }, [dispatch]);
  
  return (
    <div className='root-wrapper'>
      <div className='root-sub-wrapper-navigation'>
        <Navigation isLoaded={isLoaded} setIsLoaded={setIsLoaded} setQuery={setQuery} query={query} />
      </div>
      <Switch>
        <Route exact path='/'>
          <div className='root-sub-wrapper'>
            {/* <Spots ></Spots> */}
            <Spots lastSpotElementRef={lastSpotElementRef} getSpotsErrors={getSpotsErrors} ></Spots>
          </div>      
        </Route>
        {isLoaded &&
          <Route path='/spots/current'>
            <div className='root-sub-wrapper'>
              <OwnerSpots isLoaded={isLoaded}></OwnerSpots>
            </div>
          </Route>
        }
        {isLoaded &&
          <Route path='/reviews/current'>
            <div className='root-sub-wrapper'>
              <UserReviews isLoaded={isLoaded} />
            </div>
          </Route>
        }
        {!isLoaded &&
          <Route path='/spots/current'>
            <Redirect to='/' />
          </Route>
        }
        {!isLoaded &&
          <Route path='/reviews/current'>
            <Redirect to='/' />
          </Route>
        }  
        <Route path='/spots/:spotId'>
          <div className='root-sub-wrapper'>
            <SpotDetails isLoaded={isLoaded}></SpotDetails>
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
