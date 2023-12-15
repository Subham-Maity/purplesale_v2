import React from "react";
import Tab from "@/components/Tabs/Tabs";
import { AiOutlineFire, AiOutlineRocket } from "react-icons/ai";
import Advanced from "@/pages/private-sale/list/Advanced";
import All from "@/pages/private-sale/list/All";
import Contributions from "@/pages/private-sale/list/Contributions";
import { LiaHandsHelpingSolid } from "react-icons/lia";

const Index = () => {
  const names = ["All Private Sales", "My Private Sale", "Created By You"];
  const icons = [AiOutlineRocket, AiOutlineFire, LiaHandsHelpingSolid];

  return (
    <div>
      <Tab tabs={names} icons={icons}>
        <All />
        <Advanced />
        <Contributions />
      </Tab>
    </div>
  );
};

export default Index;