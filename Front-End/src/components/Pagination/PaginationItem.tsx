

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({isCurrent = false, number, onPageChange}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button  
        disabled 
        className={`relative block py-1.5 px-3 rounded border-0 
        bg-blue-600 outline-none transition-all duration-300 
        text-white hover:text-white hover:bg-blue-600 shadow-md 
        focus:shadow-md`}
      >
          {number}
      </button>
    )
  }

  return (
    <button 
      className="relative block py-1.5 px-3 rounded border-0 bg-transparent 
      outline-none transition-all duration-300 text-gray-800 
      hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )


}