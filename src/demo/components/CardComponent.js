import React from "react";
import PropTypes from "prop-types";
import "./CardComponent.css";

const CardComponent = ({ image, heading, id, description, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <img src={image} alt={heading} className="card-image" />
      <h2 className="card-heading">{heading}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};

CardComponent.propTypes = {
  image: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CardComponent.defaultProps = {
  onClick: () => {
  },
};

export default CardComponent;
