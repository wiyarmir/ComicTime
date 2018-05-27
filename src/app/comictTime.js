import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { feedReducer } from "../feed/feed";
import { publicationDetailReducer } from "../publicationDetail/publicationDetail";

export const comicTimeStore = initializeStore(comicTimeReducer);

export function initializeStore(reducer) {
  return createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}

export function comicTimeReducer(state = {}, action) {
  return {
    feed: feedReducer(state.feed, action),
    publicationDetail: publicationDetailReducer(state.publicationDetail, action)
  };
}
