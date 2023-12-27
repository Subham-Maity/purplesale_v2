import React from "react";
import Tab from "@/components/Tabs/Tabs";
import { AiOutlineFire, AiOutlineRocket } from "react-icons/ai";
import Advanced from "@/pages/launchpads/list/Advanced";
import All from "@/pages/launchpads/list/All";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import Navbar from "@/components/Navbar/NewNavbar";
import LaunchPadListTab from "@/components/Tabs/SubComponent/LaunchPadListTab";
import LauchPadTab from "@/components/Tabs/SubComponent/LaunchpadTab";
import Alls from "@/pages/launchpads/list/Alpha/All";
import Advanceds from "@/pages/launchpads/list/Alpha/Advanced";

const Index = () => {
  const names = ["All launchpads", "Advanced Mode"];
  const mainTabNames = ["DEGEN MODE", "ALPHA MODE"];
  const icons = [AiOutlineRocket, AiOutlineFire, LiaHandsHelpingSolid];

  return (
    <div>
      <div className="mt-20">
        <LaunchPadListTab tabs={mainTabNames}>
          <LauchPadTab tabs={names} icons={icons}>
            <All />
            <Advanced />
          </LauchPadTab>
          <LauchPadTab tabs={names} icons={icons}>
            <Alls />
            <Advanceds />
          </LauchPadTab>
        </LaunchPadListTab>
      </div>
    </div>
  );
};

export default Index;
