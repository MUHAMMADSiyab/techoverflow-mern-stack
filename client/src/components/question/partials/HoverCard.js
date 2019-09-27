import React from "react";
import PropTypes from "prop-types";

const HoverCard = ({ question: { name, avatar } }) => (
  <div className="card hover-card">
    <div className="card-body">
      <img src={avatar} alt="" className="w-1" />
      <span>{name}</span>
    </div>
  </div>
);
HoverCard.propTypes = {
  question: PropTypes.object.isRequired
};

export default HoverCard;
