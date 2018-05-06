export function productionEnvironment() {
  return process.env.NODE_ENV === "production";
}
