import React from "react";
import PropTypes from "prop-types";

const Sidebar = ({ title, items }) => (
  <div className="card no-shadow">
    <div className="card-header text-warning">
      <h5>{title}</h5>
    </div>
    <div className="card-body text-muted">
      <ul className="list-group">
        {items.length > 0 &&
          items.map((item, index) => (
            <li className="list-group-item" key={index}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  </div>
);

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

export default Sidebar;
