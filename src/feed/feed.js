import { getFeedPage } from "./apiClient/feedApiClient";
import log from "loglevel";
import { Some, None } from "monet";

const FETCHING_FEED_PAGE = "FETCHING_FEED_PAGE";
const FEED_PAGE_FETCHED = "FEED_PAGE_FETCHED";
const ERROR_FETCHING_FEED_PAGE = "ERROR_FETCHING_FEED_PAGE";

export function fetchNextPublicationsPage() {
  return (dispatch, getState) => {
    const state = getState();
    const nextPage = state.feed.lastPageFetched
      .map(page => {
        return page.page + 1;
      })
      .orElse(1).val;
    fetchPublications(nextPage)(dispatch);
  };
}

export function fetchPublications(page = 1) {
  return (dispatch, getState) => {
    if (page === 1 && getState().feed.publications.length > 0) {
      return;
    }
    dispatch(fetchingPage(page));
    getFeedPage(page).then(result => {
      log.debug(result);
      if (result.isRight()) {
        dispatch(feedPageLoaded(result.right()));
      } else {
        dispatch(errorFetchingPage(result.left()));
      }
      return result;
    });
  };
}

function fetchingPage(page) {
  return {
    type: FETCHING_FEED_PAGE,
    page: page
  };
}

function feedPageLoaded(page) {
  return {
    type: FEED_PAGE_FETCHED,
    page: page
  };
}

function errorFetchingPage(error) {
  return {
    type: ERROR_FETCHING_FEED_PAGE,
    error: error
  };
}

const feedInitialState = {
  fetchingPage: false,
  pageBeingFetched: None(),
  publications: [],
  lastPageFetched: None(),
  errorFetchingPage: None()
};

export function feedReducer(state = feedInitialState, action) {
  switch (action.type) {
    case FETCHING_FEED_PAGE:
      return Object.assign({}, state, {
        fetchingPage: true,
        pageBeingFetched: action.page,
        errorFetchingPage: None()
      });
    case ERROR_FETCHING_FEED_PAGE:
      return Object.assign({}, state, {
        fetchingPage: false,
        pageBeingFetched: None(),
        errorFetchingPage: Some(action.error)
      });
    case FEED_PAGE_FETCHED:
      return Object.assign({}, state, {
        fetchingPage: false,
        pageBeingFetched: None(),
        errorFetchingPage: None(),
        publications: appendFeedPage(state, action.page),
        lastPageFetched: Some(action.page)
      });
    default:
      return state;
  }
}

function appendFeedPage(state, page) {
  if (page.page === 1) {
    return page.data;
  } else {
    return state.publications.concat(page.data);
  }
}
