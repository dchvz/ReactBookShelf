import React from 'react'
import * as BooksAPI from './BooksAPI'
import ShelfRow from './ShelfRow.js'
import { Link } from 'react-router-dom'
import './App.css'

class SearchBooks extends React.Component {
    state = {
        foundBooks: [],
    }

    // searches books for a given query
    searchBooks = async (query) => {
        // since that is the length of the shortest search term
        if(query.length>=3){
            let bookResults = await BooksAPI.search(query)
            if(bookResults.length > 0){
                this.setState( () => ({
                    foundBooks: bookResults.filter(x=> x.authors!== undefined  && x.imageLinks !== undefined)
                }))
                this.setShelfs()
            }
        }
    }

    // method that adds the shelf field to books from the search results
    setShelfs = () => {
        let { foundBooks} = this.state
        let { books } = this.props
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

    render() {
        let { foundBooks } = this.state
        let { shelfUpdate } = this.props
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
                    foundBooks.length > 0
                    ? <ShelfRow books = { foundBooks } shelfName={"Search Results"} shelfUpdate = {shelfUpdate} />
                    : null
                }
            </div>
        </div>
    }
}

export default SearchBooks