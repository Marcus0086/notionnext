import { getServerSession } from "next-auth";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { authOptions } from "@/components/auth/constants";

const getSession = async (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  const session = await getServerSession(...args, authOptions);
  return session;
};

export default getSession;
