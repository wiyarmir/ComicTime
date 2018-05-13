export class IssuePage {
  constructor(number, url) {
    this.number = number;
    this.url = url;
  }
}
export class Issue {
  constructor(id, title, numberOfPages, previousIssueId, nextIssueId, pages) {
    this.id = id;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.previousIssueId = previousIssueId;
    this.nextIssueId = nextIssueId;
    this.pages = pages;
  }
}
