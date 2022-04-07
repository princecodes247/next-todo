/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

export default function Header({ children }: {children: any}) {
  return (
    <nav className="bg-gray-800 px-2 sm:px-8 py-4 gap-1 items-center flex flex-row justify-between">
      {children}
    </nav>
  );
}
