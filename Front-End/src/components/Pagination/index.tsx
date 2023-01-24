import { PaginationItem } from "./PaginationItem";


interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export default function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2 mt-4 justify-center align-middle">
      <div className="">
        <strong>{registersPerPage * (currentPage - 1)}</strong> - <strong>{registersPerPage * currentPage}</strong> de <strong>{totalCountOfRegisters}</strong>
      </div>

      <div className="flex gap-2">
        

        {currentPage > 1 + siblingsCount && 
          <>
            <PaginationItem onPageChange={onPageChange} number={1}/>
            { currentPage > (2+ siblingsCount) && 
              <p className="text-black">...</p>
            }
          </>
        }

        {previousPages && (
          <>
            {previousPages.length > 0 &&
              previousPages.map((page) => {
                return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
              })}
          </>
        )}

        <PaginationItem onPageChange={onPageChange!} number={currentPage} isCurrent />

        {nextPages && (
          <>
            {nextPages.length > 0 &&
              nextPages.map((page) => {
                return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
              })}
          </>
        )}

        {currentPage + siblingsCount < lastPage && (
          <>
            { (currentPage + 1 + siblingsCount) < lastPage && <p>...</p>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </div>
    </div>
  );
}
