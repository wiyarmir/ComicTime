import { Page, PublicationSummary } from "../feed/model";

export const anyListOfPublications = [
  new PublicationSummary(
    "uuid1",
    "http://readcomicsonline.ru/comic/deadpool-2017",
    "deadpool-2017",
    "deadpool (2017)",
    ["deadpool (2017) #1"],
    "http://readcomicsonline.ru/uploads/manga/deadpool-2017/cover/cover_250x350.jpg",
    "20/1/2017",
    "Marvel"
  ),
  new PublicationSummary(
    "uuid2",
    "http://readcomicsonline.ru/comic/volcanosaurus-2017",
    "volcanosaurus-2017",
    "Volcanosaurus (2017)",
    ["Volcanosaurus (2017) #2"],
    "http://readcomicsonline.ru/uploads/manga/volcanosaurus-2017/cover/cover_250x350.jpg",
    "04/5/2018",
    "American Mythology"
  )
];

export const anyFirstPageOfPublications = new Page(anyListOfPublications, 1, 1);
export const anySecondPageOfPublications = new Page(
  anyListOfPublications,
  2,
  2
);
