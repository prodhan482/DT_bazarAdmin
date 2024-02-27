import React from "react";

function PaginationControls({
  handlePreviousPageChange,
  handleNextPageChange,
  setPage,
  page,
  setLimit,
  totalPages,
  limit
}) {
  return (
    <div className="flex gap-4">
      <button
        className="p-4 bg-green-500 rounded text-white"
        onClick={handlePreviousPageChange}
      >
        Previous
      </button>

      <div className="w-1/6">
        <label className="block text-sm font-medium text-gray-700">
          Page:
        </label>
        <select
          value={page}
          onChange={(e) => {
            setPage(e.target.value);
          }}
          className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>
            Select Page Number
          </option>
          {Array.from({ length: totalPages }).map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </div>

      <div className="w-1/6">
        <label className="block text-sm font-medium text-gray-700">
          Limit:
        </label>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
          }}
          className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
        >
          <option key={1} value={10}>
            10
          </option>
          <option key={2} value={20}>
            20
          </option>
          <option key={3} value={30}>
            30
          </option>
        </select>
      </div>

      <button
        className="p-4 bg-green-500 rounded text-white"
        onClick={handleNextPageChange}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
