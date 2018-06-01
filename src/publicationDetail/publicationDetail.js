import { getPublication } from "./apiClient/publicationDetailApiClient";
import { None, Some, Maybe } from "monet";
import {
  downloadIssueAsCbzFile,
  getIssue
} from "../issueDetail/apiClient/issueDetailApiClient";
import { IssueDownloadUpdate } from "../issueDetail/model";

export const FETCHING_PUBLICATION_BY_ID = "FETCHING_PUBLICATION_BY_ID ";
export const PUBLICATION_FETCHED = "PUBLICATION_FETCHED";
export const ERROR_FETCHING_PUBLICATION = "ERROR_FETCHING_PUBLICATION";
export const DOWNLOADING_ISSUE = "DOWNLOADING_ISSUE";
export const ISSUE_DOWNLOADED_PROPERLY = "ISSUE_DOWNLOADED_PROPERLY";
export const ERROR_DOWNLOADING_ISSUE = "ERROR_DOWNLOADING_ISSUE";
export const UPDATE_ISSUE_DOWNLOAD = "UPDATE_ISSUE_DOWNLOAD";

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
  return (dispatch, getState) => {
    if (isIssueDownloadInProgress(getState(), issue)) {
      return;
    }
    dispatch(downloadingIssue(issue));
    getIssue(issue.publicationId, issue.issueNumber).then(eitherIssueDetail => {
      if (
        eitherIssueDetail.isRight() &&
        eitherIssueDetail.right().pages.length > 0
      ) {
        const issueDetail = eitherIssueDetail.right();
        downloadIssueAsCbzFile(
          issueDetail,
          (lastPageDownloaded, totalNumberOfPages) => {
            dispatch(
              updateIssueDownload(issue, lastPageDownloaded, totalNumberOfPages)
            );
          }
        ).then(result => {
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

function updateIssueDownload(issue, lastPageDownloaded, totalNumberOfPages) {
  return {
    type: UPDATE_ISSUE_DOWNLOAD,
    update: new IssueDownloadUpdate(
      issue,
      lastPageDownloaded,
      totalNumberOfPages
    )
  };
}

const publicationDetailInitialState = {
  publicationSelected: None(),
  fetchingPublication: true,
  errorFetchingPublication: None(),
  downloadsInitiated: 0,
  issuesBeingDownloaded: [],
  issuePageDownloadStatus: {},
  issuePercentageDownloadStatus: {},
  lastIssuesDownloadedProperly: [],
  errorsDownloadingIssue: []
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
        downloadsInitiated: state.downloadsInitiated + 1,
        issuesBeingDownloaded: addIssueToTheDownloadsList(state, action.issue),
        lastIssuesDownloadedProperly: removeIssueFromIssuesDownloadedProperlyList(
          state,
          action.issue
        ),
        errorsDownloadingIssue: removeIssueFromIssuesDownloadErrorList(
          state,
          action.issue
        ),
        issuePageDownloadStatus: resetIssuePageDownloadStatus(
          state,
          action.issue
        ),
        issuePercentageDownloadStatus: resetIssuePercentageDownloadStatus(
          state,
          action.issue
        )
      });
    case ISSUE_DOWNLOADED_PROPERLY:
      return Object.assign({}, state, {
        issuesBeingDownloaded: removeIssueFromIssuesBeingDownloaded(
          state,
          action.issue
        ),
        lastIssuesDownloadedProperly: addIssueToTheIssuesDownloadedList(
          state,
          action.issue
        ),
        errorsDownloadingIssue: removeIssueFromIssuesDownloadErrorList(
          state,
          action.issue
        )
      });
    case ERROR_DOWNLOADING_ISSUE:
      return Object.assign({}, state, {
        issuesBeingDownloaded: removeIssueFromIssuesBeingDownloaded(
          state,
          action.issue
        ),
        lastIssuesDownloadedProperly: removeIssueFromIssuesDownloadedProperlyList(
          state,
          action.issue
        ),
        errorsDownloadingIssue: addErrorToTheErrorDownloadingIssueList(
          state,
          action.issue
        ),
        issuePageDownloadStatus: resetIssuePageDownloadStatus(
          state,
          action.issue
        ),
        issuePercentageDownloadStatus: resetIssuePercentageDownloadStatus(
          state,
          action.issue
        )
      });
    case UPDATE_ISSUE_DOWNLOAD:
      return Object.assign({}, state, {
        issuePageDownloadStatus: updateIssuePageDownloadStatus(
          state,
          action.update
        ),
        issuePercentageDownloadStatus: updateIssuePercentageDownloadStats(
          state,
          action.update
        )
      });
    default:
      return state;
  }
}

function isIssueDownloadInProgress(state, issue) {
  return state.publicationDetail.issuesBeingDownloaded.includes(issue);
}

function addIssueToTheDownloadsList(state, issue) {
  return state.issuesBeingDownloaded.concat([issue]);
}

function addIssueToTheIssuesDownloadedList(state, issue) {
  return state.lastIssuesDownloadedProperly.concat([issue]);
}

function addErrorToTheErrorDownloadingIssueList(state, issue) {
  return state.errorsDownloadingIssue.concat([issue]);
}

function removeIssueFromIssuesBeingDownloaded(state, issue) {
  return removeIssueFromList(state.issuesBeingDownloaded, issue);
}

function removeIssueFromIssuesDownloadErrorList(state, issue) {
  return removeIssueFromList(state.errorsDownloadingIssue, issue);
}

function removeIssueFromIssuesDownloadedProperlyList(state, issue) {
  return removeIssueFromList(state.lastIssuesDownloadedProperly, issue);
}

function removeIssueFromList(list, issue) {
  if (list.includes(issue)) {
    list.splice(list.indexOf(issue), 1);
  }
  return list;
}

function updateIssuePageDownloadStatus(state, update) {
  const status = state.issuePageDownloadStatus;
  const currentNumberOfPagesDownloaded = Maybe.fromNull(
    status[update.issue.id]
  );
  status[update.issue.id] = currentNumberOfPagesDownloaded
    .map(pagesDownloaded => pagesDownloaded + 1)
    .orSome(1);
  return status;
}

function updateIssuePercentageDownloadStats(state, update) {
  const pageStatus = state.issuePageDownloadStatus;
  const newPercentage =
    pageStatus[update.issue.id] / (update.totalNumberOfPages - 1);
  const percentageStatus = state.issuePercentageDownloadStatus;
  percentageStatus[update.issue.id] = newPercentage;
  return percentageStatus;
}

function resetIssuePageDownloadStatus(state, issue) {
  const status = state.issuePageDownloadStatus;
  delete status[issue.id];
  return status;
}

function resetIssuePercentageDownloadStatus(state, issue) {
  const status = state.issuePercentageDownloadStatus;
  delete status[issue.id];
  return status;
}
