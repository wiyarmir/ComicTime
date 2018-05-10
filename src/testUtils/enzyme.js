import React from "react";
import Enzyme from "enzyme";
import { createSerializer } from "enzyme-to-json";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import { MuiThemeProvider } from "material-ui";
import comicTimeTheme from "../theme";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
Enzyme.configure({ adapter: new Adapter() });

export function mockHistory() {
  return {
    go: jest.fn(),
    goBack: jest.fn()
  };
}

export function translator(key) {
  return key;
}

export function mountWithMuyThemeProvider(component) {
  return Enzyme.mount(
    <MuiThemeProvider muiTheme={comicTimeTheme}>{component}</MuiThemeProvider>
  );
}

export function mountComponent(component) {
  return Enzyme.mount(component);
}

export function mountComponentAsJson(component) {
  return toJson(mountComponent(component));
}

export function shallowComponent(component) {
  return Enzyme.shallow(component);
}

export function shallowComponentAsJson(component) {
  return toJson(shallowComponent(component));
}

export function json(component) {
  return toJson(component);
}
