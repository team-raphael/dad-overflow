import React, { Component } from "react";
import "./style.css";
import API from "../../services/APIService";
import GridWrapper from "../GridWrapper";
import GridItem from "../GridItem";
import FirebaseContext from "../Firebase/context";
import LockScreen from '../LockScreen';

export class CollectionWrapper extends Component {
  state = {
    listOfTodos: [],
    task: "",
    deletedTask: []
  };

  componentDidMount() {
    this.getTasks();
    var elems = document.querySelectorAll('.tooltipped');

    window.M.Tooltip.init(elems);
    this.openCollapsible();
  }

  componentDidUpdate() {
    this.openCollapsible();
  }

  //Method will open up the collapsible section for incomplete tasks
  openCollapsible() {
    const incompleteGridWrapper = document.getElementById("incompleteGridWrapper");
    if (incompleteGridWrapper) {
      const incompleteCollapsibleInstance = window.M.Collapsible.getInstance(incompleteGridWrapper);
      if (incompleteCollapsibleInstance) {
        incompleteCollapsibleInstance.open(0);
      }
    }
  }

  getTasks = () => {
    if (this.firebase.dbUserInfo) {
      this.lockScreen.lock();
      API.getTasks(this.firebase.dbUserInfo._id, this.props.firebaseUserToken)
        .then(res => this.setState({ listOfTodos: res.data }))
        .catch((err) => {
          console.log(err);
          window.M.toast({ html: "Error getting tasks!" });
        })
        .finally(() => this.lockScreen.unlock());
    }
  };

  transitionOutTask = taskId => {
    document.querySelectorAll('.gridItemContainer')
      .forEach((gridItem) => {
        gridItem.classList.remove("scale-out");
        if (gridItem.id !== taskId) {
          gridItem.classList.remove("scale-in");
        }
      });

    const gridItem = document.getElementById(taskId);
    gridItem.classList.add("scale-out");
  }

  handleTaskDelete = id => {
    const taskId = id;
    const userId = this.firebase.dbUserInfo._id;

    //this.transitionOutTask(taskId);

    API.deleteOneTask(userId, taskId, this.firebase.firebaseUserToken)
      .then(() => this.getTasks())
      .catch((err) => {
        console.log(err);
        window.M.toast({ html: "Error deleting task!" });
      });
  };

  handleTaskCompleteChange = (taskId, isComplete) => {
    //this.transitionOutTask(taskId);

    const userId = this.firebase.dbUserInfo._id;

    const task = {
      isComplete: !isComplete
    };


    API.updateOneTask(userId, taskId, task, this.firebase.firebaseUserToken)
      .then(() => this.getTasks())
      .catch((err) => {
        console.log(err);
        window.M.toast({ html: "Error updating task!" });
      });
  }

  handleEditSave = (taskId, todoBody) => {
    const userId = this.firebase.dbUserInfo._id;

    const task = {
      body: todoBody
    };

    API.updateOneTask(userId, taskId, task, this.firebase.firebaseUserToken)
      .then(() => this.getTasks())
      .catch((err) => {
        console.log(err);
        window.M.toast({ html: "Error updating task!" });
      });
  }


  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          this.firebase = firebase;

          return (
            <div>
              {firebase.dbUserInfo &&

                <div className="row">
                  <div>
                    {/* render if isComplete is true */}

                    <GridWrapper id="incompleteGridWrapper" statusTitle={"Incomplete"}>
                      {this.state.listOfTodos.map(
                        (item, index) =>
                          !item.isComplete && (
                            <GridItem
                              boxColor={"incomplete-color"}
                              key={index}
                              id={item._id}
                              taskId={item._id}
                              body={item.body}
                              isComplete={item.isComplete}
                              handleCheckboxChange={this.handleTaskCompleteChange}
                              handleTaskDelete={this.handleTaskDelete}
                              handleEditSave={this.handleEditSave}
                            />
                          )
                      )}
                    </GridWrapper>
                  </div>

                  <div>
                    {/* render if isComplete is true */}
                    <GridWrapper id="completeGridWrapper" statusTitle={"Complete"}>
                      {this.state.listOfTodos.map(
                        (item, index) =>
                          item.isComplete && (
                            <GridItem
                              boxColor={"complete-color"}
                              key={index}
                              id={item._id}
                              body={item.body}
                              taskId={item._id}
                              isComplete={item.isComplete}
                              handleCheckboxChange={this.handleTaskCompleteChange}
                              handleTaskDelete={this.handleTaskDelete}
                              handleEditSave={this.handleEditSave}
                            />
                          )
                      )}
                    </GridWrapper>
                  </div>
                  <LockScreen id="collectionWrapperPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                </div>
              }
            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}
