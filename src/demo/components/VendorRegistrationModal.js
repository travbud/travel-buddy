import React, { useState } from "react";
import {
  Modal,
  Steps,
  Button as AntButton,
  Divider,
  message,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import "./VendorRegistrationModal.css";

//icon imports
import iconImage from "../assets/travelBuddyIcon.png";
import homeIcon from "../assets/homeIcon.svg";
import villaIcon from "../assets/villaIcon.png";
import hotelIcon from "../assets/hotelIcon.svg";
import airbnbIcon from "../assets/airbnbIcon.svg";
import resortIcon from "../assets/resortIcon.png";
import accomodationIcon from "../assets/accomodationIcon.svg";
import transportIcon from "../assets/transportIcon.png";
import recreationIcon from "../assets/recreationIcon.svg";
import adventureIcon from "../assets/adventureIcon.svg";
import foodIcon from "../assets/foodIcon.svg";
import bikeIcon from "../assets/bikeIcon.svg";
import busIcon from "../assets/busIcon.svg";
import cabIcon from "../assets/cabIcon.svg";
import ponyRidingIcon from "../assets/ponyRidingIcon.png";
import gardenIcon from "../assets/gardenIcon.svg";
import orchardIcon from "../assets/orchardIcon.png";
import batIcon from "../assets/batIcon.png";
import shawlFactoryIcon from "../assets/shawlFactoryIcon.png";
import foodTruckIcon from "../assets/foodTruckIcon.png";
import trekkingIcon from "../assets/trekkingIcon.png";
import skiingIcon from "../assets/skiingIcon.svg";
import snowboardingIcon from "../assets/snowboardingIcon.svg";
import campingIcon from "../assets/campingIcon.svg";
import restaurantIcon from "../assets/restaurantIcon.png";
import fineDineIcon from "../assets/fineDineIcon.png";
import cafeIcon from "../assets/cafeIcon.svg";
import streetFoodIcon from "../assets/streetFoodIcon.png";

const { Step } = Steps;

const cardData = [
  { icon: accomodationIcon, text: "Accomodation" },
  { icon: transportIcon, text: "Transport" },
  { icon: recreationIcon, text: "Recreation" },
  { icon: adventureIcon, text: "Adventure" },
  { icon: foodIcon, text: "Food & Beverages" },
];

const serviceSubcategories = {
  Accomodation: [
    { icon: hotelIcon, text: "Hotel" },
    { icon: villaIcon, text: "Villa" },
    { icon: resortIcon, text: "Resort" },
    { icon: homeIcon, text: "Homestay" },
    { icon: airbnbIcon, text: "Airbnb" },
  ],
  Transport: [
    { icon: transportIcon, text: "Car Rental" },
    { icon: bikeIcon, text: "Bike Rental" },
    { icon: busIcon, text: "Local Transport" },
    { icon: cabIcon, text: "Cab Service" },
  ],
  Recreation: [
    { icon: recreationIcon, text: "Shikara Ride" },
    { icon: ponyRidingIcon, text: "Pony Riding" },
    { icon: gardenIcon, text: "Garden Tours" },
    { icon: orchardIcon, text: "Orchard Tours" },
    { icon: batIcon, text: "Bat Factory Tours" },
    { icon: shawlFactoryIcon, text: "Shawl Factory Tours" },
  ],
  Adventure: [
    { icon: adventureIcon, text: "Hiking" },
    { icon: skiingIcon, text: "Skiing" },
    { icon: snowboardingIcon, text: "Snowboarding" },
    { icon: campingIcon, text: "Camping" },
    { icon: trekkingIcon, text: "Trekking" },
  ],
  "Food & Beverages": [
    { icon: restaurantIcon, text: "Restaurant" },
    { icon: cafeIcon, text: "Cafe" },
    { icon: streetFoodIcon, text: "Street Food" },
    { icon: foodTruckIcon, text: "Food Truck" },
    { icon: fineDineIcon, text: "Fine Dine" },
  ],
};

const ClickableCard = ({ icon, text, onClick, isSelected }) => {
  return (
    <div
      className={`custom-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(text)}
    >
      <img src={icon} alt={text} className="card-icon" />
      <span className="card-text">{text}</span>
    </div>
  );
};

const VendorRegistrationModal = ({ isVisible, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    licenceName: "",
    licenceNumber: "",
    file: null,
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCardClick = (text) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(text)
        ? prevSelectedServices.filter((service) => service !== text)
        : [...prevSelectedServices, text]
    );
  };

  const handleSubcategoryClick = (service, text) => {
    setSelectedSubcategories((prevSubcategories) => ({
      ...prevSubcategories,
      [service]: prevSubcategories[service]?.includes(text)
        ? prevSubcategories[service].filter((sub) => sub !== text)
        : [...(prevSubcategories[service] || []), text],
    }));
  };

  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const validateStep = () => {
    if (current === 0) {
      const { name, email, number, address } = formData;
      if (!name || !email || !number || !address) {
        message.error("Please enter all details in Step 1.");
        return false;
      }
    } else if (current === 1) {
      if (selectedServices.length === 0) {
        message.error("Please select at least one service in Step 2.");
        return false;
      }
    } else if (current === 2) {
      const allSelected = selectedServices.every(
        (service) => selectedSubcategories[service]?.length > 0
      );
      if (!allSelected) {
        message.error(
          "Please select subcategories for all selected services in Step 3."
        );
        return false;
      }
    } else if (current === 3) {
      const { licenceName, licenceNumber } = formData;
      if (!licenceName || !licenceNumber) {
        message.error("Please enter all details in Step 4.");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (validateStep()) {
      setCurrent(current + 1);
    }
  };

  const prev = () => setCurrent(current - 1);

  const API_BASE_URL = "http://localhost:5000";

  const register = async () => {
    if (validateStep()) {
      const payload = {
        ...formData,
        selectedServices,
        selectedSubcategories,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/vendor/register`,
          payload
        );
        message.success("Vendor registered successfully!");
        onClose();
      } catch (error) {
        message.error("Registration failed. Please try again.");
        console.error("Registration error:", error);
      }
    }
  };

  const steps = [
    {
      title: "Step 1",
      content: (
        <div className="v-register-form-div">
          <h3>Vendor Registration Form - Step 1</h3>
          <p>Personal Details</p>
          <form>
            <div className="input-div">
              <label>Vendor Name / Org Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-div">
              <label>Email ID</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your Email ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-div">
              <label>Contact Number</label>
              <input
                name="number"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-div">
              <label>Address</label>
              <input
                name="address"
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div className="form-div">
          <h3>Vendor Registration Form - Step 2</h3>
          <p>Select the service(s) you're providing:</p>
          <div className="cards-container">
            {cardData.map((data, index) => (
              <ClickableCard
                key={index}
                icon={data.icon}
                text={data.text}
                onClick={handleCardClick}
                isSelected={selectedServices.includes(data.text)}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div className="form-div">
          <h3>Vendor Registration Form - Step 3</h3>
          {selectedServices.map((service, index) => (
            <div key={index}>
              <p>Select the type of {service} service:</p>
              <div className="cards-container">
                {serviceSubcategories[service]?.map((data, subIndex) => (
                  <ClickableCard
                    key={subIndex}
                    icon={data.icon}
                    text={data.text}
                    onClick={() => handleSubcategoryClick(service, data.text)}
                    isSelected={selectedSubcategories[service]?.includes(
                      data.text
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div className="form-div">
          <h3>Vendor Registration Form - Step 4</h3>
          <p>Licence Details</p>
          <form>
            <div className="input-div">
              <label>Licence Bearer's Name</label>
              <input
                name="licenceName"
                type="text"
                placeholder="Enter your name"
                value={formData.licenceName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-div">
              <label>Licence Number</label>
              <input
                name="licenceNumber"
                type="text"
                placeholder="Enter your licence number"
                value={formData.licenceNumber}
                onChange={handleChange}
                required
              />
            </div>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single upload. Strictly prohibited from uploading
                company data or other banned files.
              </p>
            </Dragger>
          </form>
        </div>
      ),
    },
  ];

  return (
    <Modal visible={isVisible} onCancel={onClose} footer={null} width={700}>
      <div className="title-container">
        <img className="main-icon" src={iconImage} alt="Icon" />
        <h2 className="main-title">TRAVEL BUDDY</h2>
      </div>
      <Divider />
      <Steps current={current} style={{ marginBottom: 20 }}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>

      <div className="steps-content">{steps[current].content}</div>

      <div className="steps-action">
        {current > 0 && <AntButton onClick={() => prev()}>Previous</AntButton>}
        {current < steps.length - 1 ? (
          <AntButton type="primary" onClick={next} style={{ marginLeft: 8 }}>
            Next
          </AntButton>
        ) : (
          <AntButton
            type="primary"
            onClick={register}
            style={{ marginLeft: 8 }}
          >
            Register
          </AntButton>
        )}
      </div>
    </Modal>
  );
};

export default VendorRegistrationModal;
