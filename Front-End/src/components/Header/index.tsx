import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext, useState } from "react";
import { HeaderItems } from "./Items";
import { ActiveLink } from "./ActiveLink";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleMenuMobile = () => {
    return openMenu ? "block" : "hidden";
  };

  return (
    <header>
      <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center flex-1 ">
          <a href="https://flowbite.com" className="flex items-center ">
            <img
              src="/assets/logoShare.png"
              className="mr-3 h-6 sm:h-6"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center lg:order-2 ">
            <div
              className="flex items-center text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <div className="hidden lg:flex items-center justify-center text-lg">
                <span className="cursor-pointer text-lg mr-2 hover:text-[#1d4ed8] ">
                  {user?.username}
                </span>
                <BiLogOut
                  onClick={logout}
                  className="cursor-pointer text-lg hover:text-[#1d4ed8]"
                />
              </div>
            </div>

            <button
              onClick={() => setOpenMenu(!openMenu)}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={` ${handleMenuMobile()} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {HeaderItems.map((i, k) => (
                <ActiveLink key={k} link={i.link}>
                  {i.label}
                </ActiveLink>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
