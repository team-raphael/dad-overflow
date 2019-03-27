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
      API.getTasks(this.firebase.dbUserInfo._id)
      .then(res =>
        this.setState({ listOfTodos: res.data })
      )
      .finally(() => this.lockScreen.unlock());
    }
  };

  handleTaskDelete = id => {
    const taskId = id;
    const userId = this.firebase.dbUserInfo._id;

    const gridItem = document.getElementById(taskId);
    gridItem.classList.remove("scale-in");
    gridItem.classList.add("scale-out");

    API.deleteOneTask(userId, taskId)
      .then(() => this.getTasks());
  };

  handleTaskCompleteChange = (taskId, isComplete) => {
    const gridItem = document.getElementById(taskId);
    gridItem.classList.remove("scale-in");
    gridItem.classList.add("scale-out");

    const userId = this.firebase.dbUserInfo._id;

    const task = {
      isComplete: !isComplete
    };


    API.updateOneTask(userId, taskId, task)
      .then(() => this.getTasks());
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

                              handleCheckboxChange={() =>
                                this.handleTaskCompleteChange(item._id, item.isComplete)
                              }

                              handleTaskDelete={() =>
                                this.handleTaskDelete(item._id)
                              }
                              body={item.body}
                              isComplete={item.isComplete}
                              leftIcon={'fas fa-check fa-2x'}
                              rightIcon={'fas fa-trash-alt fa-2x'}
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
                              isComplete={item.isComplete}
                              handleCheckboxChange={() =>
                                this.handleTaskCompleteChange(item._id, item.isComplete)
                              }
                              handleTaskDelete={() =>
                                this.handleTaskDelete(item._id)
                              }
                              leftIcon={'fas fa-history fa-2x'}
                              rightIcon={'fas fa-trash-alt fa-2x'}
                            />
                          )
                      )}
                    </GridWrapper>
                  </div>
                  <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                </div>
              }
            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}
