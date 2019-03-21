import React, { Component } from 'react';
import './style.css';
import API from '../../services/APIService'
import { Collection } from '../Collection'
// import { listOfTodos } from './ListOfTodos'
import { TextArea } from '../TextArea'
import FirebaseContext from '../Firebase/context';






export class CollectionWrapper extends Component {

    state = {
        listOfTodos: [],
        value: '',

    }

    componentDidMount() {
        API.getTasks('5c9056038e7212a0ffa7db21')
            .then(res => this.setState({ listOfTodos: res.data }))
    };


    handleInputChange = e => {
        const { name, value } = e.target;
        console.log(value)
        console.log(name)
        this.setState({
            value
        })
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const newTask = {
            isComplete: false,
            body: this.state.value,
        };
        API.createATask(this.firebase.dbUserInfo._id, newTask)
            .then(res => console.log(res.data))
        this.setState(prevState => ({
            listOfTodos: prevState.listOfTodos.concat(newTask)
        }));

    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {
                    firebase => {
                        this.firebase = firebase;

                        return (
                            <div className="container">
                                <div className="row">
                                    <div className="col l7 collection-col">
                                        {this.state.listOfTodos.map(item => (
                                            <Collection isComplete={item.isComplete} body={item.body} />


                                        ))}

                                    </div>
                                    <TextArea
                                        value={this.state.value}
                                        name='task'
                                        handleInputChange={this.handleInputChange}
                                        handleFormSubmit={this.handleFormSubmit}

                                    />
                                </div>
                            </div>
                        )

        
                }
            }

            </FirebaseContext.Consumer>
        );
    }



};