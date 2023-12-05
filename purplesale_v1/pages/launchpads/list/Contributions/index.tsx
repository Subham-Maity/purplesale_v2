import React from "react";
// const cardData = [
//   {
//     Affiliate: "25",
//     imgHref:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
//     title: "Single Doge 1",
//     description: "Fair Launch - Max buy 0.388 BNB",
//     softcap: "soft",
//     currency: 1,
//     Progress: 90.62,
//     tokenValue: 19.06617445454576,
//     percentage: "80",
//     Liquidity: 51,
//     LockupTime: 30,
//     SalesEndIn: "2023-08-24T05:04",
//   },
//   {
//     Affiliate: "25",
//     imgHref:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
//     title: "Single Doge 1",
//     description: "Fair Launch - Max buy 0.388 BNB",
//     softcap: "soft",
//     currency: 1,
//     Progress: 90.62,
//     tokenValue: 19.06617445454576,
//     percentage: "80",
//     Liquidity: 51,
//     LockupTime: 30,
//     SalesEndIn: "2023-08-24T05:04",
//   },
//   {
//     Affiliate: "30",
//     imgHref:
//       "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png",
//     title: "Single Doge 2",
//     description: "Fair Launch - Max buy 0.388 BNB",
//     softcap: "soft",
//     currency: 1,
//     Progress: 75.21,
//     tokenValue: 14.123456789,
//     percentage: "70",
//     Liquidity: 60,
//     LockupTime: 45,
//     SalesEndIn: "2023-08-24T05:04",
//   },
// ];
const Contribution = () => {
  //   const pairs = [];
  //   for (let i = 0; i < cardData.length; i += 2) {
  //     pairs.push(cardData.slice(i, i + 2));
  //   }

  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
        <div className="flex flex-col md:flex-row mb-4 ">
          {/* Search */}
          <div className="md:w-full md:mb-0 md:mr-2 mt-2">
            <label
              htmlFor="default-search"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <input
              type="search"
              id="default-search"
              className="w-full h-8 p-1 pl-10 text-sm text-gray-900 border border-green-300 rounded-3xl bg-stone-50 focus:ring-green-500 focus:border-green-500 dark:bg-stone-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Enter token name or token symbol"
              required
            />
          </div>

          {/* Filters */}
          <div className="columns-2 md:columns-0 md:flex md:space-x-2 mt-2">
            {/* Filter By */}
            <div className="w-36 md:w-1/2 mb-2 md:mb-0">
              <label
                htmlFor="filterBy"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Filter By
              </label>
              <select
                id="filterBy"
                className=" bg-stone-50 border border-stone-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-1 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option>No Filter</option>
                <option selected>No Filter</option>
                <option value="KYC">KYC</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Inprogress">Inprogress</option>
                <option value="Filled">Filled</option>
                <option value="Ended">Ended</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Whitelist">Whitelist</option>
              </select>
            </div>
            {/* Pool Type */}

            {/* Sort Type */}
            <div className="md:w-1/2 mb-2 md:mb-0">
              <label
                htmlFor="sortType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sort Type
              </label>
              <select
                id="sortType"
                className=" bg-stone-50 border border-stone-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-1 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option selected>No Filter</option>
                <option value="Hard Cap">Hard Cap</option>
                <option value="Soft Cap">Soft Cap</option>
                <option value="LP percent">LP percent</option>
                <option value="Filled">Start Time </option>
                <option value="Start Time">End Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4 items-center justify-center">
          {cardData.map((cardData, index) => (
            <Cards data={[cardData]} key={index} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Contribution;
