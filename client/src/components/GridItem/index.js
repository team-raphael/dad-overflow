import React from 'react'
import './style.css';
export const GridItem = props => {
    return (
      <div className={`item-box ${props.boxColor}`}>
        <h6>{props.body}</h6>
        <div className="item-box-inner-grid">
        <i onClick={props.handleTaskComplete} data-iscomplete={props.isComplete} id={props.id} className={`${props.leftIcon} tooltipped`} data-position="top" data-tooltip="I am a tooltip"></i>
        <i onClick={props.handleTaskDelete}  id={props.id} className={props.rightIcon}></i>            
        </div>
      </div>
    )
    
}

export default GridItem
