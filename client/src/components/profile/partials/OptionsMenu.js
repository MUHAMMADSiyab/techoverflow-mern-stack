import React from "react";
import PropTypes from "prop-types";

const OptionsMenu = ({ deleteFunc, id, form, toggleForm }) => (
  <div className="row">
    <div className="col-sm-2 ml-auto">
      <div className="dropdown">
        <button
          className="btn menu-btn"
          data-toggle="dropdown"
          id={`menu-dd${id}`}
        >
          <i className="fas fa-ellipsis-h" />
        </button>
        <ul className="dropdown-menu" data-target={`#menu-dd${id}`}>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#!"
              onClick={e => {
                e.preventDefault();
                toggleForm(!form);
              }}
            >
              <i className="fas fa-pencil-alt mr-2" /> Edit
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#!"
              onClick={e => {
                e.preventDefault();
                deleteFunc(id);
              }}
            >
              <i className="fas fa-trash-alt mr-2" /> Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

OptionsMenu.propTypes = {
  deleteFunc: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default OptionsMenu;
