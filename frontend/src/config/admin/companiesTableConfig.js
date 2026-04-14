import React from "react";
import { Building2 } from "lucide-react";

export const companiesTableConfig = {
  columns: [
    {
      header: "ID",
      accessor: "id",
      hideOnMobile: true
    },
    {
      header: "Company Name",
      cellClassName: "font-medium text-slate-900 dark:text-white flex items-center gap-2",
      render: (row) => React.createElement('div', {
        className: "flex items-center gap-2"
      }, [
        React.createElement(Building2, { key: 'icon', className: "h-4 w-4 text-purple-500" }),
        React.createElement('span', { key: 'name' }, row.name)
      ])
    },
    {
      header: "Website",
      render: (row) => React.createElement('a', {
        href: row.website,
        target: "_blank",
        rel: "noreferrer",
        className: "text-blue-500 hover:underline"
      }, row.website),
      hideOnMobile: true
    },
    {
      header: "Location",
      accessor: "location",
      hideOnMobile: true
    },
    {
      header: "Status",
      render: (row) => React.createElement('span', {
        className: `px-2 py-1 text-xs rounded-full font-medium ${
          row.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
          'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
        }`
      }, row.status)
    }
  ]
};