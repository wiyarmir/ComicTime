import "../../../testUtils/dummyNodeUuid";
import nock from "nock";
import { getFeedPage } from "../feedApiClient";
import { baseUrl, composeResourceUrl } from "../../../apiClient/apiClient";
import { NetworkError, NotFound, UnknownError } from "../../../apiClient/model";
import {
  emptyFeedApiPageResponse,
  feedApiPageResponse
} from "./resources/feedApiResponses";
import { Page, PublicationSummary } from "../../model";

describe("Feed API Client", () => {
  it("returns an unknown error if the response status code is an error", async () => {
    const page = 1;
    const errorResponseCode = 500;
    givenTheFeedApiIsNotWorking(page, errorResponseCode);
    const result = await getFeedPage(page);
    expect(result.left()).toEqual(new UnknownError(errorResponseCode));
  });

  it("returns an not found error if the response status code is 404", async () => {
    const page = 1;
    const errorResponseCode = 404;
    givenTheFeedApiIsNotWorking(page, errorResponseCode);
    const result = await getFeedPage(page);
    expect(result.left()).toEqual(new NotFound());
  });

  it("returns a network error if there is any not handled exception", async () => {
    givenThereIsNoConnection();
    const result = await getFeedPage(1);
    expect(result.left()).toEqual(new NetworkError());
  });

  it("returns an empty page if there are no publications", async () => {
    const page = 123;
    givenTheFeedApiReturnsAPageWithoutPublications(page);
    const result = await getFeedPage(page);
    expect(result.right()).toEqual(new Page([], page, 0));
  });

  it("returns a page with all the publications inside and the total number of pages", async () => {
    const page = 1;
    givenTheFeedApiReturnsAPageWithPublications(page);
    const result = await getFeedPage(page);
    const feedPage = result.right();
    expect(feedPage.page).toEqual(page);
    expect(feedPage.totalPages).toEqual(122);
    expect(feedPage.data.length).toEqual(98);
    const firstPublication = feedPage.data[0];
    expect(firstPublication).toEqual(
      new PublicationSummary(
        "uuid",
        "http://readcomicsonline.ru/comic/volcanosaurus-2017",
        "volcanosaurus-2017",
        "Volcanosaurus (2017)",
        ["Volcanosaurus (2017) #2"],
        "http://readcomicsonline.ru/uploads/manga/volcanosaurus-2017/cover/cover_250x350.jpg",
        "04/5/2018",
        "American Mythology"
      )
    );
    expect(firstPublication.lastIssuesNumbers).toEqual(["#2"]);
  });

  it("returns a page with all the publications found", async () => {
    const page = 1;
    givenTheFeedApiReturnsAPageWithPublications(page);
    const result = await getFeedPage(page);
    expect(result.right()).toMatchSnapshot();
  });
});

function givenTheFeedApiIsNotWorking(page, errorStatusCode) {
  nock(baseUrl)
    .get(apiFeedUrl(page))
    .reply(errorStatusCode);
}

function givenThereIsNoConnection() {
  nock(baseUrl)
    .get("/notHandledPath")
    .reply(1);
}

function givenTheFeedApiReturnsAPageWithPublications(page) {
  nock(baseUrl)
    .get(apiFeedUrl(page))
    .reply(200, feedApiPageResponse);
}

function givenTheFeedApiReturnsAPageWithoutPublications(page) {
  nock(baseUrl)
    .get(apiFeedUrl(page))
    .reply(200, emptyFeedApiPageResponse);
}

function apiFeedUrl(page) {
  return composeResourceUrl(`/latest-release?page=${page}`);
}
