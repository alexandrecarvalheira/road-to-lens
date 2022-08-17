/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useQuery } from "@apollo/client";
import fetchDefaultProfile from "../queries/fetchDefaultProfile";
import { Avatar } from "flowbite-react";

import Link from "next/link";

export default function Header({ account, connectLens, isLensConnected }) {
  const { loading, error, data } = useQuery(fetchDefaultProfile, {
    variables: {
      request: { ethereumAddress: account },
    },
  });
  const connectToLens = async () => {
    if (data.defaultProfile) {
      await connectLens();
    } else {
      alert("you dont have a lens handle");
    }
  };

  if (loading) return "";
  if (error) return `Error! ${error.message}`;

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href={"/"}>
              <a>
                <span className="sr-only">Lens</span>
                <img
                  className="h-10 w-auto sm:h-20"
                  src="https://files.readme.io/a0959e6-lens-logo1.svg"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link href={"/"}>
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Home
              </a>
            </Link>
            <Link href={"/recommendedprofiles"}>
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Recommended Profiles
              </a>
            </Link>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {isLensConnected ? (
              <div className="hidden md:flex">
                <Avatar
                  className="hidden md:flex"
                  img={
                    data.defaultProfile
                      ? data.defaultProfile.picture.original.url
                      : ""
                  }
                  rounded={true}
                >
                  <div className=" font-medium text-gray-500">
                    <div>
                      {data.defaultProfile ? data.defaultProfile.handle : ""}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Followers:
                      {data.defaultProfile
                        ? data.defaultProfile.stats.totalFollowers
                        : ""}
                    </div>
                  </div>
                </Avatar>
              </div>
            ) : (
              <a
                onClick={connectToLens}
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
              >
                {`Connect to Lens`}
              </a>
            )}
            <Link
              href={
                !data.defaultProfile
                  ? "#"
                  : `/profile/${data.defaultProfile.id}`
              }
            >
              <a
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
              >
                {`${account.substr(0, 4)}...${account.substr(
                  account.length - 4
                )}`}
              </a>
            </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://files.readme.io/a0959e6-lens-logo1.svg"
                    alt="Workflow"
                  />
                </div>
                {isLensConnected ? (
                  <Link
                    href={
                      !data.defaultProfile
                        ? "#"
                        : `/profile/${data.defaultProfile.id}`
                    }
                  >
                    <a
                      href="#"
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      {`${account.substr(0, 4)}...${account.substr(
                        account.length - 4
                      )}`}
                    </a>
                  </Link>
                ) : (
                  <a
                    onClick={connectToLens}
                    href="#"
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    {`Connect to Lens`}
                  </a>
                )}
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link href={"/"}>
                    <a
                      href="#"
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      Home
                    </a>
                  </Link>
                  <Link href={"/recommendedprofiles"}>
                    <a
                      href="#"
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      Recommended Profiles
                    </a>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
