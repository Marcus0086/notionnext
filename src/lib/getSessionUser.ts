import { getServerSession } from "next-auth";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { cache } from "react";

import { authOptions } from "@/components/auth/constants";

const getSessionUser = cache(
  async (
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) => {
    const session = await getServerSession(...args, authOptions);
    return session?.user;
  },
);

export default getSessionUser;
