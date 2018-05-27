jest.mock("../../../i18n/i18n");
jest.mock("../PublicationNotFound", () => "PublicationNotFound");
jest.mock(
  "../../../baseComponents/navigationBar/NavigationBar",
  () => "NavigationBar"
);
jest.mock("material-ui/List", () => "List");
jest.mock("material-ui/List/ListItem", () => "ListItem");
jest.mock("material-ui/Paper", () => "Paper");

import React from "react";
import { shallowComponentAsJson, translator } from "../../../testUtils/enzyme";
import { PurePublicationDetailScreen } from "../PublicationDetailScreen";
import { Some, None } from "monet";
import { anyPublication } from "../../../testMothers/publicationDetails";
const match = {
  params: {
    id: anyPublication.id
  }
};

describe("PublicationDetailScreen", () => {
  it("shows the progress bar while the publication is fetched", () => {
    const component = shallowComponentAsJson(
      <PurePublicationDetailScreen
        loading={true}
        match={match}
        onComponentMounted={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("shows the publication not found component if there was an error loading the publication by id", () => {
    const component = shallowComponentAsJson(
      <PurePublicationDetailScreen
        loading={false}
        publication={None()}
        error={Some("")}
        match={match}
        onComponentMounted={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("shows the publication information if it was loaded properly", () => {
    const component = shallowComponentAsJson(
      <PurePublicationDetailScreen
        t={translator}
        loading={false}
        publication={Some(anyPublication)}
        error={None()}
        match={match}
        onComponentMounted={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
