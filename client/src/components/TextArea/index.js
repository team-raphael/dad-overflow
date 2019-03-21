import React from 'react';
import './style.css';


export const TextArea = props => {
    return (
        <div>
            <div class="row">
                <form class="col l12">
                    <div class="row">
                        <div class="input-field col l9">
                            <textarea id="textarea1" class="materialize-textarea" onChange={props.handleInputChange} />
                            <label for="textarea1">Add a task</label>
                            <a class="waves-effect waves-light btn" onClick={props.handleFormSubmit}>Add</a>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    )

}