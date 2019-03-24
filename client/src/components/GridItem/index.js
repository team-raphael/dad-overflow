import React, { Component } from 'react'
import './style.css';
export const GridItem = props => {
    return (
      <div className={`item-box ${props.boxColor}`} iscomplete={props.isComplete}>
        <h6>{props.body}</h6>
        <div className="item-box-inner-grid">
        <i onClick={props.handleTaskComplete} data-iscomplete={props.isComplete} id={props.id} class={`${props.leftIcon} tooltipped`} data-position="top" data-tooltip="I am a tooltip"></i>
        <i onClick={props.handleTaskDelete}  id={props.id} class={props.rightIcon}></i>            
        </div>
      </div>
    )
    
}

export default GridItem
