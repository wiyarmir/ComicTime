jest.mock("../../../i18n/i18n");

import { Some, None } from "monet";
import { mapStateToProps } from "../Title";

describe("Title redux integration", () => {
  it("should map the publication loaded title as the component property title", () => {
    const anyPublicationTitle = "Batman #1";

    const props = mapStateToProps({
      publicationDetail: {
        publicationSelected: Some({
          title: anyPublicationTitle
        })
      }
    });

    expect(props).toEqual({
      title: anyPublicationTitle
    });
  });

  it("should map a not selected publication as an undefined title", () => {
    const props = mapStateToProps({
      publicationDetail: {
        publicationSelected: None()
      }
    });
    expect(props).toEqual({
      title: undefined
    });
  });
});
