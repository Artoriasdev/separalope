import React, { Component } from "react";
import VerticalBar from "./VerticalBar";

class BusinessReports extends Component {
  render() {
    return (
      <div className="page-container">
        <h1>Mis reportes</h1>
        <div>
          <VerticalBar />
        </div>
      </div>
    );
  }
}

export default BusinessReports;
