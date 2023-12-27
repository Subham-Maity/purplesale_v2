"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [infoData, setInfoData] = useState({ title: "" });
  const [web3Data, setWeb3Data] = useState({ web3title: "" });
  const [title, setTitle] = useState([]);
  const [web3title, setWeb3Title] = useState([]);
  const web2Title = title.map((title: any) => title.title);
  const web3Title = web3title.map((web3title: any) => web3title.title);

  const web3TitleLength = web3Title.length;
  const web2TitleLength = web2Title.length;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };
  const handleOnChange2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setWeb3Data({ ...web3Data, [e.target.name]: e.target.value });
  };

  const handleCombinedButtonClick = async () => {
    try {
      // Call handleHeartButtonClick2
      const web3LengthBefore = web3Title.length;
      await handleHeartButtonClick2(web3Data.web3title);

      // Check if web3Title length increased and if there's a matching ID in web2
      const web3LengthAfter = web3Title.length;
      const lastIndexInWeb2 = web2Title.findIndex(
        (title) => title === web3Data.web3title,
      );

      if (web3LengthAfter > web3LengthBefore && lastIndexInWeb2 !== -1) {
        await handleHeartButtonClick(infoData.title, web3LengthAfter);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleHeartButtonClick = async (
    title: string,
    id = web3Title.length + 1,
  ) => {
    const postData = {
      title: title,
      id: id,
    };
    try {
      await axios.post("http://localhost:5000/save-data-pinklock", postData);
      // Fetch data again if needed
      fetchWeb2Data();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleHeartButtonClick2 = async (title: string) => {
    const postData = {
      title: title,
    };
    try {
      await axios.post(
        "http://localhost:5000/save-data-pinklock-web3",
        postData,
      );
      // Fetch data again if needed
      fetchWeb3Data();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchWeb2Data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/fetch-data-pinklock",
      );
      setTitle(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb3Data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/fetch-data-pinklock-web3",
      );
      setWeb3Title(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchWeb2Data();
    fetchWeb3Data();
  }, [web3TitleLength]);

  const idWeb2 = title.map((title: any) => title.id);
  const backendId = web3title.map((web3title: any, index: number) => index + 1);

  const combinedTitle = web3Title.map((web3TitleItem, index) => {
    const matchIndex = idWeb2.indexOf(index + 1);
    if (matchIndex !== -1) {
      return `${index + 1}. ${web2Title[matchIndex]} ${web3TitleItem}`;
    } else {
      return `Undefined ${web3TitleItem}`;
    }
  });

  return (
    <main className="bg-gray-800 h-[2500px]">
      <Link href="https://www.twitter.com">
        <button>Testung</button>
      </Link>
      <p className="text-lg text-gray-200 flex justify-center p-4 font-bold">
        {" "}
        Testing{" "}
      </p>
      <p className="text-lg text-gray-200 flex justify-center p-4 font-bold">
        {" "}
        Frontend Length {web2TitleLength} Frontend id {idWeb2}
      </p>
      <p className="text-lg text-gray-200 flex justify-center p-4 font-bold">
        {" "}
        Backend Length {web3TitleLength} Backend id {backendId}
      </p>
      {combinedTitle.map((combined, index) => (
        <div key={index} className="flex justify-center mt-4 items-center">
          <div className="lg:w-[460px] bg-slate-700 rounded-md p-4">
            <div className="flex justify-between">
              <p>{combined}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="px-80">
        <label htmlFor="title" className="block mb-2 text-sm pl-6 font-medium">
          <strong> Web2 Title</strong>
        </label>
        <div className="mb-4 p-6">
          <input
            id="title"
            name="title"
            onChange={handleOnChange}
            type="text"
            placeholder="Ex: My Lock"
            required
            className="border border-gray-300 dark:text-neutral-200 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <div className="flex justify-between px-96">
        <p className="text-lg text-gray-200 flex justify-center p-4 font-bold">
          {infoData.title}
        </p>
      </div>

      <div className="border-b-2 border-white"></div>
      {title.map((title: any, index: number) => (
        <div key={index} className="flex justify-center mt-4 items-center">
          <div className="lg:w-[1060px] bg-slate-700 rounded-md p-6 ">
            <div className="flex justify-between">
              <p>Title: {title.title}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="border-b-2 mt-4 border-white"></div>
      <div className="px-80">
        <label
          htmlFor="title"
          className="block mb-2 mt-4 text-sm pl-6 font-medium"
        >
          <strong>Web3 Title</strong>
        </label>
        <div className="mb-4 p-6">
          <input
            id="web3title"
            name="web3title"
            onChange={handleOnChange2}
            type="text"
            placeholder="Ex: My Lock"
            required
            className="border border-gray-300 dark:text-neutral-2900 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <div className="flex justify-between px-96">
        <p className="text-lg text-gray-200 flex justify-center p-4 font-bold">
          {web3Data.web3title}
        </p>
      </div>
      <div className="border-b-2 border-white"></div>
      {web3title.map((web3title: any, index: any) => (
        <div key={index} className="flex justify-center mt-4 items-center">
          <div className="lg:w-[1060px] bg-slate-700 rounded-md p-6 ">
            <div className="flex justify-between">
              <p>Title: {web3title.title}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="border-b-2 mt-4 border-white"></div>
      <p className="text-lg text-gray-200 flex justify-center p-4 font-bold">
        {" "}
        Before Problem{" "}
      </p>
      <div className="flex justify-between px-96">
        <button
          className="mt-3 border mb-3 gray-400 bg-indigo-500 hover:bg-indigo-400 items-center justify-center space-x-1 rounded-lg py-2 px-2 text-gray-700 dark:text-gray-100 cursor-pointer"
          onClick={handleCombinedButtonClick}
        >
          Save
        </button>
      </div>
      <p className="text-lg text-gray-200 flex justify-center p-4 font-bold"></p>
    </main>
  );
}
