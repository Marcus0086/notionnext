"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LoadingComponent from "@/components/dashboard/loadingComponent";

const UserButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/login",
    });
    router.replace(data.url);
  };

  const { name, image, email } = useMemo(() => {
    const name = session?.user?.name || session?.user?.username;
    const image = session?.user?.image;
    const email = session?.user?.email;
    return {
      name,
      image,
      email,
    };
  }, [
    session?.user?.email,
    session?.user?.image,
    session?.user?.name,
    session?.user?.username,
  ]);
  return (
    <Suspense fallback={<LoadingComponent />}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-6 w-6 p-0 rounded-full focus:!ring-0"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={image || ""} alt={name || ""} />
              <AvatarFallback>{name || "U"}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/settings">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/account">Account</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleClick} className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Suspense>
  );
};

export default UserButton;
