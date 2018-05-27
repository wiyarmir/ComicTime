jest.mock("../../../i18n/i18n");
jest.mock(
  "../../../baseComponents/comicTimeLogo/ComicTimeLogo",
  () => "ComicTimeLogo"
);

import React from "react";
import { shallowComponentAsJson, translator } from "../../../testUtils/enzyme";
import { PurePublicationNotFound } from "../PublicationNotFound";

describe("PublicationNotFound", () => {
  it("shows the applicaiton logo and a message to indicate the publication couldn't be loaded", () => {
    const component = shallowComponentAsJson(
      <PurePublicationNotFound t={translator} />
    );
    expect(component).toMatchSnapshot();
  });
});
