import {
  AiOutlineDesktop,
  AiOutlineHome,
  AiOutlineMobile,
  AiOutlineTablet,
} from "react-icons/ai";
import { MdOutlineAccountCircle, MdHelpOutline } from "react-icons/md";
import { IoMdSettings, IoIosColorPalette } from "react-icons/io";
import {
  TbColorSwatch,
  TbLayoutNavbar,
  TbLayoutNavbarFilled,
} from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { IoOptionsOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { BsRobot } from "react-icons/bs";

import { Icons, IconFactory } from "@/types";

class DefaultIconFactory implements IconFactory {
  private static readonly iconsFactory: { [key in Icons]: IconType } = {
    home: AiOutlineHome,
    account: MdOutlineAccountCircle,
    help: MdHelpOutline,
    settings: IoMdSettings,
    design: IoIosColorPalette,
    theme: TbColorSwatch,
    seo: BiSearchAlt,
    pages: CgFileDocument,
    mobile: AiOutlineMobile,
    desktop: AiOutlineDesktop,
    tablet: AiOutlineTablet,
    options: IoOptionsOutline,
    nav: TbLayoutNavbarFilled,
    footer: TbLayoutNavbar,
    AI: BsRobot,
  };

  getIcon(icon: Icons): IconType {
    return DefaultIconFactory.iconsFactory[icon];
  }
}

const IconsFactory = new DefaultIconFactory();

export { IconsFactory };
