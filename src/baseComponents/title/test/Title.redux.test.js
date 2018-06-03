import { anyPublication } from "../../../testMothers/publicationDetails";

jest.mock("../../../i18n/i18n");

import { Some, None } from "monet";
import { mapStateToProps } from "../Title";

describe("Title redux integration", () => {
  it("should map the publication loaded title as the component property title", () => {
    const props = mapStateToProps({
      publicationDetail: {
        publicationSelected: Some(anyPublication)
      }
    });

    expect(props).toEqual({
      publication: anyPublication
    });
  });

  it("should map a not selected publication as an undefined title", () => {
    const props = mapStateToProps({
      publicationDetail: {
        publicationSelected: None()
      }
    });
    expect(props).toEqual({
      publication: undefined
    });
  });
});
