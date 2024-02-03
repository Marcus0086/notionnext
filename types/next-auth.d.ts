import { AccountType, Role } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    /**
     * The user's email address
     */
    email?: string | null;

    /**
     * The user's unique id number
     */
    id: string;

    /**
     * The users preferred avatar.
     * Usually provided by the user's OAuth provider of choice
     */
    image?: string | null;

    /**
     * The user's full name
     */
    name?: string | null;

    /**
     * The user's custom & public username viewable to others
     */
    username?: string | null;

    /**
     * The user's Role (ADMIN, USER)
     */
    role?: Role | null;

    /**
     * The user's Account (PRO, FREE, ENTERPRISE)
     */
    accountType?: AccountType | null;
  }
}
