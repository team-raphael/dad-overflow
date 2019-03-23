
import './style.css';
import React, { Component } from 'react';

//class FormComponent extends Component {}


class AddaPost extends Component {
  handleChange = e => {
    this.form.validateFields(e.target);
  }

  contactSubmit = e => {
    e.preventDefault();

    this.form.validateFields();

    if (!this.form.isValid()) {
      console.log('form is invalid: do not submit');
    } else {
      console.log('form is valid: submit');
    }
  }

  render() {
    return (
      <form>
        
      </form>
    )
  }
}

export default AddaPost;