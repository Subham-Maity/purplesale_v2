"use client";
import React, { useContext, useEffect, useState } from "react";
import type { RadioChangeEvent, TabsProps } from "antd";
import { ConfigProvider, Radio, Tabs, theme } from "antd";
import { useTheme } from "next-themes";
import FormContext from "@/contexts/create/FormContext";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
type TabPosition = "left" | "right" | "top" | "bottom";
import { useDisconnect } from "wagmi";

import Image from "next/image";
import axios from "@/constants/axio";
import BgUser from "@/components/TailwindWrapper/User/BgUser";

interface CartItem {
  _id: string;
  Name: string;
  Symbol: string;
  Link: string;
  WalletAddress: string;
  imgHref: string;
}
const SideTabs: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Favorited",
      children: <CartItems />,
    },
  ];
  const [mode, setMode] = useState<TabPosition>("left");

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };
  const { themes } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = useContext(FormContext);
  const router = useRouter();

  const isDarkMode = isDarkTheme;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition={mode}
          style={{ maxHeight: "400px", overflowY: "auto" }}
          items={items}
        />
      </ConfigProvider>
    </div>
  );
};

const CartItems = () => {
  const { address, isConnected } = useAccount();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    // Fetch cart items if the user is connected
    if (isConnected) {
      axios
        .get(`/getCart/Arbitrum/${address}`)
        .then((response: any) => {
          setCartItems(response.data);
        })
        .catch((error: any) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [isConnected, address]);

  const openInNewTab = (url: any) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleDeleteItem = (itemId: string) => {
    // Send a DELETE request to your server to delete the item by its ID
    axios
      .delete(`/deleteCart/Arbitrum/${itemId}`)
      .then((response: any) => {
        if (response.status === 200) {
          // Item deleted successfully, you can update the cartItems state if needed
          // For example, you can filter out the deleted item from cartItems
          setCartItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemId),
          );
          toast.success("Item deleted successfully!");
        } else {
          toast.error("Failed to delete item.");
        }
      })
      .catch((error: any) => {
        console.error("Error deleting item:", error);
        toast.error("Error deleting item.");
      });
  };

  return (
    <div>
      {cartItems.length > 0 && (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className="flex justify-between pl-6 pr-6 border-b-2 p-2 border-gray-400/25">
                  <div className="flex ">
                    <Image
                      height={200}
                      width={200}
                      className="rounded-full w-12 h-12 border-2 mr-4 lg:block hidden"
                      src={item.imgHref}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <p className="dark:text-gray-200 font-bold  text-md text-gray-700">
                        {item.Name}
                      </p>
                      <p className="dark:text-gray-200 text-md text-gray-700">
                        {item.Symbol}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-4">
                    <button
                      className="finishButton"
                      onClick={() => {
                        openInNewTab(item.Link);
                      }}
                    >
                      View
                    </button>
                    <button
                      className=" bg-red-400 flex justify-between whitespace-nowrap text-sm w-auto rounded-lg lg:px-3 lg:py-1 px-2 py-0.5 text-white border transition duration-300 hover:bg-red-600 transform hover:scale-105 hover:shadow-md hover:shadow-white hover:animate-pulse"
                      onClick={() => {
                        handleDeleteItem(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Index = () => {
  const { address, isConnected } = useAccount();

  const [isCopied, setIsCopied] = useState(false);
  const { disconnect } = useDisconnect();

  const handleCopyAddress = () => {
    if (address) {
      const textField = document.createElement("textarea");
      textField.innerText = address;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      document.body.removeChild(textField);

      setIsCopied(true);

      toast.success(address + " copied successfully!");
    } else {
      toast.error("Address is undefined or empty.");
    }
  };
  if (isConnected === false) {
    toast.error("Please connect your wallet to continue.");
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] rounded-md p-6 mt-5">
          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={1000}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <BgUser>
        <p className="text-gray-700 dark:text-gray-200 font-bold">
          Connected as{" "}
          <span className="text-[#aca4ff] dark:text-[#aca4ff] font-medium break-words">
            {address}
          </span>{" "}
          <button
            onClick={handleCopyAddress}
            className={`bg-blue-500 ${
              isCopied ? "bg-[#aca4ff]" : "hover:bg-blue-700"
            } text-white text-sm font-bold py-1 px-1 rounded inline-flex items-center ml-2`}
            disabled={isCopied}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={1000}
          />
        </p>
        <button
          className=" bg-red-500 flex mt-12 lg:mt-4 justify-between whitespace-nowrap text-sm w-auto rounded-lg lg:px-3 lg:py-1 px-2 py-0.5 text-white border transition duration-300 hover:bg-red-400 transform hover:scale-105 hover:shadow-md hover:shadow-white hover:animate-pulse"
          onClick={() => disconnect()}
        >
          Logout
        </button>
      </BgUser>
      <BgUser>
        <SideTabs />
      </BgUser>
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
