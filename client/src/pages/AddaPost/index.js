import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import React, { Component } from 'react';

class FormComponent extends Component {
  constructor () {
    this.state = {
      email: ''
    }
  }
  
  changeHandler = event => {
    this.setState({
      email: event.target.value
    });
  }

  render () {
    return (
      <form>
          <input type="email" 
                 name="email"   
                 value={this.state.email} 
                 onChange={this.changeHandler} 
          />
      </form>
    );        
  }
}

export default FormComponent;
                

