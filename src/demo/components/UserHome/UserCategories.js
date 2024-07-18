import React from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu, Card } from "antd";
import "./UserCategories.css";

import accomodationIcon from "../../assets/accomodationIcon.svg";
import transportIcon from "../../assets/transportIcon.png";
import recreationIcon from "../../assets/recreationIcon.svg";
import adventureIcon from "../../assets/adventureIcon.svg";
import foodIcon from "../../assets/foodIcon.svg";

import cardImage1 from "../../assets/userCarousalImg1.jpg";
import cardImage2 from "../../assets/userCarousalImg2.jpg";
import cardImage3 from "../../assets/userCarousalImg3.jpg";

//service types and subtypes
const items = [
  {
    key: "home",
    label: "Home",
    icon: <AppstoreOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "accomodation",
    label: "Accomodation",
    icon: (
      <img
        src={accomodationIcon}
        alt="Accomodation"
        className="user-menu-icon"
      />
    ),
    children: [
      {
        key: "hotel",
        label: "Hotel",
      },
      {
        key: "villa",
        label: "Villa",
      },
      {
        key: "resort",
        label: "Resort",
      },
      {
        key: "homestay",
        label: "Homestay",
      },
      {
        key: "airbnb",
        label: "Airbnb",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "transport",
    label: "Transport",
    icon: (
      <img src={transportIcon} alt="Transport" className="user-menu-icon" />
    ),
    children: [
      {
        key: "carRental",
        label: "Car Rental",
      },
      {
        key: "bikeRental",
        label: "Bike Rental",
      },
      {
        key: "localTransport",
        label: "Local Transport",
      },
      {
        key: "cabService",
        label: "Cab Service",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "recreation",
    label: "Recreation",
    icon: (
      <img src={recreationIcon} alt="Recreation" className="user-menu-icon" />
    ),
    children: [
      {
        key: "shikaraRide",
        label: "Shikara Ride",
      },
      {
        key: "ponyRiding",
        label: "Pony Riding",
      },
      {
        key: "gardenTours",
        label: "Garden Tours",
      },
      {
        key: "orchardTours",
        label: "Orchard Tours",
      },
      {
        key: "batFactoryTours",
        label: "Bat Factory Tours",
      },

      {
        key: "shawlFactoryTours",
        label: "Shawl Factory Tours",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "adventure",
    label: "Adventure",
    icon: (
      <img src={adventureIcon} alt="Adventure" className="user-menu-icon" />
    ),
    children: [
      {
        key: "hiking",
        label: "Hiking",
      },
      {
        key: "skiing",
        label: "Skiing",
      },
      {
        key: "snowboarding",
        label: "Snowboarding",
      },
      {
        key: "camping",
        label: "Camping",
      },
      {
        key: "trekking",
        label: "Trekking",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "food&beverages",
    label: "Food & Beverages",
    icon: <img src={foodIcon} alt="Food" className="user-menu-icon" />,
    children: [
      {
        key: "restaurant",
        label: "Restaurant",
      },
      {
        key: "cafe",
        label: "Cafe",
      },
      {
        key: "streetFood",
        label: "Street Food",
      },
      {
        key: "foodTruck",
        label: "Food Truck",
      },
      {
        key: "fineDine",
        label: "Fine Dine",
      },
    ],
  },
];

const UserCategories = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };

  //Card data (recommendations part)
  const cardData = [
    {
      key: "1",
      image: cardImage1,
      title: "Card Title 1",
      description: "This is a description for card 1.",
    },
    {
      key: "2",
      image: cardImage2,
      title: "Card Title 2",
      description: "This is a description for card 2.",
    },
    {
      key: "3",
      image: cardImage3,
      title: "Card Title 3",
      description: "This is a description for card 3.",
    },
  ];

  return (
    <div className="menu-and-recommendations-div">
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        className="user-menu-div"
      />
      <div className="recommendations-div">
        <h3>Recommendations</h3>
        <div className="cards-container">
          {cardData.map((card) => (
            <Card
              key={card.key}
              hoverable
              cover={
                <img
                  alt={card.title}
                  src={card.image}
                  style={{ padding: "10px" }}
                  className="card-image"
                />
              }
            >
              <Card.Meta title={card.title} description={card.description} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCategories;
