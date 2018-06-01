import { None, Some } from "monet";
import { searchPublication } from "./apiClient/searchApiClient";

const SEARCHING = "SEARCHING";
const SEARCH_FINISHED = "SEARCH_FINISHED";

export function search(text) {
  return dispatch => {
    dispatch(searching(text));
    searchPublication(text).then(result => {
      if (result.isRight()) {
        dispatch(searchFinished(result.right()));
      } else {
        dispatch(searchFinished([]));
      }
    });
  };
}

function searching(text) {
  return {
    type: SEARCHING,
    text: text
  };
}

function searchFinished(publications) {
  return {
    type: SEARCH_FINISHED,
    publications: publications
  };
}

const searchInitialState = {
  searchResults: [],
  searchInProgress: None()
};

export function searchReducer(state = searchInitialState, action) {
  switch (action.type) {
    case SEARCHING:
      return Object.assign({}, state, {
        searchInProgress: Some(action.text),
        searchResults: []
      });
    case SEARCH_FINISHED:
      return Object.assign({}, state, {
        searchInProgress: None,
        searchResults: action.publications
      });
    default:
      return state;
  }
}
