import React, { Component } from 'react'
import './style.css';
export const GridItem = props => {
    return (
      <div className="item-box" iscomplete={props.isComplete}>
        {props.body}
        <div className="item-box-inner-grid">
        <i onClick={props.handleTaskComplete} data-iscomplete={props.isComplete} id={props.id} class="fas fa-check"></i>
        <i onClick={props.handleTaskDelete}  id={props.id} class="fas fa-times"></i>            
        </div>
      </div>
    )
    
}

export default GridItem
