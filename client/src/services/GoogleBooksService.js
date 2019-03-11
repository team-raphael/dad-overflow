import axios from 'axios';
const hostUrl = 'https://www.googleapis.com/books/v1'

export default {
    //Function that will search the google books API for a book title
    searchForBookTitle: (searchTerm) => {
        return axios.get(`${hostUrl}/volumes?q=${encodeURIComponent(searchTerm)}`);
    }
}
