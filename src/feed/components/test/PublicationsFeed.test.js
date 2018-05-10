import React from "react";
import PublicationsFeed from "../PublicationsFeed";
import { shallowComponentAsJson } from "../../../testUtils/enzyme";
import { anyListOfPublications } from "../../../testMothers/publications";

describe("PublicationsFeed", () => {
  it("renders an empty publications feed", () => {
    const component = shallowComponentAsJson(
      <PublicationsFeed publications={[]} />
    );

    expect(component).toMatchSnapshot();
  });

  it("renders the publication feed based on the list of publications passed as props", () => {
    const component = shallowComponentAsJson(
      <PublicationsFeed publications={anyListOfPublications} />
    );

    expect(component).toMatchSnapshot();
  });
});
