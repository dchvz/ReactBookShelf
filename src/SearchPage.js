import React from 'react'
import * as BooksAPI from './BooksAPI'
import ShelfRow from './ShelfRow.js'
import { Link } from 'react-router-dom'
import './App.css'

class SearchBooks extends React.Component {
    state = {
        foundBooks: [],
        books: [],
        loaded:false
    }
    searchBooks = async (query) => {
        this.setState( () => ({
            loaded: false
        }))
        // since that is the length of the shortest search term
        if(query.length>=3){
            let bookResults = await BooksAPI.search(query)
            if(bookResults.length > 0){
                this.setState( () => ({
                    foundBooks: bookResults.filter(x=> x.authors!== undefined  && x.imageLinks !== undefined),
                    loaded: true
                }))
                this.setShelfs()
            }
        }
    }
    
     // update book shelf
    shelfUpdate = async (bookId, shelf) => {
        let {foundBooks} = this.state
        // index of changed Element
        const index = foundBooks.findIndex(x => x.id === bookId)
        let book = foundBooks[index]
        // update the book
        await BooksAPI.update(book, shelf)
        // create a mock bookShelf
        let booksCopy = JSON.parse(JSON.stringify(foundBooks));
        booksCopy[index].shelf = shelf
        // change the books state, update the shelf of the modified book only
        this.setState(() => ({
            foundBooks: booksCopy,
        }))
    }
    // method that adds the shelf field to any book that has a shelf
    setShelfs = () => {
        let {books, foundBooks} = this.state
        let updatedBookShelf = JSON.parse(JSON.stringify(foundBooks))
        for(let book of books){
            let index = foundBooks.findIndex(x => x.id === book.id)
            if(index !== -1){
                updatedBookShelf[index] = book
            }
        }
        this.setState(() => ({
            foundBooks: updatedBookShelf
        }))
    }

    // method that loads the get all books API so that I can get the books who have assigned shelfs
    getBooksOnShelf = async () => {
        let booksFromAPI = await BooksAPI.getAll()
        this.setState(() => ({
            books: booksFromAPI,
            loaded: true
        }))
    }

    async componentDidMount() {
        await this.getBooksOnShelf()
    }

    render() {
        let {foundBooks, loaded} = this.state
        return <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={event => this.searchBooks(event.target.value)} />
                </div>
            </div>

            <div className="search-books-results">
                {
                    loaded
                    ? <ShelfRow books = { foundBooks } shelfName={"Search Results"} onShelfUpdate = {this.shelfUpdate} />
                    : null
                }
            </div>
        </div>
    }
}

export default SearchBooks