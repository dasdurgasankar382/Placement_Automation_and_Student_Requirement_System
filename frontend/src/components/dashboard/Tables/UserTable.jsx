import React from "react";
import Avatar from "../Avatar";

const UserTable = ({ title, data = [], columns = [], role = "DEFAULT" }) => {
  return (
    <div className="bg-bg-dark-component/80 backdrop-blur-md rounded-2xl border border-slate-700/50 flex flex-col shadow-lg h-full overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-700/50 flex-none">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      </div>

      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-bg-light-primary-text/50 text-slate-400 font-medium">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-6 text-center text-slate-500">
                  No activity found.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-slate-900/30 transition-colors duration-200"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
