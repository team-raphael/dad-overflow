import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import React, { Component } from 'react';

//class FormComponent extends Component {}
 

const {
    FormWithConstraints,
    FieldFeedbacks,
    FieldFeedback
  } = ReactFormWithConstraints;
  
  class AddaPost extends React.Component {
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
        <FormWithConstraints>
          ref={form => this.form = form}
          onSubmit={this.contactSubmit}
          noValidate>
  
          <div className="col-md-6">
            <input name="name" size="30" placeholder="Name"
                   required onChange={this.handleChange}
                   className="form-control" />
            <FieldFeedbacks for="name">
              <FieldFeedback when="*" />
            </FieldFeedbacks>
        </div>
  
          <div className="col-md-6">
            <textarea name="comments" cols="40" rows="20" placeholder="Message"
                      required minLength={5} maxLength={50}
                      onChange={this.handleChange}
                      className="form-control" />
            <FieldFeedbacks for="comments">
              <FieldFeedback when="*" />
            </FieldFeedbacks>
          </div>
  
          <div className="col-md-12">
            <button className="btn btn-lg btn-primary">Send Message</button>
          </div>
    </FormWithConstraints>
      );
export default AddaPost;