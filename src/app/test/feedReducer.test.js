import { NetworkError, UnknownError } from "../../apiClient/model";

jest.mock("../../feed/apiClient/feedApiClient", () => {
  return {
    getFeedPage: jest.fn()
  };
});

import {
  anyFirstPageOfPublications,
  anySecondPageOfPublications
} from "../../testMothers/publications";
import { comicTimeReducer, initializeStore } from "../comictTime";
import { Some, None, Right, Left } from "monet";
import { fetchNextPublicationsPage, fetchPublications } from "../../feed/feed";
import { getFeedPage } from "../../feed/apiClient/feedApiClient";
import { flushPromises } from "../../testUtils/promises";

describe("Feed reducer", () => {
  beforeEach(() => {
    getFeedPage.mockReset();
  });

  afterEach(() => {
    getFeedPage.mockReset();
  });

  it("initializes the store using the initial state configured", () => {
    const store = givenTheComicTimeStore();
    expect(store.getState().feed).toEqual({
      fetchingPage: false,
      pageBeingFetched: None(),
      publications: [],
      lastPageFetched: None(),
      errorFetchingPage: None()
    });
  });

  it("marks the fetching page attribute as true and save the page being fetched when loading the first page", async () => {
    const store = givenTheComicTimeStore();

    getFeedPage.mockReturnValue(new Promise(() => {}));
    fetchPage(store, 1);

    const feedState = store.getState().feed;
    expect(feedState.fetchingPage).toBeTruthy();
    expect(feedState.pageBeingFetched).toEqual(1);
  });

  it("saves the page fetched", async () => {
    const store = givenTheComicTimeStore();

    givenTheFetchPageReturns(Right(anyFirstPageOfPublications));
    await fetchPage(store, 1);

    expect(store.getState().feed).toEqual({
      fetchingPage: false,
      pageBeingFetched: None(),
      publications: anyFirstPageOfPublications.data,
      lastPageFetched: Some(anyFirstPageOfPublications),
      errorFetchingPage: None()
    });
  });

  it("appends the second page to the first one", async () => {
    const store = givenTheComicTimeStore();

    givenTheFetchPageReturns(Right(anyFirstPageOfPublications));
    await fetchPage(store, 1);
    givenTheFetchPageReturns(Right(anySecondPageOfPublications));
    await fetchPage(store, 2);

    expect(store.getState().feed).toEqual({
      fetchingPage: false,
      pageBeingFetched: None(),
      publications: anyFirstPageOfPublications.data.concat(
        anySecondPageOfPublications.data
      ),
      lastPageFetched: Some(anySecondPageOfPublications),
      errorFetchingPage: None()
    });
  });

  it("does not remove all the content already loaded if the first page is requested again", async () => {
    const store = givenTheComicTimeStore();

    givenTheFetchPageReturns(Right(anyFirstPageOfPublications));
    await fetchPage(store, 1);
    givenTheFetchPageReturns(Right(anySecondPageOfPublications));
    await fetchPage(store, 2);
    givenTheFetchPageReturns(Right(anyFirstPageOfPublications));
    await fetchPage(store, 1);

    expect(store.getState().feed).toEqual({
      fetchingPage: false,
      pageBeingFetched: None(),
      publications: anyFirstPageOfPublications.data.concat(
        anySecondPageOfPublications.data
      ),
      lastPageFetched: Some(anySecondPageOfPublications),
      errorFetchingPage: None()
    });
  });

  it("loads the next page if the method fetchNextPublicationsPage is invoked", async () => {
    const store = givenTheComicTimeStore();

    givenTheFetchPageReturns(Right(anyFirstPageOfPublications));
    await fetchPage(store, 1);
    givenTheFetchPageReturns(Right(anySecondPageOfPublications));
    await fetchNextPage(store);

    expect(getFeedPage).toBeCalledWith(1);
    expect(getFeedPage).toBeCalledWith(2);
    expect(store.getState().feed).toEqual({
      fetchingPage: false,
      pageBeingFetched: None(),
      publications: anyFirstPageOfPublications.data.concat(
        anySecondPageOfPublications.data
      ),
      lastPageFetched: Some(anySecondPageOfPublications),
      errorFetchingPage: None()
    });
  });

  it("saves the error returned by the api", async () => {
    const store = givenTheComicTimeStore();

    const responseError = new UnknownError(404);
    givenTheFetchPageReturns(Left(responseError));
    await fetchPage(store, 1);

    expect(store.getState().feed).toEqual({
      fetchingPage: false,
      pageBeingFetched: None(),
      publications: [],
      lastPageFetched: None(),
      errorFetchingPage: Some(responseError)
    });
  });

  it("saves the error returned by the api even when previous pages are loaded", async () => {
    const store = givenTheComicTimeStore();

    givenTheFetchPageReturns(Right(anyFirstPageOfPublications));
    await fetchPage(store, 1);
    const responseError = new NetworkError();
    givenTheFetchPageReturns(Left(responseError));
    await fetchNextPage(store);

    expect(getFeedPage).toBeCalledWith(1);
    expect(getFeedPage).toBeCalledWith(2);
    expect(store.getState().feed).toEqual({
      fetchingPage: false,
      pageBeingFetched: None(),
      publications: anyFirstPageOfPublications.data,
      lastPageFetched: Some(anyFirstPageOfPublications),
      errorFetchingPage: Some(responseError)
    });
  });
});

function givenTheComicTimeStore() {
  return initializeStore(comicTimeReducer);
}

async function fetchPage(store, page) {
  store.dispatch(fetchPublications(page));
  return flushPromises();
}

async function fetchNextPage(store) {
  store.dispatch(fetchNextPublicationsPage());
  return flushPromises();
}

function givenTheFetchPageReturns(response) {
  const promise = Promise.resolve(response);
  getFeedPage.mockReturnValue(promise);
}
