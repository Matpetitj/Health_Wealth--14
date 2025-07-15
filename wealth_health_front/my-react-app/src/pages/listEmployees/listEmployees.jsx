import "./listEmployees.scss";
import { useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

// Utilitaire pour formater une date en yyyy-MM-dd
const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

function ListEmployees() {
  const employees = useSelector((state) => state.employees?.employees) || [];

  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(() => [
    { header: "Prénom", accessorKey: "firstName" },
    { header: "Nom", accessorKey: "lastName" },
    {
      header: "Date d'entrée",
      accessorKey: "startDate",
      cell: ({ getValue }) => formatDate(getValue())
    },
    { header: "Département", accessorKey: "department" },
    {
      header: "Date de naissance",
      accessorKey: "dateOfBirth",
      cell: ({ getValue }) => formatDate(getValue())
    },
    { header: "Rue", accessorKey: "street" },
    { header: "Ville", accessorKey: "city" },
    { header: "Pays", accessorKey: "state" },
    { header: "Code postal", accessorKey: "zipCode" },
  ], []);

  const table = useReactTable({
    data: employees,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="listEmployee_container">
      <h1 className="listEmployee_title">Liste des employés</h1>

      <div className="listEmployee_controls">
        <div className="listEmployee_showEntries">
          <label htmlFor="pageSize">Afficher</label>
          <select
            id="pageSize"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span>entrées</span>
        </div>

        <div className="listEmployee_search">
          <label htmlFor="search">Recherche :</label>
          <input
            id="search"
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Rechercher..."
          />
        </div>
      </div>

      <div className="listEmployee_tableWrapper">
        <table className="listEmployee_table">
          <thead className="listEmployee_thead">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="listEmployee_row">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="listEmployee_th"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" ? " ▲" : header.column.getIsSorted() === "desc" ? " ▼" : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="listEmployee_tbody">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="listEmployee_row">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="listEmployee_td">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="listEmployee_footer">
        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </strong>
        </span>

        <div className="listEmployee_paginationButtons">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Précédent
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListEmployees;
