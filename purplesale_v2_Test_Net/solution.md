```tsx
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import {
    createAbi,
    createAddress,
    dutchAuctionAbi,
    dutchAuctionAddress,
    ERC20Abi,
    fairLaunchAbi,
    fairLaunchAddress,
    privSaleAbi,
    privSaleAddress,
    subAbi,
    subAddress,
} from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import PreSaleCards from "@/components/Cards/Launchpads/PreSaleCards";
import FairLaunchCards from "@/components/Cards/Launchpads/FairLaunchCards";
import DutchAuctionCards from "@/components/Cards/Launchpads/dutchAuctionCards";
import SubscriptionCards from "@/components/Cards/Launchpads/SubscriptionCards";

const All = () => {
    const [poolType, setPoolType] = useState("all");
    const handlePoolTypeChange = (newPoolType: any) => {
        setPoolType(newPoolType);
    };

    //✅ Step1: Get the data from the contract

    //Private Sale
    const { data: privsales } = useContractRead({
        address: privSaleAddress,
        abi: privSaleAbi,
        functionName: "privsales",
        args: [0],
        onError(error: any) {
            console.log("Error", error);
            enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
        },
    });

    //✅ Step2: Convert the data to string
    const dataPrivString = JSON.stringify(privsales, (key, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    });

    //✅ Step3: Check if the data is available
    useEffect(() => {
        console.log("Run something");
    }, []);
    if (!dataPrivString) {
        return (
            <div className="flex justify-center items-center">
                <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
                    <InfinitySpin width="200" color="#4fa94d" />
                </div>
            </div>
        );
    }

    //✅ Step4: Parse the data to JSON
    //Private Sale
    const parsedDataPriv = ["subham", "subhasish", "rohit"];

    //✅ Step9: Get the data for proper iteration and display of the data in the card

    // Subscription
    const mappedDataAuction = parsedDataPriv.map((item: any, index: number) => ({
        item1: parsedDataPriv[0],
        item2: parsedDataPriv[1],
        item3: parsedDataPriv[2],
    }));

    //✅ Step10: Additional Calculations

    return (
        <div className="flex justify-center items-center">
            <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
                <p className="break-words">
                    <div>
                        <p>
                            <p className="break-words">
                                {" "}
                                {mappedDataAuction.map(
                                    (item: any, index: number) => item.item1 + " ",
                                )}
                            </p>
                            <p>
                                {" "}
                                {mappedDataAuction.map(
                                    (item: any, index: number) => item.item2 + " ",
                                )}
                            </p>
                            <p className="break-words ">
                                {mappedDataAuction.map(
                                    (item: any, index: number) => item.item3 + " ",
                                )}
                            </p>
                        </p>
                    </div>

                    {/* You can render other properties of dataItem here */}
                </p>
            </div>
        </div>
    );
};
//uncomment if you can ignore hydration error
// export default All;

//Hydration Problem Resolved by using dynamic import
export default dynamic(() => Promise.resolve(All), { ssr: false });

```

Actual Problem is same item is getting repeated in all the cards. I want to display different items in different cards.
`problem`
```ts
const parsedDataPriv = ["subham", "subhasish", "rohit"];

//✅ Step9: Get the data for proper iteration and display of the data in the card

// Subscription
const mappedDataAuction = parsedDataPriv.map((item: any, index: number) => ({
    item1: parsedDataPriv[0],
    item2: parsedDataPriv[1],
    item3: parsedDataPriv[2],
}));

mappedDataAuction.map(
    (item: any, index: number) => item.item1 + " ",
)
mappedDataAuction.map(
    (item: any, index: number) => item.item2 + " ",
)
mappedDataAuction.map(
    (item: any, index: number) => item.item3 + " ",
)

//output 
//subham subham subham
//subhasish subhasish subhasish
//rohit rohit rohit
```

