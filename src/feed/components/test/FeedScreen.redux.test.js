jest.mock("../../../i18n/i18n");
jest.mock("../../../feed/feed", () => {
  return {
    fetchPublications: jest.fn(),
    fetchNextPublicationsPage: jest.fn()
  };
});

import {
  fetchPublications,
  fetchNextPublicationsPage
} from "../../../feed/feed";
import { mapPropsToDispatch, mapStateToProps } from "../FeedScreen";

const anyPublications = [1, 2];

describe("FeedScreen redux integration", () => {
  it("fetches the first page when the component is mounted", () => {
    const dispatch = jest.fn();

    mapPropsToDispatch(dispatch).onComponentMounted();

    expect(fetchPublications).toBeCalledWith(1);
  });

  it("fetches the next page when the next page is reached", () => {
    const dispatch = jest.fn();

    mapPropsToDispatch(dispatch).onNextPageReached();

    expect(fetchNextPublicationsPage).toBeCalled();
  });

  it("saves the feed publications as the publications props", () => {
    const state = {
      feed: {
        publications: anyPublications
      }
    };

    const props = mapStateToProps(state);

    expect(props.publications).toEqual(anyPublications);
  });

  it("configures the loading props as true if the state is fetching page and the publications are empty", () => {
    const state = {
      feed: {
        publications: [],
        fetchingPage: true
      }
    };

    const props = mapStateToProps(state);

    expect(props.loading).toBeTruthy();
  });

  it("configures the loading props as false if the state is fetching page and the publications are not empty", () => {
    const state = {
      feed: {
        publications: anyPublications,
        fetchingPage: true
      }
    };

    const props = mapStateToProps(state);

    expect(props.loading).toBeFalsy();
  });

  it("configures the loading props as false if the state is not fetching page and the publications not are empty", () => {
    const state = {
      feed: {
        publications: anyPublications,
        fetchingPage: false
      }
    };

    const props = mapStateToProps(state);

    expect(props.loading).toBeFalsy();
  });

  it("configures the loadingNextPage props as true if the state is fetching page and there are previous publications", () => {
    const state = {
      feed: {
        publications: anyPublications,
        fetchingPage: true
      }
    };

    const props = mapStateToProps(state);

    expect(props.loadingNextPage).toBeTruthy();
  });

  it("configures the loadingNextPage props as false if the state is fetching page but there are no previous publications", () => {
    const state = {
      feed: {
        publications: [],
        fetchingPage: true
      }
    };

    const props = mapStateToProps(state);

    expect(props.loadingNextPage).toBeFalsy();
  });

  it("configures the loadingNextPage props as false if the state is not fetching page even if there are previous publications", () => {
    const state = {
      feed: {
        publications: anyPublications,
        fetchingPage: false
      }
    };

    const props = mapStateToProps(state);

    expect(props.loadingNextPage).toBeFalsy();
  });
});
