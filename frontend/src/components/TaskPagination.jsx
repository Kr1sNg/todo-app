import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const TaskPagination = ({
  handleNext,
  handlePrev,
  handleChange,
  page,
  totalPages
}) => {

  const generatePages = () => {
    const pages = [];

    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++)
        pages.push(i);
    } else {
      if (page <= 2) {
        pages.push(1, 2, '...', totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, '...', totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page, '...', totalPages);
      }
    }

    return pages;
  };

  const pagesToShow = generatePages();

  if (pagesToShow.length === 0)
    return (<div></div>);

  return (
    <div className='flex justify-center mt-4'>
      <Pagination>
        <PaginationContent>

          {/* back to prev */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={cn(
                'cursor-pointer',
                page === 1 && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>

          {pagesToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === '...'
                ? (<PaginationEllipsis />)
                : (<PaginationLink
                  isActive={p === page}
                  onClick={() => {
                    if (p !== page) handleChange(p);
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>)}
            </PaginationItem>
          ) )}

          {/* go to next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNext}
              className={cn(
                'cursor-pointer',
                page === totalPages && 'pointer-events-none opacity-50'
              )}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskPagination;