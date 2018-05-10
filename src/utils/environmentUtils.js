export function productionEnvironment() {
  return process.env.NODE_ENV === "production";
}

export function developmentEnvironment() {
  return !productionEnvironment();
}
