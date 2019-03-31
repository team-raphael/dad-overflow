import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import { CollectionWrapper } from '../../components/CollectionWrapper';
import FirebaseContext from "../../components/Firebase/context";
import { Link } from 'react-router-dom';

class ToDo extends React.Component {
    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => {
                    this.firebase = firebase;

                    return (
                        <div className="wrapper white-text">
                            <Jumbotron
                                mainText="Dad Duties"
                                detailText="Getting Ready for Baby!"
                            />
                            {firebase.dbUserInfo &&
                                <div className="pageContainer toDoPageContainer">
                                    <div className="container">
                                        <p className="toDoDetailText center">To Do items to stay prepared</p>
                                        <CollectionWrapper 
                                            firebaseUserToken={firebase.firebaseUserToken}/>
                                    </div>


                                    <div className='fixed-action-btn'>
                                        <Link id='newPost' to={"/addtodo"} className="btn-floating btn-large waves-effect waves-light btn modal-trigger"><i className="large material-icons">add</i></Link>
                                    </div>
                                </div>
                            }

                            <LockScreen id="toDoPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                        </div>
                    );
                }}
            </FirebaseContext.Consumer>
        );
    }

}

export default ToDo;