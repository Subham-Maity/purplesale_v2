import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import FormContext from "@/contexts/create/FormContext";

interface PrivateSale {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const BeforeYouStart: React.FC<PrivateSale> = ({
  chngeVal,
  onStepValidation,
}) => {
  const { routerSelect, setRouterSelect } = useContext(FormContext);
  const { infoData, setInfoData } = useContext(FormContext);

  // Add a new state to hold the selected currency
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    setSelectedCurrency(event.target.value);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return infoData.title !== "";
  };
  const { currency, setCurrency } = useContext(FormContext);
  const getCurrencyText = (): string => {
    switch (selectedCurrency) {
      case "MATIC":
        return "Users will pay with MATIC for your token";
      case "USDT":
        return "Users will pay with USDT for your token";
      case "USDC":
      default:
        return "Users will pay with USDC for your token";
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
        <div>
          <label htmlFor="liquidity" className="block mb-2 text-sm font-medium">
            <strong>Title</strong>
            <span className="ml-1 text-red-500">*</span>
          </label>
          <div className="mb-4">
            <input
              id="title"
              name="title"
              onChange={handleOnChange}
              type="text"
              placeholder="Ex: This is the private sale of the token"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-lg mb-2" htmlFor="currency">
            Currency
          </label>
          <div className="flex flex-col space-y-2 items-start">
            <div className="flex items-center">
              <input
                type="radio"
                id="maticCurrency"
                name="currency"
                value="MATIC"
                checked={currency === "MATIC"}
                onChange={handleCurrencyChange}
                className="mr-2"
              />
              <label htmlFor="maticCurrency">MATIC</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="usdtCurrency"
                name="currency"
                value="USDT"
                checked={currency === "USDT"}
                onChange={handleCurrencyChange}
                className="mr-2"
              />
              <label htmlFor="usdtCurrency">USDT</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="usdcCurrency"
                name="currency"
                value="USDC"
                checked={currency === "USDC"}
                onChange={handleCurrencyChange}
                className="mr-2"
              />
              <label htmlFor="usdcCurrency">USDC</label>
            </div>
          </div>
          <p className="mt-2">Users will pay with {currency} for your token</p>
        </div>
      </div>
    </div>
  );
};

export default BeforeYouStart;
