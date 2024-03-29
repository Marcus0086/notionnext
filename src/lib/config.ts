const uuid = process.env.NODE_ENV === "development" ? true : false;

const domainSuffix =
  process.env.NODE_ENV === "development" ? "localhost:3000" : "guptaraghav.org";
const httpPrefix =
  process.env.NODE_ENV === "development" ? "http://" : "https://";

export { uuid, domainSuffix, httpPrefix };
