export class PublicationSummary {
  constructor(
    id,
    url,
    path,
    title,
    lastIssuesTitles,
    image,
    releaseDate,
    publisher
  ) {
    this.id = id;
    this.url = url;
    this.path = path;
    this.title = title;
    this.lastIssuesTitles = lastIssuesTitles;
    this.lastIssuesNumbers = lastIssuesTitles.map(issueTitle =>
      issueTitle.replace(title, "").trim()
    );
    this.image = image;
    this.releaseDate = releaseDate;
    this.publisher = publisher;
  }
}

export class Page {
  constructor(data, page, totalPages) {
    this.data = data;
    this.page = page;
    this.totalPages = totalPages;
  }
}
