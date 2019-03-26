import React from "react";
import "./style.css";

class GridWrapper extends React.Component {

  componentDidMount = () => {
    this.initializeCollapsible();
  }

  componentDidUpdate = () => {
    this.initializeCollapsible();
  }

  initializeCollapsible = () => {
    //Initialize the materialize collapsible
    const elems = document.querySelectorAll('.collapsible');
    this.collapsibleInstances = window.M.Collapsible.init(elems);
}

  render() {
    return (
      <ul className="collapsible" id={this.props.id} >
        <li>
          <div className="collapsible-header"><i className="material-icons">{ this.props.statusTitle.toLowerCase() === "complete" ? "check_box" : "check_box_outline_blank"  }</i> {this.props.statusTitle}</div>
          <div className="collapsible-body">{this.props.children}</div>
        </li>
      </ul>
    );
  }
}


export default GridWrapper;
