jest.mock("../../../i18n/i18n");
jest.mock("../../publicationDetail", () => {
  return {
    fetchPublicationById: jest.fn(),
    downloadIssue: jest.fn()
  };
});

import { None, Some } from "monet";
import {
  anyIssue,
  anyPublication,
  anyPublicationId
} from "../../../testMothers/publicationDetails";
import {
  mapPropsToDispatch,
  mapStateToProps
} from "../PublicationDetailScreen";
import { downloadIssue, fetchPublicationById } from "../../publicationDetail";

const anyError = Some("");

describe("PublicationDetailScreen redux integration", () => {
  it("fetches the publication by id when the component invokes the onComponentMounted prop", () => {
    const dispatch = jest.fn();

    mapPropsToDispatch(dispatch).onComponentMounted(anyPublicationId);

    expect(fetchPublicationById).toBeCalledWith(anyPublicationId);
  });

  it("downloads the issue when the issue is clicked", () => {
    const dispatch = jest.fn();

    mapPropsToDispatch(dispatch).onIssueClick(anyIssue);

    expect(downloadIssue).toBeCalledWith(anyIssue);
  });

  it("sets the loading prop to true if the publication detail is fetching a publication", () => {
    const state = {
      publicationDetail: {
        fetchingPublication: true
      }
    };
    const props = mapStateToProps(state);

    expect(props.loading).toBeTruthy();
  });

  it("sets the loading prop to false if the publication detail is not fetching a publication", () => {
    const state = {
      publicationDetail: {
        fetchingPublication: false
      }
    };
    const props = mapStateToProps(state);

    expect(props.loading).toBeFalsy();
  });

  it("sets the publication prop using the publication selected", () => {
    const state = {
      publicationDetail: {
        publicationSelected: Some(anyPublication)
      }
    };
    const props = mapStateToProps(state);

    expect(props.publication).toEqual(Some(anyPublication));
  });

  it("sets the publication prop as none if there is no publication selected", () => {
    const state = {
      publicationDetail: {
        publicationSelected: None()
      }
    };
    const props = mapStateToProps(state);

    expect(props.publication).toEqual(None());
  });

  it("sets the error prop using the error found while fetching a publication", () => {
    const state = {
      publicationDetail: {
        errorFetchingPublication: anyError
      }
    };
    const props = mapStateToProps(state);

    expect(props.error).toEqual(anyError);
  });

  it("sets the error prop as none if there was no errors while fetching the publication", () => {
    const state = {
      publicationDetail: {
        publicationSelected: None()
      }
    };
    const props = mapStateToProps(state);

    expect(props.publication).toEqual(None());
  });
});
