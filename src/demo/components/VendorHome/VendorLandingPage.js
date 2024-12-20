import React, { useState } from "react";
import "./VendorLandingPage.css";
import {
  AppstoreOutlined,
  TeamOutlined,
  SettingOutlined,
  LineChartOutlined,
  BookOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import { Button, Menu } from "antd";
import VendorServices from "./VendorServices";
import VendorTeamMembers from "./VendorTeamMembers";
import VendorAnalytics from "./VendorAnalytics";
import VendorSettings from "./VendorSettings";
import VendorBookings from "./VendorBookings";

//menu items
const items = [
  {
    label: "Services",
    key: "services",
    icon: <AppstoreOutlined />,
    className: "menu-item",
  },
  {
    label: "Bookings",
    key: "bookings",
    icon: <BookOutlined />,
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
  const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  //component switching logic
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
    case "bookings":
      Component = VendorBookings;
      break;
    default:
      Component = VendorServices;
  }

  return (
    <div className="vendor-landing-page-div">
      <div className="landing-page-menu-div">
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          onClick={onClick}
          selectedKeys={[current]}
          className="custom-menu"
          style={{ width: 200 }}
        />
      </div>
      <div className="landing-page-content-div">
        <Component />
      </div>
    </div>
  );
};

export default VendorLandingPage;
