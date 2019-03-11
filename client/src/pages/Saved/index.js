import React from 'react';
import './style.css';
import Card from '../../components/Card';
import APIService from '../../services/APIService';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';

class Saved extends React.Component {
    state = {
        books: []
    };

    componentDidMount = () => {
        //Get all the books saved to the database and set the state
        this.refreshBooks();
    };

    refreshBooks = () => {

        //Lock the screen while the books are being refreshed
        this.lockScreen.lock();
        
        //Get all the books saved to the database and set the state
        APIService.getBooks()
            .then(books => {
                this.setState({
                    books: books.data
                });
            })
            .catch(error => {
                console.log(error);
                window.M.toast({ html: 'Error getting books from the API service!' });
            })
            .finally(() => {
                //Unlock the screen after the books have been refreshed
                this.lockScreen.unlock();
            });
    };

    onDeleteHandler = (bookId) => {
        //Lock the screen while the book is being deleted
        this.lockScreen.lock("Deleting");

        //Delete the books from the database
        APIService.deleteBook(bookId)
            .then(() => {
                window.M.toast({ html: 'Book deleted!' });
                //Get all the books saved to the database and set the state
                //Refresh books will also unlock the screen when completed
                this.refreshBooks();
            })
            .catch(error => {
                //Unlock the screen on error
                this.lockScreen.unlock();

                //Log error and display a message to the  user letting them know that there was an error
                console.log(error);
                window.M.toast({ html: 'Error deleting book from the API service!' });                
            });
    }

    render() {
        return (
            <div>
                <Jumbotron
                    mainText="Saved Books"
                    detailText=""
                />
                <div className="container savedPage">
                    <div className="row">
                        <h4>Saved Books</h4>
                        {this.state.books.map(book =>
                            <Card
                                isSaved="true"
                                key={book.bookId}
                                bookId={book.bookId}
                                image={book.smallThumbnail}
                                previewLink={book.infoLink}
                                title={book.title}
                                authors={book.authors}
                                description={book.description}
                                onDeleteHandler={this.onDeleteHandler} />
                        )}
                    </div>
                </div>

                <LockScreen id="savedPageLockScreen" ref={ (lockScreen) => this.lockScreen = lockScreen } />
            </div>
        )
    }
}

export default Saved;