`solution`
Outeput Should be
subham
subhasish
rohit
```ts
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import {
  createAbi,
  createAddress,
  dutchAuctionAbi,
  dutchAuctionAddress,
  ERC20Abi,
  fairLaunchAbi,
  fairLaunchAddress,
  privSaleAbi,
  privSaleAddress,
  subAbi,
  subAddress,
} from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import PreSaleCards from "@/components/Cards/Launchpads/PreSaleCards";
import FairLaunchCards from "@/components/Cards/Launchpads/FairLaunchCards";
import DutchAuctionCards from "@/components/Cards/Launchpads/dutchAuctionCards";
import SubscriptionCards from "@/components/Cards/Launchpads/SubscriptionCards";

const All = () => {
  const [poolType, setPoolType] = useState("all");
  const handlePoolTypeChange = (newPoolType: any) => {
    setPoolType(newPoolType);
  };

  //✅ Step1: Get the data from the contract

  //Private Sale
  const { data: privsales } = useContractRead({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "privsales",
    args: [0],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  //✅ Step2: Convert the data to string
  const dataPrivString = JSON.stringify(privsales, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //✅ Step3: Check if the data is available
  useEffect(() => {
    console.log("Run something");
  }, []);
  if (!dataPrivString) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✅ Step4: Parse the data to JSON

  const parsedDataPriv = ["subham", "24", true];

  const item1 = parsedDataPriv[0];
  const item2 = parsedDataPriv[1];
  const item3 = parsedDataPriv[2];

  //✅ Step9: Get the data for proper iteration and display of the data in the card

  // Subscription
  const mappedDataAuction = parsedDataPriv.map((item: any, index: number) => ({
    item1: parsedDataPriv[0],
    item2: parsedDataPriv[1],
    item3: parsedDataPriv[2],
  }));

  //✅ Step10: Additional Calculations

  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
        <p className="break-words">
          <div>
            <p>
              {mappedDataAuction.map((dataItem: any, index: number) => (
                <div key={index}>
                  <p>{dataItem.item1}</p>
                  <p>{dataItem.item2}</p>
                  <p>{dataItem.item3 ? "true" : "false"}</p>
                </div>
              ))}
            </p>
            <p className="text-blue-400">{item1}</p>
            <p className="text-blue-400">{item2}</p>
            <p className="text-blue-400">{item3 ? "true" : "false"}</p>
          </div>

          {/* You can render other properties of dataItem here */}
        </p>
      </div>
    </div>
  );
};
//uncomment if you can ignore hydration error
// export default All;

//Hydration Problem Resolved by using dynamic import
export default dynamic(() => Promise.resolve(All), { ssr: false });

```

```ts

Wrong ❌❌
const parsedDataPriv = ["subham", "subhasish", "rohit"];

//✅ Step9: Get the data for proper iteration and display of the data in the card

// Subscription
const mappedDataAuction = parsedDataPriv.map((item: any, index: number) => ({
    item1: parsedDataPriv[0],
    item2: parsedDataPriv[1],
    item3: parsedDataPriv[2],
}));

mappedDataAuction.map(
    (item: any, index: number) => item.item1 + " ",
)
mappedDataAuction.map(
    (item: any, index: number) => item.item2 + " ",
)
mappedDataAuction.map(
    (item: any, index: number) => item.item3 + " ",
)

Right ✅✅
const parsedDataPriv = ["subham", "subhasish", "rohit" ];

const item1 = parsedDataPriv[0];
const item2 = parsedDataPriv[1];
const item3 = parsedDataPriv[2];

//✅ Step9: Get the data for proper iteration and display of the data in the card

// Subscription



```

# Problem 

