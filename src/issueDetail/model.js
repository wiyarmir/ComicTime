export class IssuePage {
  constructor(number, image) {
    this.number = number;
    this.image = image;
  }
}
export class Issue {
  constructor(id, publicationId, title, numberOfPages, pages) {
    this.id = id;
    this.publicationId = publicationId;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.pages = pages;
  }
}

export class IssueDownloadUpdate {
  constructor(issue, lastPageDownloaded, totalNumberOfPages) {
    this.issue = issue;
    this.lastPageDownloaded = lastPageDownloaded;
    this.totalNumberOfPages = totalNumberOfPages;
  }
}

export class IssueDownloadProgress {
  constructor(issue, progress) {
    this.issue = issue;
    this.progress = progress;
  }

  downloadCompreted() {
    return this.progress === 1.0;
  }
}
