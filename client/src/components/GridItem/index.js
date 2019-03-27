import React from 'react'
import './style.css';

class GridItem extends React.Component {

  state = {
    isChecked: this.props.isComplete,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, taskId } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(taskId, this.props.isComplete);
  }

  render() {
    return (
      <div id={ this.props.id } className="gridItemContainer row scale-transition">
        <div>
          <div className="card hoverable">
            <div className="card-content left-align">
              <div>
                <label>
                  <input type="checkbox" className="filled-in" checked={this.state.isChecked} onChange={this.toggleCheckboxChange} />
                  <span className={this.props.isComplete ? "isComplete" : ""}>{this.props.body}</span>
                </label>
              </div>
              <div className="actionButtonContainer right-align">
                <button id={this.props.id}  onClick={this.props.handleTaskDelete} className="waves-effect waves-light btn">Delete <i className="material-icons right">delete</i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GridItem
