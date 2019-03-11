import React from 'react';
import './style.css';
import Card from '../../components/Card';
import GoogleBookService from '../../services/GoogleBooksService';
import APIService from '../../services/APIService';
import Jumbotron from '../../components/Jumbotron';
import LockScreen from '../../components/LockScreen';

class Search extends React.Component {

    state = {
        searchTerm: "",
        books: []
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    searchForBookTitle = event => {
        event.preventDefault();

        const searchForm = document.getElementsByClassName("searchForm")[0];

        if (searchForm.checkValidity()) {

            //Lock the screen when searching
            this.lockScreen.lock("Searching");

            GoogleBookService.searchForBookTitle(this.state.searchTerm)
                .then(books => {
                    if (books.data.items && books.data.items.length > 0) {
                        this.setState({
                            books: books.data.items
                        });
                    } else {
                        this.setState({
                            books: []
                        });
                        window.M.toast({ html: 'No books found!' });
                    }
                })
                .catch(error => {
                    console.log(error);
                    window.M.toast({ html: 'Error getting books from the google book service!' });
                })
                .finally(() => {
                    //Unlock the scren when searching is complete
                    this.lockScreen.unlock();
                });
        }
    }

    onSaveHandler = (bookId) => {
        const bookServiceBook = this.state.books.find((element) => element.id === bookId);

        const newBook = {
            bookId: bookServiceBook.id,
            smallThumbnail: bookServiceBook.volumeInfo.imageLinks.smallThumbnail,
            infoLink: bookServiceBook.volumeInfo.infoLink,
            title: bookServiceBook.volumeInfo.title,
            authors: bookServiceBook.volumeInfo.authors,
            description: bookServiceBook.volumeInfo.description
        };

        //Lock the screen while the book is being saved
        this.lockScreen.lock("Saving");

        APIService.saveBook(newBook)
            .then(() => {
                window.M.toast({ html: 'Book saved!' });
                window.ioSocket.emit('message', `A new book titled '${newBook.title}' was saved!`);
            })
            .catch(error => {
                console.log(error);
                window.M.toast({ html: 'Error saving book to the API service!' });
            })
            .finally(() => {
                //Unlock the screen after the book has been saved
                this.lockScreen.unlock();
            });
    };

    render() {
        return (
            <div>
                <Jumbotron
                    mainText="Book Search"
                    detailText="Search for and save books of interest"
                />

                <div className="container searchPage">
                    <div className="row searchFormContainer">
                        <h4>Book Title Search</h4>
                        <form className="col s12 z-depth-1 searchForm">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input onChange={this.handleInputChange} name="searchTerm" id="searchTerm" type="text" className="validate" required pattern="^[a-zA-Z1-9].*" />
                                    <label htmlFor="searchTerm">Book Title</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <button onClick={this.searchForBookTitle} className="btn waves-effect waves-light" type="submit" name="action">Search
                                    <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="row searchResultsContainer">
                        <h4>Search Results</h4>
                        {this.state.books.map(book =>
                            <Card
                                key={book.id}
                                bookId={book.id}
                                image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ''}
                                previewLink={book.volumeInfo.infoLink}
                                title={book.volumeInfo.title}
                                authors={book.volumeInfo.authors}
                                description={book.volumeInfo.description}
                                onSaveHandler={this.onSaveHandler} />
                        )}
                    </div>

                </div>

                <LockScreen id="serachPageLockScreen" ref={ (lockScreen) => this.lockScreen = lockScreen } />
            </div>
        )
    }
}

export default Search;