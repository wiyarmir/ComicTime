jest.mock(
  "../../../baseComponents/navigationBar/NavigationBar",
  () => "NavigationBar"
);
jest.mock(
  "../../../baseComponents/progressBar/ProgressBar",
  () => "ProgressBar"
);
jest.mock("../PublicationsFeed", () => "PublicationsFeed");
jest.mock("../../apiClient/feedApiClient");
jest.mock("../../../i18n/i18n");

import React from "react";
import { PureFeedScreen } from "../FeedScreen";
import {
  shallowComponent,
  translator,
  shallowComponentAsJson
} from "../../../testUtils/enzyme";
import { anyListOfPublications } from "../../../testMothers/publications";

describe("FeedScreen", () => {
  it("renders a list of publications if it is not loading", () => {
    const component = shallowComponentAsJson(
      <PureFeedScreen
        t={translator}
        onComponentMounted={jest.fn()}
        loading={false}
        publications={anyListOfPublications}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders the progress bar if it is loading", () => {
    const component = shallowComponentAsJson(
      <PureFeedScreen
        t={translator}
        onComponentMounted={jest.fn()}
        loading={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("invokes the onComponentMounted props when it is mounted", () => {
    const onComponentMounted = jest.fn();

    shallowComponent(
      <PureFeedScreen
        t={translator}
        onComponentMounted={onComponentMounted}
        loading={true}
      />
    );

    expect(onComponentMounted).toBeCalled();
  });

  it("invokes the onNextPageReached props when the scroll is close to the end if not loading the next page", () => {
    const onNextPageReached = jest.fn();

    const component = shallowComponent(
      <PureFeedScreen
        t={translator}
        onComponentMounted={jest.fn()}
        onNextPageReached={onNextPageReached}
        loading={false}
        loadingNextPage={false}
      />
    );
    component.instance().onScrollFrame({ top: 0.76 });

    expect(onNextPageReached).toBeCalled();
  });

  it("does not invoke the onNextPageReached props when the scroll is close to the end if is loading the next page", () => {
    const onNextPageReached = jest.fn();

    const component = shallowComponent(
      <PureFeedScreen
        t={translator}
        onComponentMounted={jest.fn()}
        onNextPageReached={onNextPageReached}
        loading={false}
        loadingNextPage={true}
      />
    );
    component.instance().onScrollFrame({ top: 0.76 });

    expect(onNextPageReached).not.toBeCalled();
  });

  it("does not invokes the onNextPageReached props when the scroll is not close to the end even if not loading the next page", () => {
    const onNextPageReached = jest.fn();

    const component = shallowComponent(
      <PureFeedScreen
        t={translator}
        onComponentMounted={jest.fn()}
        onNextPageReached={onNextPageReached}
        loading={false}
        loadingNextPage={false}
      />
    );
    component.instance().onScrollFrame({ top: 0.75 });

    expect(onNextPageReached).not.toBeCalled();
  });
});
