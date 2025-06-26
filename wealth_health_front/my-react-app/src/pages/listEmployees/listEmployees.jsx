import "./listEmployees.scss";
import { useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

function ListEmployees() {
    
    const employees = useSelector((state) => state.employees?.employees) || [];

    const columns = useMemo(
        () => [
        { header: "Prénom", accessorKey: "firstName" },
        { header: "Nom", accessorKey: "lastName" },
        { header: "Date d'entrée", accessorKey: "startDate" },
        { header: "Département", accessorKey: "department" },
        { header: "Date de naissance", accessorKey: "dateOfBirth" },
        { header: "Rue", accessorKey: "street" },
        { header: "Ville", accessorKey: "city" },
        { header: "Pays", accessorKey: "state" },
        { header: "Code postal", accessorKey: "zipCode" },
        ],
        []
    );

    const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="listEmployee_container">
        <h1 className="listEmployee_title">Liste des employés</h1>
        <div className="listEmployee_tableWrapper">
            <table className="listEmployee_table">
            <thead className="listEmployee_thead">
                {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="listEmployee_row">
                    {headerGroup.headers.map((header) => (
                    <th key={header.id} className="listEmployee_th">
                        {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                        )}
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
        </div>
    );
}

export default ListEmployees;
