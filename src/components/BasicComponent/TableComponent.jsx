const TableComponent = ({
  columns,
  data,
  onRowClick,
  currentPage = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
}) => {
  // Calculate totalPages from totalItems and pageSize (don't trust backend)
  const totalPages = Math.max(
  1,
  Math.ceil(totalItems / pageSize)
);


  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="no-scrollbar bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="max-h-[420px] overflow-auto no-scrollbar">
        <table className="min-w-full text-left border-collapse">
          <thead className="sticky top-0 z-30 bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="text-[#6A7282] text-[12px] font-medium uppercase leading-4 tracking-[0.6px] px-6 py-3 whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm bg-white">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => { console.log("ROw is clicked"); onRowClick && onRowClick(row, rowIndex)}}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap align-middle"
                    >
                      {col.render ? (
                        col.render(row[col.accessor], row)
                      ) : (
                        <div>
                          <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px]">
                            {row[col.accessor]}
                          </p>
                          {col.meta && (
                            <p className="font-poppins font-normal text-[12px] leading-4 tracking-[0px] text-[#6A7282]">
                              {row[col.meta]}
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION - Show when there's data and totalItems > pageSize */}
      {totalItems > 0 && totalPages > 0 && (
        <div className="flex items-center justify-between mt-6 px-6 pb-4">
          {/* Left info */}
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700">
              {Math.min(currentPage * pageSize, totalItems)}
            </span>{" "}
            of <span className="font-medium text-gray-700">{totalItems}</span>{" "}
            results
          </p>

          {/* Pagination controls - only show if more than 1 page */}
          {totalPages >= 1 && (
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              {/* Previous */}
              <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600
                     hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent 
                     disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Prev
              </button>

              {/* First page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => onPageChange(1)}
                    className="px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 
                             cursor-pointer transition-colors"
                  >
                    1
                  </button>
                  <span className="px-2 text-gray-400">…</span>
                </>
              )}

              {/* Middle pages */}
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
              ${
                page === currentPage
                  ? "bg-[#22aaa1] text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
                >
                  {page}
                </button>
              ))}
              {console.log("This is the value of the currentPages in the TableComponent", currentPage)}
              {console.log("This is the value of the totalItems in the TableComponent", totalItems)}
              {console.log("This is the value of the pageSize in the TablePages", pageSize)}
              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  <span className="px-2 text-gray-400">…</span>
                  <button
                    onClick={() => onPageChange(totalPages)}
                    className="px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 
                             cursor-pointer transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                disabled={currentPage === pageSize}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600
                     hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent 
                     disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableComponent;