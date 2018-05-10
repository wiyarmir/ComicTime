jest.mock("node-uuid", () => {
  return {
    v4() {
      return "uuid";
    }
  };
});
