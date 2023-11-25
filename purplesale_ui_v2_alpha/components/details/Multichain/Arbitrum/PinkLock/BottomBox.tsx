import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BgPinklockToken from "@/components/TailwindWrapper/PinklockToken/BgPinkLock";

interface Column {
  id:
    | "amount"
    | "wallet"
    | "cycle"
    | "cycleRelease"
    | "tge"
    | "unlockTime"
    | "view";
  label: string;
  minWidth?: string;
  align?: "left" | "right";
}

interface DataRow {
  amount: number;
  wallet: string;
  cycle: number;
  cycleRelease: number;
  tge: number;
  unlockTime: string;
  view: string;
}

const Table = ({ columns, rows }: { columns: Column[]; rows: DataRow[] }) => {
  const router = useRouter();
  return (
    <div className="">
      <div className="">
        <div className="mt-4 overflow-x-auto rounded-lg mb-8 p-4">
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
                  key={row.wallet}
                  className="border-b-2 dark:border-stone-500/25 border-stone-100 hover:bg-stone-700/25 transition duration-300"
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className="py-2 px-4 text-sm"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.id === "view" ? (
                        <button
                          className="finishButton"
                          onClick={() => {
                            router.push(row.view); // Navigate to the specified link
                          }}
                        >
                          View
                        </button>
                      ) : (
                        row[column.id]
                      )}
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
  lockedAmount: number;
  wallet: string;
  cycle: number;
  cycleRelease: number;
  tge: number;
  unlockTime: string;
  view: string;
}

const All: React.FC<Props> = ({
  lockedAmount,
  wallet,
  cycle,
  cycleRelease,
  tge,
  unlockTime,
  view,
}) => {
  const rows: DataRow[] = [
    {
      amount: lockedAmount,
      wallet: wallet,
      cycle: cycle,
      cycleRelease: cycleRelease,
      tge: tge,
      unlockTime: unlockTime,
      view: view,
    },
  ];

  const columns: Column[] = [
    {
      id: "amount",
      label: "Amount",
      minWidth: "150px",
      align: "left",
    },
    {
      id: "wallet",
      label: "Wallet",
      minWidth: "150px",
      align: "left",
    },
    {
      id: "cycle",
      label: "Cycle(d)",
      minWidth: "150px",
      align: "left",
    },
    {
      id: "cycleRelease",
      label: "Cycle Release(%)",
      minWidth: "150px",
      align: "left",
    },
    {
      id: "tge",
      label: "TGE(%)",
      minWidth: "150px",
      align: "left",
    },
    {
      id: "unlockTime",
      label: "Unlock time(UTC)",
      minWidth: "150px",
      align: "left",
    },
    {
      id: "view",
      label: "View",
      minWidth: "100px",
      align: "left",
    },
  ];

  return (
    <BgPinklockToken>
      <Table columns={columns} rows={rows} />
    </BgPinklockToken>
  );
};

export default All;
