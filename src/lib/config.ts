const uuid = process.env.NODE_ENV === "development" ? true : false;

const domainSuffix =
  process.env.NODE_ENV === "development" ? "localhost:3000" : "localhost:3000";
const httpPrefix =
  process.env.NODE_ENV === "development" ? "http://" : "http://";

export { uuid, domainSuffix, httpPrefix };
