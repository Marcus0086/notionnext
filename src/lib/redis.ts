"use server";

import { createClient } from "redis";

const getRedisClient = async () => {
  const client = createClient({
    url: process.env.REDIS_URL,
  });
  await client.connect();
  return client;
};

export { getRedisClient };
