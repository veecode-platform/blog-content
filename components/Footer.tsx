"use client"

import { usePathname } from "next/navigation";
import { cx } from "../utils/cx";
import { baseClasses, NavItems } from "./Header";
import { ImGithub } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { RiDiscordFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";

const socialLinks = [
  {
    title: 'github',
    url: "https://github.com/orgs/veecode-platform/discussions",
    icon: <ImGithub size={30} />
  },
  {
    title: 'x',
    url: "https://twitter.com/veecodeplatform",
    icon: <FaXTwitter size={30}/>
  },
  {
    title: 'linkedin',
    url: "https://www.linkedin.com/showcase/veecode-platform/",
    icon: <FaLinkedin size={30}/>
  },
  {
    title: 'discord',
    url: "https://discord.com/invite/pREwxeVzAD",
    icon: <RiDiscordFill size={30}/>
  },
  {
    title: 'youtube',
    url: "https://www.youtube.com/@veecodeplatform-br",
    icon: <IoLogoYoutube size={30}/>
  }
]

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="py-10 mt-10 md:py-10 px-4 bg-darkcustom-400">
      {/* <h2 className="sr-only">Footer</h2> */}
      <div className="mx-auto max-w-7xl pt-2">

        <div className=" flex flex-col gap-6 md:flex-row justify-between items-center max-w-7xl px-5 md:px-10 text-center md:text-left external-link">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex space-x-4 md:justify-center xl:justify-start">
             {
                socialLinks.map(link=>(
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-platform-400 after:hidden"
                    aria-label="Thinkmill's Github page (opens in new window)"
                    key={link.title}
                  >
                    {link.icon}
                  </a>
                ))
              }
            </div>
            <p className="text-sm text-gray-200">
             Copyright &copy; {new Date().getFullYear()} VeeCode Platform. All rights reserved
            </p>
          </div>
          <p className="text-sm text-gray-200">
            Made with <span className="text-red-500">♥</span>  by the Veecode team.
          </p>
        </div>
      </div>
    </footer>
  );
}
