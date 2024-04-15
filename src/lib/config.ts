const uuid = false;

const domainSuffix =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const httpPrefix =
  process.env.NODE_ENV === "development" ? "http://" : "https://";

export { uuid, domainSuffix, httpPrefix };
