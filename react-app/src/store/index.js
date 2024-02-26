import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import projectReducer from "./projects";
import tasksReducer from "./tasks";
import collabReducer from "./collab_requests";
import traitsReducer from "./traits"

const appReducer = combineReducers({
  session,
  projectReducer,
  tasksReducer,
  collabReducer,
  traits: traitsReducer,
  // any other reducers
});


const rootReducer = (state, action) => {
  if (action.type === 'session/REMOVE_USER') {
    state = {};
  }

  return appReducer(state, action);
};

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
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
