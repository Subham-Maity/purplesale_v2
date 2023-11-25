import React from "react";

interface Column {
  id: "allocations" | "amount" | "symbol";
  label: string;
  minWidth?: string;
  align?: "left" | "right";
}

interface DataRow {
  allocations: string;
  amount: number;
  symbol: string;
}

const Table = ({ columns, rows }: { columns: Column[]; rows: DataRow[] }) => {
  return (
    <div className="">
      <div className="">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full">
            <thead className="border-b-2 dark:border-stone-900 border-stone-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="py-2 px-4 text-left text-sm"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y-2 dark:divide-stone-900 divide-stone-100 rounded-2xl">
              {rows.map((row) => (
                <tr
                  key={row.allocations}
                  className="border-b-2 dark:border-stone-500/25 border-stone-100 hover-bg-stone-700/25 transition duration-300"
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={`py-2 px-4 text-sm ${
                        column.align === "right" ? "text-right" : "text-left"
                      }`}
                      style={{ minWidth: column.minWidth }}
                    >
                      {row[column.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface Props {
  allocations: string;
  amount: number;
  symbol: string;
}

const All: React.FC<Props> = ({ allocations, amount, symbol }) => {
  const rows: DataRow[] = [
    {
      allocations,
      amount,
      symbol,
    },
  ];

  const columns: Column[] = [
    {
      id: "allocations",
      label: "",
      minWidth: "350px",
      align: "left",
    },
    {
      id: "amount",
      label: "",
      minWidth: "",
      align: "right",
    },
    {
      id: "symbol",
      label: "",
      minWidth: "",
      align: "right",
    },
  ];

  return <Table columns={columns} rows={rows} />;
};

export default All;
