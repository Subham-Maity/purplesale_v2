import React, { useEffect, useState } from "react";
import Tab from "@/components/Tabs/Tabs";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";
import Link from "next/link";
import { useAccount, useContractRead } from "wagmi";
import {
  airdropAbi,
  airdropAddress,
  ERC20Abi,
  pinkLockABI,
  pinkLockAddress,
} from "@/constants/Avalanche/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import dynamic from "next/dynamic";
import axios from "@/constants/axio";
import { useRouter } from "next/router";
import BgPinklockToken from "@/components/TailwindWrapper/PinklockToken/BgPinkLock";

interface Column {
  id: "token" | "amount" | "view";
  label: string;
  minWidth?: string;
  align?: "left" | "right";
  view?: string;
}

interface DataRow {
  token: string;
  amount: number[];
  view: string;
}

const Table = ({ columns, rows }: { columns: Column[]; rows: DataRow[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter((row) => {
    const token = row.token ? row.token.toLowerCase() : "";
    const query = searchQuery ? searchQuery.toLowerCase() : "";
    return token.includes(query) || row.amount.toString().includes(query);
  });

  return (
    <div>
      <div className="w-[370px] sm:w-[970px]  md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[1440px] rounded-md p-6">
        <input
          type="search"
          placeholder="Search by token address..."
          className="w-full  rounded-md py-2 px-2 dark:text-white  font-bold border border-[#aca4ff]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="mt-4 overflow-x-auto rounded-lg">
          <table className="min-w-full">
            <thead className="dark:dark:bg-[#4d4c91]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="py-2 px-4 text-left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <tr key={row.token}>
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className="py-2 px-4"
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

        <div className="flex justify-between items-center mt-4 ">
          <div className="text-sm ml-3">
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of{" "}
            {filteredRows.length} entries
          </div>
          <div className="space-x-6">
            <select
              className="border rounded-md py-1 px-2 text-sm lg:mr-20 bg-gray-800"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div className="flex mt-4 gap-4">
          <button
            className="finishButton ml-3"
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="finishButton "
            onClick={() => handleChangePage(page + 1)}
            disabled={(page + 1) * rowsPerPage >= filteredRows.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
const MyLock = ({
  amounts,
  titles,
  selectedIndices, // Add selectedIndices as a prop
}: {
  amounts: number[];
  titles: string[];
  selectedIndices: number[];
}) => {
  // Filter the data based on selected indices
  const rows = selectedIndices.map((index) => ({
    token: titles[index],
    amount: [amounts[index]],
    view: `/details/pinklock/${index + 1}`,
  }));
  const columns: Column[] = [
    {
      id: "token",
      label: "Liquidity token",
      minWidth: "350px",
      align: "left",
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: "350px",
      align: "left",
    },
    {
      id: "view",
      label: "View",
      minWidth: "50px",
      align: "right",
    },
  ];

  return <Table columns={columns} rows={rows} />;
};

const All = ({ amounts, titles }: { amounts: number[]; titles: string[] }) => {
  const rows = amounts.map((value, index) => ({
    token: titles[index],
    amount: [value],
    view: `/details/pinklock/${index + 1}`,
  }));
  const columns: Column[] = [
    {
      id: "token",
      label: "Liquidity token",
      minWidth: "350px",
      align: "left",
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: "350px",
      align: "left",
    },
    {
      id: "view",
      label: "View",
      minWidth: "50px",
      align: "right",
    },
  ];

  return <Table columns={columns} rows={rows} />;
};

interface Props {
  title: string;
}

const AvalanchePinklockToken = () => {
  const names = ["All Token", "My lock"];
  const icons = [BsCheckAll, MdOutlineGeneratingTokens];
  const [title, setTitle] = useState<Props[]>([]);
  const { address, isConnected } = useAccount();
  const testingAddress = "0x76ac0a51b9fE44f560d4419a8C4D4022Dc29AeAA";
  useEffect(() => {
    axios
      .get(`/fetch-data-pinklock/Avalanche`)
      .then((response: any) => {
        setTitle(response.data);
      })
      .catch((error: any) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  //✅ Step 0: Get the length of the array
  const { data: returnLength } = useContractRead({
    address: pinkLockAddress,
    abi: pinkLockABI,
    functionName: "returnLength",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  const dataLength: any = returnLength?.toString();
  const number = parseInt(dataLength) || title.length;

  //✅ Step1: Data from the contract
  const pinkLockArray = Array.from({ length: number }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: pinklock } = useContractRead({
      address: pinkLockAddress,
      abi: pinkLockABI,
      functionName: "locks",
      args: [index],
      onError(error: any) {
        console.log("Error", error);
        enqueueSnackbar(`Error creating presale ${error}`, {
          variant: "error",
        });
      },
    });
    return pinklock;
  });

  //My lock
  const { data: getUserInvested } = useContractRead({
    address: pinkLockAddress,
    abi: pinkLockABI,
    functionName: "getUserLocks",
    args: [address],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });
  //✅ Step2: Convert the data to JSON format
  const dataPinkLockString = JSON.stringify(pinkLockArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
  //My lock
  const dataPinkMyLockString = JSON.stringify(getUserInvested, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //✅ Step3: Check if the data is available
  if (!dataPinkLockString || !dataPinkMyLockString) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }
  //✅ Step4: Parse the data to JSON format
  const dataPinkLock = JSON.parse(dataPinkLockString);
  const dataPinkMyLock = JSON.parse(dataPinkMyLockString);

  //✅ Step5: Create the key for the data

  if (!dataPinkLock) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#4d4c91] bg-stone-50 rounded-md p-6 ">
          <p>Metamask is not connected</p>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✔️ Blockchain
  const Web3key = [
    "token",
    "beneficiary",
    "amount",
    "unlockTime",
    "claimedAmount",
    "vesting",
    "firstReleasePercentage",
    "vestingPeriod",
    "cycleReleasePercentage",
  ];
  //✅ Step6: Map the data to the key
  const dataMainPresale = dataPinkLock.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3key.length; i++) {
      if (item) {
        obj[Web3key[i]] = item[i];
      } else {
        obj[Web3key[i]] = null;
      }
    }
    return obj;
  });

  //✅ Step6.1:Decimal
  const PinkLockToken = dataMainPresale.map((item: any) => {
    return item.token;
  });

  //Decimals
  const decimalsPinkLock = PinkLockToken.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: decimals } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "decimals",
    });
    // return an object with the data property
    return { data: decimals };
  });

  const decimal = decimalsPinkLock.map((item: any) => {
    return item.data;
  });

  //✅ Step7: Additional logic
  // const idWeb2Auction = web2DataAuction.map((auction: any) => auction.id);

  const amount = dataMainPresale.map((item: any) => {
    return item.amount;
  });

  const dividedAmount = amount.map((item: any, index: any) => {
    if (decimal[index] !== 0) {
      return item / 10 ** decimal[index];
    } else {
      return 0;
    }
  });

  //Index of dataMainPresale
  const index = dataMainPresale.map((item: any, index: number) => {
    return index;
  });

  //Last Index of dataMainPresale
  const lastIndexOfDataMainPresale = index[index.length - 1];

  const idWeb2PinkLock = title.map((item: any) => item.id);

  const idWeb3Auction = lastIndexOfDataMainPresale + 1;

  // Create a new array of titles based on matchingIndex
  const mappedTitles = title
    .map((item) => item.title)
    .filter((_, index) => idWeb2PinkLock[index] <= idWeb3Auction);

  return (
    <BgPinklockToken>
      <div>
        <Tab tabs={names} icons={icons}>
          <All amounts={dividedAmount} titles={mappedTitles} />
          <MyLock
            amounts={dividedAmount}
            titles={mappedTitles}
            selectedIndices={dataPinkMyLock}
          />
        </Tab>
      </div>
    </BgPinklockToken>
  );
};

export default dynamic(() => Promise.resolve(AvalanchePinklockToken), {
  ssr: false,
});
