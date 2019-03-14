import React from "react";
import Jumbotron from '../../components/Jumbotron';

function NoMatch() {
    return (
        <div>
            <Jumbotron
                mainText="404 Page Not Found"
                detailText=""
            />
            <div className="container savedPage">
                <div className="row">
                    <h1 className="center-align">
                        <span role="img" aria-label="Face With Rolling Eyes Emoji">🙄</span>
                    </h1>
                </div>
            </div>

        </div>
    );
}

export default NoMatch;
