import React from 'react';
import './style.css';


export const TextArea = props => {
    return (
        <div className="text-div">
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="textarea1" value={props.value} name={props.name} className="materialize-textarea" onChange={props.handleInputChange} />
                            <label htmlFor="textarea1">{props.label}</label>
                            <h6 className="red-error">{props.error}</h6>
                            <a href="#!" className="waves-effect waves-light btn" onClick={props.handleFormSubmit}>{props.buttonName}</a>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    )

}