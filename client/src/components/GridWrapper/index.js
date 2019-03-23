import React, { Component } from 'react'
import './style.css';

export const GridWrapper = props => {
  
    return (
      <div class="grid ">{props.children}</div>
    )
  
}

export default GridWrapper
