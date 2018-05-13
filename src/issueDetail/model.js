export class IssuePage {
  constructor(number, image) {
    this.number = number;
    this.image = image;
  }
}
export class Issue {
  constructor(id, title, numberOfPages, pages) {
    this.id = id;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.pages = pages;
  }
}
