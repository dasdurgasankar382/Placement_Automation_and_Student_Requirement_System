import { useNavigate } from "react-router-dom";

/**
 * Universal Data Table
 * Handles generic table rendering with an optional card header.
 */
const DataTable = ({ title, actionLabel, onAction, columns, data, navlink, onRowClick, emptyMessage = "No records found." }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-bg-light-component dark:bg-bg-dark-component rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      
      {/* Optional Card Header */}
      {(title || actionLabel) && (
        <div className="flex justify-between items-center p-6 lg:px-8 border-b border-slate-100 dark:border-slate-800">
          {title && <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>}
          {actionLabel && (
            <button 
              onClick={onAction ? onAction : () => navigate(navlink)} 
              className="bg-brand-purple hover:bg-brand-purple-hover hover:cursor-pointer text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-brand-purple/20 transition-all"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={`px-4 lg:px-6 xl:px-8 py-3 lg:py-4 font-semibold text-slate-500 dark:text-slate-400 text-xs lg:text-sm ${col.headerClassName || ""} ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`px-4 lg:px-6 xl:px-8 py-3 lg:py-5 text-xs lg:text-sm ${col.cellClassName || ""} ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 lg:px-6 lg:py-8 text-center text-slate-500 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
