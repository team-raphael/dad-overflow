import React from 'react';
import './style.css';


export const TextArea = props => {
    return (
        <div>
            <div className="row">
                <form className="col l12">
                    <div className="row">
                        <div className="input-field col l9">
                            <textarea id="textarea1" className="materialize-textarea" onChange={props.handleInputChange} />
                            <label htmlFor="textarea1">Add a task</label>
                            <a href="#!" className="waves-effect waves-light btn" onClick={props.handleFormSubmit}>Add</a>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    )

}