import React, { Component } from "react";
import "./style.css";

export const GridWrapper = props => {
  return (
    <div className="wrapper-box">
      <h1>{props.statusTitle}</h1>
      <div className='grid'>{props.children}</div>
    </div>
  );
};

export default GridWrapper;
