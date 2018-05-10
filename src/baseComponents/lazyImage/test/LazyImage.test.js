import React from "react";
import LazyImage from "../LazyImage";
import { mountComponentAsJson } from "../../../testUtils/enzyme";

describe("LazyImage", () => {
  it("renders the image configured using the configured parameters", () => {
    const component = mountComponentAsJson(
      <LazyImage
        height={200}
        src={"https://images.com/1"}
        placeholder={"https://images.com/2"}
        alt={"Alternative text"}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
