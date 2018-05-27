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
