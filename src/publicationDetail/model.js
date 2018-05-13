export class IssueSummary {
  constructor(id, title, releaseDate) {
    this.id = id;
    this.title = title;
    this.releaseDate = releaseDate;
  }
}
export class Publication {
  constructor(
    id,
    image,
    title,
    status,
    summary,
    publisher,
    releaseDate,
    authors,
    issues = []
  ) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.status = status;
    this.summary = summary;
    this.publisher = publisher;
    this.releaseDate = releaseDate;
    this.authors = authors;
    this.issues = issues;
  }
}
