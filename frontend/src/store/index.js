import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from './session';
import spotsReducer from "./spots";
import spotsImageReducer from './spotImages';
import spotsReviewReducer from './spotReviews';
import bookingsReducer from './bookings';

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  spots: spotsReducer,
  spotIamges: spotsImageReducer,
  spotReviews: spotsReviewReducer,
  bookings: bookingsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  // console.log('prelaodedState >>>', preloadedState)
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
