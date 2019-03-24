import React, { Component } from "react";
import "./style.css";

export const GridWrapper = props => {
  return <div className={`grid ${props.border || null}`}>{props.children}</div>;
};

export default GridWrapper;
