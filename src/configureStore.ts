import { Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import createSagaMiddleware from "redux-saga";
// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
import { connectRouter, routerMiddleware } from "connected-react-router";
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from "redux-devtools-extension";
// If you use react-router, don't forget to pass in your history type.
import { History } from "history";

// Import the state interface and our combined reducers/sagas.
import { IApplicationState, rootReducer } from "./store";

export default function configureStore(
  history: History,
  initialState: IApplicationState
): Store<IApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});
  // create the redux-saga middleware
  // const sagaMiddleware = createSagaMiddleware();

  const middleware = [thunk, routerMiddleware(history)];
  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  // Don't forget to run the root saga, and return the store object.
  // sagaMiddleware.run(rootSaga);
  return store;
}
