"use client";

import { MdMoreHoriz } from "react-icons/md";
import { toast } from "react-toastify";

import { deleteSiteById } from "@/lib/actions/site";

import useToast from "@/hooks/useToast";

const MoreIcon = ({ siteId }: { siteId: string }) => {
  const toastOptions = useToast();

  const handleClick = async () => {
    const isDeleted = await deleteSiteById(siteId);
    if (isDeleted.success) {
      toast.info("Site deleted successfully!", toastOptions);
    } else {
      toast.error("Something went wrong!", toastOptions);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="rounded-full p-[2px] border-gray-700 border"
    >
      <MdMoreHoriz className="w-6 h-6 text-gray-700" />
    </button>
  );
};

export default MoreIcon;
