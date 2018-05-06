export class PublicationSummary {
  constructor(id, url, title, lastIssuesTitle, image) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.lastIssuesTitle = lastIssuesTitle;
    this.image = image;
  }
}

export class Page {
  constructor(data, page, totalPages) {
    this.data = data;
    this.page = page;
    this.totalPages = totalPages;
  }
}
