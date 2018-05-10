jest.mock("../../../i18n/i18n");
jest.mock("material-ui/CircularProgress", () => "CircularProgress");
import React from "react";
import ProgressBar from "../ProgressBar";
import { shallowComponentAsJson } from "../../../testUtils/enzyme";

describe("ProgressBar", () => {
  it("renders the progress bar composed of a circular progress bar plus the app logo by default", () => {
    const component = shallowComponentAsJson(<ProgressBar />);
    expect(component).toMatchSnapshot();
  });

  it("renders the progress bar composed as by default if it is not hidden", () => {
    const component = shallowComponentAsJson(<ProgressBar hidden={false} />);
    expect(component).toMatchSnapshot();
  });

  it("renders an empty progress bar if it is hidden", () => {
    const component = shallowComponentAsJson(<ProgressBar hidden={true} />);
    expect(component).toMatchSnapshot();
  });
});
