import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => (
  <div className="container-fluid landing-container">
    <div className="row justify-content-sm-center">
      <div className="col-sm-12">
        <h1 className="text-center landing-head">
          Sharing & getting knowledge across the coding world
        </h1>
        <div className="styled-underscore" />
        <div className="landing-text">
          <p className="text-center">
            A platform by developers for develpers to get help and to help
            others by asking question and posting answers
          </p>
        </div>
        <div className="landing-buttons">
          {isAuthenticated ? (
            <Link className="btn btn-blue btn-lg btn-wide" to="#/">
              Get started
            </Link>
          ) : (
            <Fragment>
              <Link className="btn btn-white btn-lg btn-wide" to="/signup">
                Signup
              </Link>{" "}
              <Link className="btn btn-blue btn-lg btn-wide" to="/login">
                Login
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  </div>
);

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
