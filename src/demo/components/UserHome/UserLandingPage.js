import React from "react";
import { Carousel } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./UserLandingPage.css";
import UserCategories from "./UserCategories";

import carousalImg1 from "../../assets/userCarousalImg1.jpg";
import carousalImg2 from "../../assets/userCarousalImg2.jpg";
import carousalImg3 from "../../assets/userCarousalImg3.jpg";
import carousalImg4 from "../../assets/userCarousalImg4.jpg";

const UserLandingPage = () => {
  return (
    <>
      <div className="carousel-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Find your next adventure..."
            className="search-input"
          />
          <button className="search-button">
            <SearchOutlined />
          </button>
        </div>
        <Carousel autoplay>
          <div>
            <img src={carousalImg1} alt="Image 1" className="carousel-image" />
          </div>
          <div>
            <img src={carousalImg2} alt="Image 2" className="carousel-image" />
          </div>
          <div>
            <img src={carousalImg3} alt="Image 3" className="carousel-image" />
          </div>
          <div>
            <img src={carousalImg4} alt="Image 4" className="carousel-image" />
          </div>
        </Carousel>
      </div>
      <UserCategories />
    </>
  );
};

export default UserLandingPage;
