import nock from "nock";
import { baseUrl, composeResourceUrl } from "../../../apiClient/apiClient";
import { NetworkError, UnknownError, NotFound } from "../../../apiClient/model";
import { getIssue } from "../issueDetailApiClient";
import { issueResponse } from "./resources/issueDetailApiClientResponses";

const anyPublicationId = "the-flash-2016";
const anyIssueId = "Annual1";

describe("Issue detail API Client", () => {
  it("returns a not found error if the issue does not exist", async () => {
    const errorResponseCode = 404;
    givenTheIssueDoesNotExist(anyPublicationId, errorResponseCode);
    const result = await getIssue(anyPublicationId, anyIssueId);
    expect(result.left()).toEqual(new NotFound());
  });

  it("returns an error if there is something wrong", async () => {
    const errorResponseCode = 500;
    givenTheIssueDetailApiIsNotResponding(
      anyPublicationId,
      anyIssueId,
      errorResponseCode
    );
    const result = await getIssue(anyPublicationId, anyIssueId);
    expect(result.left()).toEqual(new UnknownError(errorResponseCode));
  });

  it("returns a network error if there is any not handled exception", async () => {
    givenThereIsNoConnection();
    const result = await getIssue(anyPublicationId, anyIssueId);
    expect(result.left()).toEqual(new NetworkError());
  });

  it("returns the extracted issue information composed by the list of pages", async () => {
    givenTheApiReturnsTheIssueInformation(anyPublicationId, anyIssueId);

    const result = await getIssue(anyPublicationId, anyIssueId);

    const issue = result.right();
    expect(issue.id).toEqual(anyIssueId);
    expect(issue.title).toEqual("The Flash (2016-)");
    expect(issue.numberOfPages).toEqual(20);
    const firstPage = issue.pages[0];
    expect(firstPage.number).toEqual(1);
    expect(firstPage.image).toEqual(
      "http://readcomicsonline.ru/uploads/manga/the-flash-2016/chapters/Annual1/01.jpg"
    );
  });

  it("returns an issue with all the pages found", async () => {
    givenTheApiReturnsTheIssueInformation(anyPublicationId, anyIssueId);

    const result = await getIssue(anyPublicationId, anyIssueId);
    expect(result.right()).toMatchSnapshot();
  });
});

function givenTheIssueDoesNotExist(publicationId, issueId) {
  nock(baseUrl)
    .get(composeResourceUrl(`/comic/${publicationId}/${issueId}`))
    .reply(404);
}

function givenTheIssueDetailApiIsNotResponding(
  publicationId,
  issueId,
  errorStatusCode
) {
  nock(baseUrl)
    .get(composeResourceUrl(`/comic/${publicationId}/${issueId}`))
    .reply(errorStatusCode);
}

function givenThereIsNoConnection() {
  nock(baseUrl)
    .get("/notHandledPath")
    .reply(1);
}

function givenTheApiReturnsTheIssueInformation(publicationId, issueId) {
  nock(baseUrl)
    .get(composeResourceUrl(`/comic/${publicationId}/${issueId}`))
    .reply(200, issueResponse);
}
