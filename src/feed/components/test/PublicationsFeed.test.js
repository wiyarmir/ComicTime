import React from "react";
import PublicationsFeed from "../PublicationsFeed";
import {
  shallowComponent,
  shallowComponentAsJson
} from "../../../testUtils/enzyme";
import { anyListOfPublications } from "../../../testMothers/publications";
import { GridTile } from "material-ui";

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

  it("goes to the publication detail on click on the first item", () => {
    const onPublicationSelected = jest.fn();

    const component = shallowComponent(
      <PublicationsFeed
        publications={anyListOfPublications}
        onPublicationSelected={onPublicationSelected}
      />
    );
    component
      .find(GridTile)
      .first()
      .simulate("click");

    expect(onPublicationSelected).toBeCalledWith("deadpool-2017");
  });

  it("goes to the publication detail on click on the last item", () => {
    const onPublicationSelected = jest.fn();

    const component = shallowComponent(
      <PublicationsFeed
        publications={anyListOfPublications}
        onPublicationSelected={onPublicationSelected}
      />
    );
    component
      .find(GridTile)
      .last()
      .simulate("click");

    expect(onPublicationSelected).toBeCalledWith("volcanosaurus-2017");
  });
});
