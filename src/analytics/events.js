import { StatEvent } from "./stats";

export function fetchPageEvent(page) {
  return new StatEvent("feed", "fetch-page", "Feed page fetched", page);
}

export function searchEvent(textToSearch) {
  return new StatEvent("search", "search", textToSearch);
}

export function clickSearchResultEvent(publicationId) {
  return new StatEvent("search", "click-search-result", publicationId);
}

export function downloadIssueEvent(issueId) {
  return new StatEvent("download", "start-download-issue", issueId);
}

export function issueDownloadedProperlyEvent(fileName) {
  return new StatEvent("download", "issue-downloaded-properly", fileName);
}

export function issueDownloadErrorEvent(issueId) {
  return new StatEvent("download", "issue-download-error", issueId);
}

export function clickOnGitHubIconEvent() {
  return new StatEvent("navigation-bar", "click-github-icon");
}

export function clickBackEvent() {
  return new StatEvent("navigation-bar", "click-back");
}

export function clickIndexEvent() {
  return new StatEvent("navigation-bar", "click-index");
}