How to retrieve data from an array of struct in solidity 
In my case I got this data something like this ["0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832","0x76ac0a51b9fE44f560d4419a8C4D4022Dc29AeAA",false,"1000000000000000000","2000000000000000000","0","1000000000000000000","2000000000000000000","1692435420","1692521820","0","10","10","90"]
and this data will create an card but there but in javascript I need to convert this in json object to rotate so I need this in key value pair 
1. First question how to get this in key value pair ? 
like address : 0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832 , 2ndAddress : 0x76ac0a51b9fE44f560d4419a8C4D4022Dc29AeAA , Whitelist : false ,
2. Second question how to get this data in object so every object will be one card so if I map over the array how many objects are there that cards will replicate that much so here I have two question 
2.1 how array should looks like which is return by the solidity code?
2.2 how to convert it in json format so that data will looks like 
[{address : 0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832 , 2ndAddress : 0x76ac0a51b9fE44f560d4419a8C4D4022Dc29AeAA , Whitelist : false ,....} , {address : 0xA02f6adc7926jkjkjkBd59Fd43A84f4E0c0c91e832 , 2ndAddress : 0x76ac0a51b9fE44sdsdsdsd4419a8C4D4022Dc29AeAA , Whitelist : true ,....}]
In frontend for fetching I use wagmi 
I try to do this like my example code ignore if there is another method 
```
const { data: privsales } = useContractRead({
address: privSaleAddress,
abi: privSaleAbi,
functionName: "privsales",
args: [0],
onError(error: any) {
console.log("Error", error);
enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
},
});

//✅ Step2: Convert the data to string and remove the bigIntegers
const dataPrivString = JSON.stringify(privsales, (key, value) => {
if (typeof value === "bigint") {
return value.toString();
}
return value;
});

//✅ Step3: Check if the data is available
useEffect(() => {
console.log("Run something");
}, []);
if (!dataPrivString) {
return (
<div className="flex justify-center items-center">
<div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
<InfinitySpin width="200" color="#4fa94d" />
</div>
</div>
);
}

//✅ Step4: Convert the data to JSON format
const parsedDataPriv = JSON.parse(dataPrivString);

//✅ Step5: Destruct the data
const title: any = "Private Sale";
const purchaseToken: any = parsedDataPriv[0];
const addressCreator: any = parsedDataPriv[1];
const whitelist: any = parsedDataPriv[2];
const softCap: any = parsedDataPriv[3];
const hardCap: any = parsedDataPriv[4];
const moneyRaised: any = parsedDataPriv[5];
const minBuy: any = parsedDataPriv[6];
const maxBuy: any = parsedDataPriv[7];
const startTime: any = parsedDataPriv[8];
const endTime: any = parsedDataPriv[9];
const tokensVested: any = parsedDataPriv[10];
const firstReleasePercent: number = parsedDataPriv[11];
const vestingPeriod: any = parsedDataPriv[12];
const cycleReleasePercentages: any = parsedDataPriv[13];

return (
<p className="break-words mb-4"> {dataPrivString}</p>
          <p className="break-words mb-4"> {parsedDataPriv}</p>
          <p className="break-words mb-4">
            {" "}
            {parsedDataPriv.map((item: any) => parsedDataPriv[2].toString())}
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4 items-center justify-center">
            <AirDrop
    vestingFirstReleasePercent={firstReleasePercent}
              softCapCurrency={softCap}
              hardCapCurrency={hardCap}/>
```

https://www.reddit.com/r/solidity/comments/v28sve/how_to_retrieve_data_from_an_array_of_struct_in/


## Solution  1 

To retrieve data from an array of struct in Solidity and convert it into a key-value pair in JavaScript, you can follow these steps:

1. **Retrieve data from Solidity**: In your Solidity contract, you can create a function that returns the struct data. This function should return an array of structs.

2. **Convert data to key-value pair in JavaScript**: After retrieving the data in your frontend JavaScript code, you can map over the array and convert each item into an object with key-value pairs. Here's an example:

```javascript
const data = ["0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832","0x76ac0a51b9fE44f560d4419a8C4D4022Dc29AeAA",false,"1000000000000000000","2000000000000000000","0","1000000000000000000","2000000000000000000","1692435420","1692521820","0","10","10","90"];

const keys = ['address', '2ndAddress', 'Whitelist', ...]; // add the rest of the keys

const obj = {};
for(let i = 0; i < keys.length; i++) {
    obj[keys[i]] = data[i];
}
console.log(obj);
```

This will give you an object with key-value pairs.

3. **Create multiple cards**: If you have multiple sets of data and you want to create a card for each set, you can map over the array of data sets and create an object for each set. Then, you can use these objects to create the cards.

Here's an example:

```javascript
const dataSet = [
    ["0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832","0x76ac0a51b9fE44f560d4419a8C4D4022Dc29AeAA",false,"1000000000000000000","2000000000000000000","0","1000000000000000000","2000000000000000000","1692435420","1692521820","0","10","10","90"],
    ["0xA02f6adc7926jkjkjkBd59Fd43A84f4E0c0c91e832" ,"0x76ac0a51b9fE44sdsdsdsd4419a8C4D4022Dc29AeAA" , true ,....]
];

const keys = ['address', '2ndAddress', 'Whitelist', ...]; // add the rest of the keys

const objects = dataSet.map(data => {
    const obj = {};
    for(let i = 0; i < keys.length; i++) {
        obj[keys[i]] = data[i];
    }
    return obj;
});

console.log(objects);
```

This will give you an array of objects, which you can then use to create your cards.

I hope this helps! Let me know if you have any other questions.

## Solution 2
