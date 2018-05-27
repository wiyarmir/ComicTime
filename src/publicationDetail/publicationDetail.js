import { getPublication } from "./apiClient/publicationDetailApiClient";
import { None, Some } from "monet";
import {
  downloadIssueAsCbzFile,
  getIssue
} from "../issueDetail/apiClient/issueDetailApiClient";

export const FETCHING_PUBLICATION_BY_ID = "FETCHING_PUBLICATION_BY_ID ";
export const PUBLICATION_FETCHED = "PUBLICATION_FETCHED";
export const ERROR_FETCHING_PUBLICATION = "ERROR_FETCHING_PUBLICATION";
export const DOWNLOADING_ISSUE = "DOWNLOADING_ISSUE";
export const ISSUE_DOWNLOADED_PROPERLY = "ISSUE_DOWNLOADED_PROPERLY";
export const ERROR_DOWNLOADING_ISSUE = "ERROR_DOWNLOADING_ISSUE";

export function fetchPublicationById(id) {
  return dispatch => {
    dispatch(fetchingPublicationById(id));
    getPublication(id).then(result => {
      if (result.isRight()) {
        const maybePublication = result.toMaybe();
        dispatch(publicationFetched(maybePublication));
      } else {
        const error = Some("");
        dispatch(errorFetchingPublication(error));
      }
    });
  };
}

export function downloadIssue(issue) {
  return dispatch => {
    dispatch(downloadingIssue(issue));
    getIssue(issue.publicationId, issue.id).then(eitherIssueDetail => {
      if (eitherIssueDetail.isRight()) {
        const issueDetail = eitherIssueDetail.right();
        downloadIssueAsCbzFile(issueDetail).then(result => {
          if (result.isRight()) {
            dispatch(issueDownloadedProperly(issue));
          } else {
            dispatch(errorDownloadingIssue(issue));
          }
        });
      } else {
        dispatch(errorDownloadingIssue(issue));
      }
    });
  };
}

function downloadingIssue(issue) {
  return {
    type: DOWNLOADING_ISSUE,
    issue: issue
  };
}

function issueDownloadedProperly(issue) {
  return {
    type: ISSUE_DOWNLOADED_PROPERLY,
    issue: issue
  };
}

function errorDownloadingIssue(issue) {
  return {
    type: ERROR_DOWNLOADING_ISSUE,
    issue: issue
  };
}

function fetchingPublicationById(id) {
  return {
    type: FETCHING_PUBLICATION_BY_ID,
    id: id
  };
}

function publicationFetched(publication) {
  return {
    type: PUBLICATION_FETCHED,
    publication: publication
  };
}

function errorFetchingPublication(error) {
  return {
    type: ERROR_FETCHING_PUBLICATION,
    error: error
  };
}

const publicationDetailInitialState = {
  publicationSelected: None(),
  fetchingPublication: true,
  errorFetchingPublication: None(),
  issueBeingDownloaded: None(),
  lastIssueBeingDownloaded: None(),
  errorDownloadingIssue: None()
};

export function publicationDetailReducer(
  state = publicationDetailInitialState,
  action
) {
  switch (action.type) {
    case FETCHING_PUBLICATION_BY_ID:
      return Object.assign({}, state, {
        publicationSelected: None(),
        fetchingPublication: true,
        errorFetchingPublication: None()
      });
    case PUBLICATION_FETCHED:
      return Object.assign({}, state, {
        publicationSelected: action.publication,
        fetchingPublication: false,
        errorFetchingPublication: None()
      });
    case ERROR_FETCHING_PUBLICATION:
      return Object.assign({}, state, {
        publicationSelected: None(),
        fetchingPublication: false,
        errorFetchingPublication: action.error
      });
    case DOWNLOADING_ISSUE:
      return Object.assign({}, state, {
        issueBeingDownloaded: Some(action.issue)
      });
    case ISSUE_DOWNLOADED_PROPERLY:
      return Object.assign({}, state, {
        issueBeingDownloaded: None(),
        lastIssueBeingDownloaded: Some(action.issue),
        errorDownloadingIssue: None()
      });
    case ERROR_DOWNLOADING_ISSUE:
      return Object.assign({}, state, {
        issueBeingDownloaded: None(),
        lastIssueBeingDownloaded: Some(action.issue),
        errorDownloadingIssue: Some("")
      });
    default:
      return state;
  }
}
