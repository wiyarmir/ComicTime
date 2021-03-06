jest.mock("../apiClient/publicationDetailApiClient", () => {
  return {
    getPublication: jest.fn()
  };
});

jest.mock("../../issueDetail/apiClient/issueDetailApiClient", () => {
  return {
    getIssue: jest.fn(),
    downloadIssueAsCbzFile: jest.fn()
  };
});

import {
  anyIssue,
  anyIssueSummary,
  anyPublication,
  anyPublicationId
} from "../../testMothers/publicationDetails";
import { comicTimeReducer, initializeStore } from "../../app/comictTime";
import { None, Right, Some, Left } from "monet";
import { downloadIssue, fetchPublicationById } from "../publicationDetail";
import { getPublication } from "../apiClient/publicationDetailApiClient";
import { flushPromises } from "../../testUtils/promises";
import { NetworkError } from "../../apiClient/model";
import {
  getIssue,
  downloadIssueAsCbzFile
} from "../../issueDetail/apiClient/issueDetailApiClient";

describe("Publication detail reducer", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("initializes the store using the initial state configured", () => {
    const store = givenTheComicTimeStore();
    expect(store.getState().publicationDetail).toEqual({
      publicationSelected: None(),
      fetchingPublication: true,
      errorFetchingPublication: None(),
      downloadsInitiated: 0,
      issuesBeingDownloaded: [],
      issuePageDownloadStatus: {},
      issuePercentageDownloadStatus: {},
      lastIssuesDownloadedProperly: [],
      errorsDownloadingIssue: []
    });
  });

  it("marks the fetching publication as true while loading a publication by id", async () => {
    const store = givenTheComicTimeStore();
    getPublication.mockReturnValue(new Promise(() => {}));

    getPublicationById(store, anyPublicationId);

    const state = store.getState().publicationDetail;
    expect(state.fetchingPublication).toBeTruthy();
  });

  it("saves the publication fetched", async () => {
    const store = givenTheComicTimeStore();
    givenTheFetchPublicationReturns(Right(anyPublication));

    await getPublicationById(store, anyPublication);

    expect(store.getState().publicationDetail).toEqual({
      publicationSelected: Some(anyPublication),
      fetchingPublication: false,
      errorFetchingPublication: None(),
      downloadsInitiated: 0,
      issuesBeingDownloaded: [],
      issuePageDownloadStatus: {},
      issuePercentageDownloadStatus: {},
      lastIssuesDownloadedProperly: [],
      errorsDownloadingIssue: []
    });
  });

  it("saves an error if there is something wrong while fetching the publication by id", async () => {
    const store = givenTheComicTimeStore();
    givenTheFetchPublicationReturns(Left(new NetworkError()));

    await getPublicationById(store, anyPublication);

    expect(store.getState().publicationDetail).toEqual({
      publicationSelected: None(),
      fetchingPublication: false,
      errorFetchingPublication: Some(""),
      downloadsInitiated: 0,
      issuesBeingDownloaded: [],
      issuePageDownloadStatus: {},
      issuePercentageDownloadStatus: {},
      lastIssuesDownloadedProperly: [],
      errorsDownloadingIssue: []
    });
  });

  it("saves the issue being downloaded until the download process finish", () => {
    const store = givenTheComicTimeStore();
    getIssue.mockReturnValue(new Promise(() => {}));

    downloadIssueSummary(store, anyIssueSummary);

    const state = store.getState().publicationDetail;
    expect(state.issuesBeingDownloaded).toEqual([anyIssueSummary]);
  });

  it("saves the error found while downloading the issue if something went wrong getting the issue detailed information", async () => {
    const store = givenTheComicTimeStore();
    givenTheGetIssueReturns(Left(new NetworkError()));

    await downloadIssueSummary(store, anyIssueSummary);

    expect(store.getState().publicationDetail).toEqual({
      publicationSelected: None(),
      fetchingPublication: true,
      errorFetchingPublication: None(),
      downloadsInitiated: 1,
      issuesBeingDownloaded: [],
      lastIssuesDownloadedProperly: [],
      errorsDownloadingIssue: [anyIssueSummary],
      issuePageDownloadStatus: {},
      issuePercentageDownloadStatus: {}
    });
  });

  it("saves the error found while downloading the issue if something went wrong downloading the issue images", async () => {
    const store = givenTheComicTimeStore();
    givenTheGetIssueReturns(Right(anyIssue));
    givenTheDownloadCbzFileReturns(Left(new NetworkError()));

    await downloadIssueSummary(store, anyIssueSummary);

    expect(store.getState().publicationDetail).toEqual({
      publicationSelected: None(),
      fetchingPublication: true,
      errorFetchingPublication: None(),
      downloadsInitiated: 1,
      issuesBeingDownloaded: [],
      lastIssuesDownloadedProperly: [],
      errorsDownloadingIssue: [anyIssueSummary],
      issuePageDownloadStatus: {},
      issuePercentageDownloadStatus: {}
    });
  });

  it("saves the issue downloaded as last issue being downloaded if it is downloaded properly", async () => {
    const store = givenTheComicTimeStore();
    givenTheGetIssueReturns(Right(anyIssue));
    givenTheDownloadCbzFileReturns(Right());

    await downloadIssueSummary(store, anyIssueSummary);

    expect(store.getState().publicationDetail).toEqual({
      publicationSelected: None(),
      fetchingPublication: true,
      errorFetchingPublication: None(),
      downloadsInitiated: 1,
      issuesBeingDownloaded: [],
      lastIssuesDownloadedProperly: [anyIssueSummary],
      errorsDownloadingIssue: [],
      issuePageDownloadStatus: {},
      issuePercentageDownloadStatus: {}
    });
  });
});

function givenTheComicTimeStore() {
  return initializeStore(comicTimeReducer);
}

async function getPublicationById(store, id) {
  store.dispatch(fetchPublicationById(id));
  return flushPromises();
}

function givenTheFetchPublicationReturns(result) {
  getPublication.mockReturnValue(Promise.resolve(result));
}

async function downloadIssueSummary(store, issue) {
  store.dispatch(downloadIssue(issue));
  return flushPromises();
}

function givenTheGetIssueReturns(result) {
  getIssue.mockReturnValue(Promise.resolve(result));
}

function givenTheDownloadCbzFileReturns(result) {
  downloadIssueAsCbzFile.mockReturnValue(Promise.resolve(result));
}
