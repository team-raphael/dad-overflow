import React from 'react'
import './style.css';

class GridItem extends React.Component {

  state = {
    isChecked: this.props.isComplete,
    isEditing: false,
    toDoBody: this.props.body
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, taskId, isComplete } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(taskId, isComplete);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleEditOnClick = () => {
    this.setState({
      isEditing: true
    });
  }

  handleEditSaveOnClick = (event) => {
    event.preventDefault();

    const editTodoForm = document.querySelector(".editTodoForm");

    if (editTodoForm.checkValidity()) {
      const { handleEditSave, taskId } = this.props;

      this.setState({
        isEditing: false
      });

      handleEditSave(taskId, this.state.toDoBody);
    } else {
      window.M.toast({ html: 'Please enter a value in the todo body' });
    }
  }

  handleEditCancelOnClick = () => {
    this.setState({
      isEditing: false,
      toDoBody: this.props.body
    });
  }

  render() {
    return (
      <div id={this.props.id} className="gridItemContainer row scale-transition">
        <div>
          <div className="card hoverable">
            <div className="card-content left-align">
              <div>
                {!this.state.isEditing ?
                  (
                    <div className="valign-wrapper">
                      <div className="checkBoxContainer">
                        <label>
                          <input type="checkbox" className="filled-in" checked={this.state.isChecked} onChange={this.toggleCheckboxChange} />
                          <span></span>
                        </label>
                        <span onClick={this.handleEditOnClick} className={this.props.isComplete ? "isComplete" : ""}>{this.props.body}</span>
                      </div>
                      <div className="deleteButtonContainer">
                        <i onClick={ () => this.props.handleTaskDelete(this.props.id) } className="material-icons small right">delete</i>
                      </div>
                    </div>
                  ) :
                  (
                    <form className="editTodoForm" onSubmit={this.handleEditSaveOnClick}>
                      <div className="input-field">
                        <input minLength="1" id={`editToDo_${this.props.id}`} required type="text" className="editTodoInput validate" name="toDoBody" onChange={this.handleInputChange} value={this.state.toDoBody} />
                      </div>
                    </form>
                  )
                }
              </div>
              <div className="actionButtonContainer right-align">

                {this.state.isEditing &&
                  <div>
                    <button id={this.props.id} onClick={this.handleEditSaveOnClick} className="marginRight waves-effect waves-light btn">Save <i className="material-icons right">check</i></button>
                    <button id={this.props.id} onClick={this.handleEditCancelOnClick} className="waves-effect waves-light btn">Cancel <i className="material-icons right">close</i></button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GridItem
