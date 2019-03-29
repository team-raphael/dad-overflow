import React from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';
import { PostCollection } from '../../components/PostCollection';
import { Link } from 'react-router-dom';
import FirebaseContext from "../../components/Firebase/context";
import Searchbar from '../../components/Searchbar';
import API from '../../services/APIService';

class Forum extends React.Component {
    state = {
        posts: []
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.getAllPosts();
    }

    getAllPosts = () => {
        this.lockScreen.lock();
        API.getPostsWithLimit()
            .then(dbPosts => {
                this.setState({ posts: dbPosts.data });
            })
            .finally(() => this.lockScreen.unlock());
    }

    onSearchSubmit = (searchTerm) => {
        this.lockScreen.lock();
        API.getPostSearch(searchTerm)
            .then(dbPosts => {
                this.setState({ posts: dbPosts.data });
            })
            .finally(() => this.lockScreen.unlock());
    }

    onSearchClose = () => {
        this.getAllPosts();
    }

    render() {
        return (

            <FirebaseContext.Consumer>
                {firebase => {
                    this.firebase = firebase;

                    return (
                        <div className="white-text">
                            <Jumbotron
                                mainText="Dad Overflow"
                            />

                            <div className="pageContainer">
                                <div className="container">
                                    <h3 id='forumTop' className='center'>Posts from dads just like you</h3>
                                    <div className="marginBottomMedium">
                                        <Searchbar
                                            id="formPageSearchbar"
                                            onCloseClick={this.onSearchClose}
                                            onSearchSubmit={this.onSearchSubmit} />
                                    </div>
                                    <PostCollection
                                        posts={this.state.posts} />
                                </div>

                            </div>
                            {firebase.firebaseUserInfo &&
                                <div className='fixed-action-btn'>
                                    <Link id='newPost' to={"/addapost"} className="btn-floating btn-large waves-effect waves-light btn modal-trigger"><i className="large material-icons">add</i></Link>
                                </div>
                            }
                            <LockScreen id="forumPageLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
                        </div>
                    );
                }}
            </FirebaseContext.Consumer>
        );
    }
}

export default Forum;