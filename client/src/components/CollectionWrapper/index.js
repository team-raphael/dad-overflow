import React, { Component } from 'react';
import './style.css';
import API from '../../services/APIService'
import { Collection } from '../Collection'
// import { listOfTodos } from './ListOfTodos'
import { TextArea } from '../TextArea'





export class CollectionWrapper extends Component {

    state = {
        listOfTodos: [],
        value: '',

    }

    componentDidMount() {
        API.getTasks('5c9056038e7212a0ffa7db21')
        .then(res => this.setState({listOfTodos: res.data}))
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
        API.createATask({ userId: '5c9072b1c7d8d1b9fee257b4' })
            .then(res => console.log(res.data))
        this.setState({body: newTask, isComplete: false})
        this.setState(prevState => ({
                listOfTodos: prevState.listOfTodos.concat(newTask)
        }));

    }

    render() {

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


};