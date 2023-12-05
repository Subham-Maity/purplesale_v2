import React from "react";
import Tab from "@/components/Tabs/Tabs";
import { AiOutlineFire, AiOutlineRocket } from "react-icons/ai";
import Advanced from "@/pages/launchpads/list/Advanced";
import All from "@/pages/launchpads/list/All";
import Contributions from "@/pages/launchpads/list/Contributions";
import { LiaHandsHelpingSolid } from "react-icons/lia";

const Index = () => {
  const names = ["All launchpads", "Advanced Mode", "My Contributions"];
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
