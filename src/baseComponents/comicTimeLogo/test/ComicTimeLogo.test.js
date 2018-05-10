jest.mock("../../../i18n/i18n");
import React from "react";
import { PureComicTimeLogo } from "../ComicTimeLogo";
import { mountComponentAsJson, translator } from "../../../testUtils/enzyme";

describe("ComicTimeLogo", () => {
  it("renders the application comicTimeLogo as an image", () => {
    const component = mountComponentAsJson(
      <PureComicTimeLogo t={translator} />
    );
    expect(component).toMatchSnapshot();
  });
});
