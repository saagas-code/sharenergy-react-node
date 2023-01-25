import { useLocation, Link } from "react-router-dom";


interface Props {
  children: React.ReactNode;
  link: string;
}

export const ActiveLink = ({ children, link }: Props) => {
  const { pathname } = useLocation();
  let isActive = false

  if(pathname.includes(link)) {
    isActive = true
  }

  return (
    <li className="group">
      <Link
        to={link}
        className={`${isActive ? 'bg-primary-700 lg:bg-transparent lg:text-[#1d4ed8]  text-gray-50' : 'hover:bg-gray-200 lg:hover:transparent group-hover:text-[#1d4ed8]'} 
        block py-2 pr-4 pl-3  text-gray-700 border-b border-gray-100  
        lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 
        dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 
        dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
      >
        {children}
      </Link>
    </li>
  );
};
