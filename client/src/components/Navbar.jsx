import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { data } from "./data";
import Logo from "../assets/img/logo.png";
import { iconlink } from "./data";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MenuItem({ item }) {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 overflow-hidden ">
      <div className="flex-auto w-40 text-start  ">
        <NavLink
          to={item.path}
          className="block font-normal text-gray-50 relative overflow-hidden"
        >
          {item.name}
          <span className="absolute inset-0 before:absolute before:inset-0 before:border-b-2 before:border-yellow-500 before:transform before:translate-x-full before:transition-transform hover:before:translate-x-0">
            {item.name}
          </span>
        </NavLink>
        <p className="mt-1 text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`border drop-shadow-lg border-none ${
        sticky ? "fixed top-0 w-full bg-white z-50 " : ""
      }`}
    >
      <nav
        className="mx-auto flex max-w-12xl items-center justify-between lg:px-8 pt-1"
        aria-label="Global"
      >
        <div className="flex">
          <a href="#" className="-m-2 mt-1 p-1.5">
            <img className="h-16" src={Logo} alt="" />
          </a>
        </div>
        <div className="flex xl:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon
              className="h-10 w-10 bg-blue-800 p-2 text-gray-50 rounded-full mx-7"
              aria-hidden="true"
            />
          </button>
        </div>
        <Popover.Group className="hidden mx-10 xl:flex xl:gap-x-5 border-b border-gray-500 z-30">
          {data.map((item) => (
            <Popover key={item.name} className="relative">
              <Popover.Button className="flex gap-x-2 text-sm font-normal leading-6 text-blue-800 focus:outline-none relative bg-transparent py-3.5 px-1.5 uppercase transition-colors before:absolute before:left-0 before:bottom-0 before:-z-10 before:h-full before:w-full before:origin-bottom-left  before:scale-y-0 before:bg-blue-800 before:rounded-t-xl before:font-medium before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-y-100  ">
                {item.name}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  className="absolute top-full left-0 right-auto z-10 mt-1 w-56 overflow-hidden rounded-lg bg-blue-800 shadow-lg ring-1 ring-gray-900/5"
                  style={{
                    transform:
                      item.name === "ติดต่อเรา"
                        ? "translateX(-60%)"
                        : "translateX(0%)",
                  }}
                >
                  <div className="">
                    {item.submenu ? (
                      <div>
                        {item.submenu.map((subitem) => (
                          <MenuItem key={subitem.name} item={subitem} />
                        ))}
                      </div>
                    ) : (
                      <MenuItem item={item} />
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          ))}
        </Popover.Group>
      </nav>
      <div className="flex flex-wrap mb-2 justify-end text-sm font-normal space-x-2 xl:mx-16 sm:mx-12">
        {iconlink.map((icon, i) => (
          <a key={i} href={icon.link} className="">
            <img className="h-10 w-auto" src={icon.img} alt="" />
          </a>
        ))}
      </div>
      <Dialog
        as="div"
        className="xl:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-10 w-auto" src={Logo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {data.map((item) => (
                <div key={item.name} className="space-y-2 py-6">
                  {item.submenu ? (
                    <Disclosure as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center  justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50">
                            {item.name}
                            <ChevronDownIcon
                              className={classNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {item.submenu.map((subitem) => (
                              <a
                                key={subitem.name}
                                href={subitem.path}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-normal leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {subitem.name}
                              </a>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <a
                      href={item.path}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
