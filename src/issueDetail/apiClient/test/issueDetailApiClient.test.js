import {
  anyIssueId,
  anyPublicationId
} from "../../../testMothers/publicationDetails";

jest.mock("../../../utils/imageUtils", () => {
  return {
    downloadImageUrlAsBase64: jest.fn()
  };
});
jest.mock("../../../utils/jszipUtils", () => {
  return {
    downloadFile: jest.fn()
  };
});
import nock from "nock";
import { baseUrl, composeResourceUrl } from "../../../apiClient/apiClient";
import { NetworkError, UnknownError, NotFound } from "../../../apiClient/model";
import { downloadIssueAsCbzFile, getIssue } from "../issueDetailApiClient";
import { issueResponse } from "./resources/issueDetailApiClientResponses";
import { downloadImageUrlAsBase64 } from "../../../utils/imageUtils";
import { downloadFile } from "../../../utils/jszipUtils";
import { Right, Left } from "monet";
import { anyBase64Image } from "./resources/base64images";

describe("Issue detail API Client", () => {
  beforeEach(() => {
    downloadImageUrlAsBase64.mockReset();
    downloadFile.mockReset();
  });

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
    expect(issue.id).toEqual(anyPublicationId + "-" + anyIssueId);
    expect(issue.title).toEqual("The Flash (2016-) #Annual 1");
    expect(issue.numberOfPages).toEqual(43);
    const firstPage = issue.pages[0];
    expect(firstPage.number).toEqual(1);
    expect(firstPage.image).toEqual(
      "https://readcomicsonline.ru/uploads/manga/the-flash-2016/chapters/Annual1/01.jpg"
    );
  });

  it("returns an issue with all the pages found", async () => {
    givenTheApiReturnsTheIssueInformation(anyPublicationId, anyIssueId);

    const result = await getIssue(anyPublicationId, anyIssueId);
    expect(result.right()).toMatchSnapshot();
  });

  it("generates a zip file using the pages of an issue already loaded", async () => {
    givenTheApiReturnsTheIssueInformation(anyPublicationId, anyIssueId);
    const getIssueResult = await getIssue(anyPublicationId, anyIssueId);
    const issue = getIssueResult.right();
    const fileName = `${issue.title}.cbz`;
    givenThatIssuePagesAreDownloadedProperly(fileName);

    const file = await downloadIssueAsCbzFile(issue, jest.fn());

    expect(file.isRight()).toBeTruthy();
  });

  it("returns an error if any of the images being downloaded fail", async () => {
    givenTheApiReturnsTheIssueInformation(anyPublicationId, anyIssueId);
    const getIssueResult = await getIssue(anyPublicationId, anyIssueId);
    const issue = getIssueResult.right();
    givenTheIssuePagesAreNotDownloadedProperly();

    const file = await downloadIssueAsCbzFile(issue);

    expect(file.isRight()).toBeFalsy();
  });
});

function givenTheIssuePagesAreNotDownloadedProperly() {
  downloadFile.mockReturnValue(Promise.resolve(Left()));
}

function givenThatIssuePagesAreDownloadedProperly(fileName) {
  const result = Promise.resolve(anyBase64Image);
  downloadImageUrlAsBase64.mockReturnValue(result);
  downloadFile.mockReturnValue(Promise.resolve(Right(fileName)));
}

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
