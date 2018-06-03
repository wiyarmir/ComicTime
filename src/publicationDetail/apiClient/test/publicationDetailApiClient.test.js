import nock from "nock";
import { baseUrl, composeResourceUrl } from "../../../apiClient/apiClient";
import { NetworkError, UnknownError, NotFound } from "../../../apiClient/model";
import { getPublication } from "../publicationDetailApiClient";
import {
  publicationNotFoundResponse,
  publicationResponse
} from "./resources/publicationDetailApiResponses";
import { IssueSummary } from "../../model";
import { anyPublicationId } from "../../../testMothers/publicationDetails";

describe("Publication detail API Client", () => {
  it("returns an unknown error if the response status code is an error", async () => {
    const errorResponseCode = 500;
    givenThePublicationDetailApiIsNotWorking(
      anyPublicationId,
      errorResponseCode
    );
    const result = await getPublication(anyPublicationId);
    expect(result.left()).toEqual(new UnknownError(errorResponseCode));
  });

  it("returns a network error if there is any not handled exception", async () => {
    givenThereIsNoConnection();
    const result = await getPublication(anyPublicationId);
    expect(result.left()).toEqual(new NetworkError());
  });

  it("returns a publication not found error if the id does not exist", async () => {
    givenThePublicationDoesNotExist();
    const result = await getPublication(anyPublicationId);
    expect(result.left()).toEqual(new NotFound());
  });

  it("returns the extracted publication information composed by the list of issues and their pages", async () => {
    givenTheApiReturnsThePublicationInformation(anyPublicationId);

    const result = await getPublication(anyPublicationId);

    const publication = result.right();
    expect(publication.id).toEqual(anyPublicationId);
    expect(publication.title).toEqual("The Flash (2016-)");
    expect(publication.image).toEqual(
      "https://readcomicsonline.ru/uploads/manga/the-flash-2016/cover/cover_250x350.jpg"
    );
    expect(publication.status.val).toEqual("Ongoing");
    expect(publication.summary).toEqual(
      '"LIGHTNING STRIKES TWICE" Chapter One\n' +
        "\n" +
        "A new storm brews over Central City and disproves the old adage about lightning never, well...you know. Just as Barry begins to feel overwhelmed fighting crime, a new speedster debuts—but just where did this amazing new friend come from?\n" +
        "\n" +
        "FLASH FACT: \"2016 is the 60th anniversary of Barry Allen becoming The Flash, and it's a privilege to be a part of it,\" says writer Joshua Williamson. \"'The Return of Barry Allen' in FLASH #79 [1993] is one of my favorite comics of all time. It's where I became a Flash fan for life.\""
    );
    expect(publication.publisher.val).toEqual("DC Comics");
    expect(publication.releaseDate.val).toEqual("2016");
    expect(publication.authors.val).toEqual("Joshua Williamson");
    expect(publication.issues.length).toEqual(47);
    const firstIssueInTheList = publication.issues[0];
    expect(firstIssueInTheList).toEqual(
      new IssueSummary(
        "the-flash-2016-Annual1",
        "the-flash-2016",
        "Annual1",
        "The Flash (2016-) #Annual 1",
        "31 Jan. 2018"
      )
    );
  });

  it("returns the publication with the issues summary inside", async () => {
    givenTheApiReturnsThePublicationInformation(anyPublicationId);
    const result = await getPublication(anyPublicationId);
    expect(result.right()).toMatchSnapshot();
  });
});

function givenThePublicationDetailApiIsNotWorking(id, errorStatusCode) {
  nock(baseUrl)
    .get(composeResourceUrl(`/comic/${id}`))
    .reply(errorStatusCode);
}

function givenThereIsNoConnection() {
  nock(baseUrl)
    .get("/notHandledPath")
    .reply(1);
}

function givenThePublicationDoesNotExist(id) {
  nock(baseUrl)
    .get(composeResourceUrl(`/comic/${id}`))
    .reply(200, publicationNotFoundResponse);
}

function givenTheApiReturnsThePublicationInformation(id) {
  nock(baseUrl)
    .get(composeResourceUrl(`/comic/${id}`))
    .reply(200, publicationResponse);
}
