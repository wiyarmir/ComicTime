jest.mock("../../../i18n/i18n");

import { PureTitle } from "../Title";
import React from "react";
import { shallowComponentAsJson, translator } from "../../../testUtils/enzyme";

describe("Title", () => {
  it("shows the app title by default if it's not configured", () => {
    const component = shallowComponentAsJson(<PureTitle t={translator} />);
    expect(component).toMatchSnapshot();
  });

  it("shows the title prop instead of the app name if it's configured properly", () => {
    const component = shallowComponentAsJson(
      <PureTitle t={translator} title={"The Flash #1"} />
    );
    expect(component).toMatchSnapshot();
  });
});
