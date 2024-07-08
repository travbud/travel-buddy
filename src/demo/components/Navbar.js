import React, { useState } from "react";
import { Modal, Button, Input, Dropdown, Menu } from "antd";
import {
  EnvironmentOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import SignInModal from "./SignInModal";
import VendorRegistrationModal from "./VendorRegistrationModal";
import "./Navbar.css";

const Navbar = () => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [vRegModalOpen, setVRegModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [location, setLocation] = useState("Current Location");
  //state for temporary location input
  const [tempLocation, setTempLocation] = useState("");

  const handleLocationChange = (e) => {
    setTempLocation(e.target.value);
  };

  const handleLocationConfirm = () => {
    setLocation(tempLocation);
    setLocationModalOpen(false);
  };

  const openLocationModal = () => {
    setTempLocation("");
    setLocationModalOpen(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="login" onClick={() => setSignInModalOpen(true)}>
        Log In
      </Menu.Item>
      <Menu.Item key="signup" onClick={() => setVRegModalOpen(true)}>
        Sign Up
      </Menu.Item>
      <Menu.Item key="helpcenter">
        <a href="/help-center" target="_blank" rel="noopener noreferrer">
          Help Center
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <div className="location">
        <Button
          type="text"
          icon={<EnvironmentOutlined />}
          onClick={openLocationModal}
        >
          {location}
        </Button>
      </div>
      <h1 className="title">TRAVEL BUDDY</h1>
      <div className="nav-icons">
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button type="text" icon={<UserOutlined />} />
        </Dropdown>
        <Button type="text" icon={<MenuOutlined />} />
      </div>
      <Modal
        centered
        open={signInModalOpen}
        onOk={() => setSignInModalOpen(false)}
        onCancel={() => setSignInModalOpen(false)}
        width={vRegModalOpen ? 500 : 500}
        footer={null}
      >
        <SignInModal
          setSignInModalOpen={setSignInModalOpen}
          setVRegModalOpen={setVRegModalOpen}
        />
      </Modal>
      <VendorRegistrationModal
        isVisible={vRegModalOpen}
        onClose={() => setVRegModalOpen(false)}
      />
      <Modal
        centered
        open={locationModalOpen}
        onOk={handleLocationConfirm}
        onCancel={() => setLocationModalOpen(false)}
        width={400}
        footer={
          <Button type="primary" onClick={handleLocationConfirm}>
            Confirm
          </Button>
        }
      >
        <div>
          <h2>Your Current Location</h2>
          <p>Update your current location.</p>
          <Input
            name="location"
            type="text"
            placeholder="Enter city"
            value={tempLocation}
            onChange={handleLocationChange}
            required
          />
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
