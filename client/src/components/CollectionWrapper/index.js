import React, { Component } from "react";
import "./style.css";
import API from "../../services/APIService";
import GridWrapper from "../GridWrapper";
import GridItem from "../GridItem";
import FirebaseContext from "../Firebase/context";

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
      API.getTasks(this.firebase.dbUserInfo._id).then(res =>
        this.setState({ listOfTodos: res.data })
      );
    }
  };

  handleTaskComplete = (isComplete, id) => {
    const taskId = id;
    const userId = this.firebase.dbUserInfo._id;
    // isComplete is a boolean, whichever is current at that time send it
    const taskComplete = isComplete;
    // send object with either true or false
    const task = {
      isComplete: !taskComplete
    };

    API.updateOneTask(userId, taskId, task)
      .then(() => this.getTasks());
  };

  handleTaskDelete = id => {
    const taskId = id;
    const userId = this.firebase.dbUserInfo._id;

    API.deleteOneTask(userId, taskId)
      .then(() => this.getTasks());
  };

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          this.firebase = firebase;

          return (
            <div>
              {firebase.dbUserInfo &&

                <div className="row">
                  <div className="col s12">
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
                              // pass a reference to the function and pass in the arguments - much better than using the target object
                              handleTaskComplete={() =>
                                this.handleTaskComplete(item.isComplete, item._id)
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

                  <div className="col s12">
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
                              handleTaskComplete={() =>
                                this.handleTaskComplete(item.isComplete, item._id)
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
                </div>
              }
            </div>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}
