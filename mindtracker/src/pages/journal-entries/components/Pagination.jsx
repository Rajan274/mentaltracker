import React from 'react';
import Button from '../../../components/ui/Button';


const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalEntries, 
  entriesPerPage, 
  onPageChange 
}) => {
  if (totalPages <= 1) return null;

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="morphic-card p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Results Info */}
        <div className="text-sm text-muted-foreground">
          Showing {startEntry} to {endEntry} of {totalEntries} entries
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconSize={16}
            className="w-9 h-9 p-0"
          >
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {visiblePages?.map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`dots-${index}`} className="px-2 py-1 text-muted-foreground">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="w-9 h-9 p-0"
                >
                  {page}
                </Button>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconSize={16}
            className="w-9 h-9 p-0"
          >
          </Button>
        </div>

        {/* Quick Jump */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">Go to:</span>
          <select
            value={currentPage}
            onChange={(e) => onPageChange(Number(e?.target?.value))}
            className="border border-border rounded px-2 py-1 bg-background text-foreground text-sm"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(page => (
              <option key={page} value={page}>
                Page {page}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;