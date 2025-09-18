// src/components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
  if (totalPage <= 1) return null;

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md text-sm ${
            currentPage === page
              ? "bg-orange-500 text-white font-bold"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === totalPage
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
