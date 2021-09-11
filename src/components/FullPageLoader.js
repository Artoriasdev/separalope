import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class FullPageLoader extends Component {
  renderSpinner() {
    return (
      <React.Fragment>
        <CircularProgress className="mat__loading" />
      </React.Fragment>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className={classnames("loading", { active: isLoading })}>
        {this.renderSpinner()}
      </div>
    );
  }
}

FullPageLoader.propTypes = {
  isLoading: PropTypes.bool,
};
