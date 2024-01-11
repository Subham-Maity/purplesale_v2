import React from "react";
import { AiOutlineFire, AiOutlineRocket } from "react-icons/ai";
import Advanced from "@/pages/launchpads/MultichainList/PolygonList/Advanced";
import All from "@/pages/launchpads/MultichainList/PolygonList/All";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import LaunchPadListTab from "@/components/Tabs/SubComponent/LaunchPadListTab";
import LauchPadTab from "@/components/Tabs/SubComponent/LaunchpadTab";
import Alls from "@/pages/launchpads/MultichainList/PolygonList/Alpha/All";
import Advanceds from "@/pages/launchpads/MultichainList/PolygonList/Alpha/Advanced";
import dynamic from "next/dynamic";

const PolygonList = () => {
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

export default dynamic(() => Promise.resolve(PolygonList), { ssr: false });
