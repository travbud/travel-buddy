import React, { useState } from "react";
import "./VendorLandingPage.css";
import {
  AppstoreOutlined,
  TeamOutlined,
  SettingOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import VendorServices from "./VendorServices";
import VendorTeamMembers from "./VendorTeamMembers";
import VendorAnalytics from "./VendorAnalytics";
import VendorSettings from "./VendorSettings";

const items = [
  {
    label: "Services",
    key: "services",
    icon: <AppstoreOutlined />,
    className: "menu-item",
  },
  {
    label: "Team Members",
    key: "teamMembers",
    icon: <TeamOutlined />,
    className: "menu-item",
  },
  {
    label: "Analytics",
    key: "analytics",
    icon: <LineChartOutlined />,
    className: "menu-item",
  },
  {
    label: "Settings",
    key: "settings",
    icon: <SettingOutlined />,
    className: "menu-item",
  },
];

const VendorLandingPage = () => {
  const [current, setCurrent] = useState("services");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  let Component;
  switch (current) {
    case "services":
      Component = VendorServices;
      break;
    case "teamMembers":
      Component = VendorTeamMembers;
      break;
    case "analytics":
      Component = VendorAnalytics;
      break;
    case "settings":
      Component = VendorSettings;
      break;
    default:
      Component = VendorServices;
  }

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="custom-menu"
      />
      <Component />
    </>
  );
};

export default VendorLandingPage;
