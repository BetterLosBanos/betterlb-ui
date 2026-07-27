import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "./Button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onResultsPerPageChange: (limit: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  resultsPerPage,
  totalItems,
  onPageChange,
  onResultsPerPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  const start = (currentPage - 1) * resultsPerPage + 1;
  const end = Math.min(currentPage * resultsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center gap-4 border-t border-slate-200 bg-slate-50 p-4 md:flex-row md:justify-between">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500">
        <span>
          Showing{" "}
          <span className="font-bold text-slate-900">
            {Math.max(0, start)}-{Math.max(0, end)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-900">
            {totalItems.toLocaleString()}
          </span>
        </span>

        <div className="flex items-center gap-2">
          <span id="pagination-rows-label">Rows:</span>
          <select
            value={resultsPerPage}
            onChange={(e) => onResultsPerPageChange(Number(e.target.value))}
            aria-labelledby="pagination-rows-label"
            className="focus-visible:border-primary-500 focus-visible:ring-primary-500 h-8 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 focus-visible:ring-2 focus-visible:outline-none"
          >
            {[10, 20, 50, 100].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav className="isolate flex items-center gap-1 rounded-md shadow-sm">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Button>

        <div className="hidden gap-1 sm:flex">
          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 py-1 text-xs text-slate-400"
              >
                ...
              </span>
            ) : (
              <button
                key={idx}
                type="button"
                onClick={() => onPageChange(page as number)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  currentPage === page
                    ? "bg-primary-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
}
