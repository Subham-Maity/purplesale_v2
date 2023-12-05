import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import DetailsFinishWrapper from "@/components/TailwindWrapper/Details/FinishPage";

interface AffiliateProgramProps {
  affiliateLink?: string;
  tokenAddress?: string;
}

const AffiliateProgram: React.FC<AffiliateProgramProps> = ({
  affiliateLink = "https://purplesale.vercel.app/",
  tokenAddress = "default-token-address",
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const completeLink = tokenAddress + "&refId=" + affiliateLink;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(completeLink);
    setIsCopied(true);
  };

  return (
    <DetailsFinishWrapper>
      <h1 className="text-xl font-bold dark:text-gray-200 text-gray-300">
        Affiliate Program
      </h1>
      <div className="flex items-center space-x-2 text-sm">
        <span className="flex items-center space-x-1 border rounded-lg p-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none">
          Affiliate Link:
        </span>
        <hr className="mt-16 h-px mx-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <input
          type="text"
          value={completeLink}
          readOnly
          className="border rounded-lg p-1 w-36 lg:w-96"
        />
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 border rounded-lg p-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none"
        >
          {isCopied ? <span>Copied!</span> : <span>Copy</span>}
          <FiCopy />
        </button>
      </div>
      <span className="mt-4 flex justify-between">
        <p>Pool Referrer Count </p>
        <p>0 </p>
      </span>
      <span className="mt-4 flex justify-between">
        <p>Realtime Reward Percentage </p>
        <p>100% </p>
      </span>
      <span className="mt-4 flex justify-between">
        <p>Current Rewards</p>
        <p>0 BNB</p>
      </span>
      <span className="mt-4 flex justify-between">
        <p>Min Rewards </p>
        <p>0.5 BNB</p>
      </span>
      <span className="mt-4 flex justify-between">
        <p>Total Ref Amount</p>
        <p>0 BNB</p>
      </span>
    </DetailsFinishWrapper>
  );
};

export default AffiliateProgram;
