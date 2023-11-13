"use client";
import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const navigation = [
  {
    id: 1,
    name: "Trending",
    component: <ConnectButton />,
    current: false,
  },
  {
    id: 2,
    name: "Trending",
    component: <ConnectButton />,
    current: false,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <div className="ml-96 mt-12 fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl rounded-b-xl">
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className=" w-full fixed top-0 left-0 right-0 z-50  mx-auto max-w-8xl px-4 sm:px-6 lg:px-4 py-2 sm:py-2 lg:py-2 ">
              <div className="flex h-12 items-center justify-left">
                <div className="ml-4"></div>
                <div className="hidden md:block">
                  <div>
                    <div>
                      <div className="hidden md:flex items-center space-x-4">
                        {navigation.map((item) =>
                          // Check if the item has a 'component' property
                          item.component ? (
                            <div key={item.id}>{item.component}</div>
                          ) : null,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/*Mobile View*/}
            <Disclosure.Panel className="lg:mt-0 mt-28 xl:hidden rounded-sm bg-gradient-to-r from-zinc-400 via-neutral-400 to-slate-400 dark:from-zinc-800 dark:via-neutral-900 dark:to-slate-800">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) =>
                  // Check if the item has a 'component' property
                  item.component ? (
                    <div key={item.id}>{item.component}</div>
                  ) : null,
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
