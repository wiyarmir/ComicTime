import { INDEX } from "../../../routes";

jest.mock("../../../i18n/i18n");
jest.mock("../../comicTimeLogo/ComicTimeLogo", () => "ComicTimeLogo");

import React from "react";
import { PureNavigationBar } from "../NavigationBar";
import {
  mockHistory,
  mountWithMuyThemeProvider,
  shallowComponent,
  shallowComponentAsJson
} from "../../../testUtils/enzyme";

const anyTitle = "Title";

describe("NavigationBar", () => {
  it("shows the title configured as parameter", () => {
    const component = shallowComponent(<PureNavigationBar title={anyTitle} />);
    expect(component.find("AppBar").get(0).props.title).toEqual(anyTitle);
  });

  it("renders the navigation bar using the app logo as left icon and the configured title by default", () => {
    const component = shallowComponentAsJson(
      <PureNavigationBar title={anyTitle} />
    );
    expect(component).toMatchSnapshot();
  });

  it("shows the application logo as the default left icon", () => {
    const component = mountWithMuyThemeProvider(
      <PureNavigationBar title={anyTitle} />
    );
    expect(component.find("ComicTimeLogo").length).toEqual(1);
  });

  it("renders the navigation bar using the back button instead of the logo as left icon if the param showBackButton is true", () => {
    const component = shallowComponentAsJson(
      <PureNavigationBar title={anyTitle} showBackButton={true} />
    );
    expect(component).toMatchSnapshot();
  });

  it("shows the back button as the default left icon if the component is configured to go back", () => {
    const component = mountWithMuyThemeProvider(
      <PureNavigationBar title={anyTitle} showBackButton={true} />
    );
    expect(component.find("ComicTimeLogo").length).toEqual(0);
    expect(component.find("NavigationArrowBack").length).toEqual(2);
  });

  it("navigates back to index when clicking on the app icon", () => {
    const history = mockHistory();
    const component = mountWithMuyThemeProvider(
      <PureNavigationBar title={anyTitle} history={history} />
    );
    component.find("IconButton").simulate("click");
    expect(history.go).toBeCalledWith(INDEX);
  });

  it("navigates back to index when clicking on the app icon", () => {
    const history = mockHistory();
    const component = mountWithMuyThemeProvider(
      <PureNavigationBar
        title={anyTitle}
        history={history}
        showBackButton={true}
      />
    );
    component.find("IconButton").simulate("click");
    expect(history.goBack).toBeCalled();
  });
});
