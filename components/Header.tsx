"use client"

import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import { cx } from "../utils/cx";
import React from "react";
const VeeCodeLogo = "/logo/logo.png"

export const baseClasses =
  "no-underline justify-center items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 text-gray-400 px-0 hover:text-gray-200 hover:bg-none bg-none font-medium shrink-0";

export const NavItems = [
  {
    name: "Home",
    slug: "/",
    description:
      "A collection of readings on the power and potential of VeeCode Platform",
  },
  {
    name: "Docs",
    slug: "https://docs.platform.vee.codes/",
    description: "A Tool to automate OpenAPI applications development.",
  },
];

const VeecodeBanner = () => {
  return (
    <div className="hidden md:block py-3 external-link bg-gradient-to-r from-platform-700 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white fill-white text-center text-sm">
       Visit our website, and get to know the{" "}
      <img className="my-0 inline" width="20" src="/veecode.svg" alt="VeeCode logo" />{" "}
      <strong className="text-white">VeeCode Platform devportal</strong>.{" "}
      <a
        href="https://platform.vee.codes/"
        className="text-white hover:text-text-cyan-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
        <span className="sr-only">opens in a new tab</span>
      </a>
    </div>
  );
};

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const MobileMenu = () => {
    return (
      <div className="w-full p-2 divide-gray-50 rounded-lg bg-darkcustom-400 shadow-lg z-10 float-right transition-all ease-in-out delay-300">
        {/* Nav items */}
        <div className="grid grid-flow-row not-prose pb-20">
          {NavItems.map((item) => (
            <a
              key={item.slug}
              className={
                "pb-5 first:pt-3 px-3 last:pb-3 pt-5  border-spacing-2 last:border-b-0 no-underline text-gray-300 hover:text-gray-200 text-center text-xl "
              }
              href={item.slug}
              target={item.slug.includes("http") ? "_blank" : "_self"}
            >
              <p
                className={cx(
                  pathname === item.slug ? "text-platform-400" : "",
                  "my-0 pb-2 font-bold"
                )}
              >
                {item.name}
              </p>
              {/* <p className="my-0">{item.description}</p> */}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="prose max-w-none border-b-0 md:border-b-0 border-slate-100 mb-10 md:mb-20">
      <VeecodeBanner/>
      <div className="flex justify-between items-center px-4 md:px-28 h-navbar py-4 md:py-10 bg-darkcustom-400">
        <a
          className="no-underline text-xl font-bold"
          href="/"
          aria-label="Link to home page"
        >
          <Image src={VeeCodeLogo} width={150} height={50} alt="VeeCode Platform Logo" />
        </a>
        {/* Mobile Hamburger Icon button */}
        <nav className="-mr-2 min-[768px]:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-darkcustom-400 p-2 text-gray-400 hover:bg-darkcustom-700 hover:text-gray-200 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                className="h-6 w-6 stroke-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6 stroke-platform-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg>
            )}
          </button>
        </nav>
        {/* Desktop nav */}
        <nav className="items-center space-x-8 hidden min-[768px]:flex">
          {NavItems.map((item) => (
            <a
              key={item.slug}
              className={cx(
                baseClasses,
                pathname === item.slug
                  ? "border-text-cyan-700 border-b-2 border-platform-500"
                  : "border-transparent"
              )}
              href={item.slug}
              target={item.slug.includes("http") ? "_blank" : "_self"}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
      {menuOpen ? <MobileMenu /> : null}
    </header>
  );
};

export default Header;
