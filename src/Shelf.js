import React from 'react'
import { Link } from 'react-router-dom'
import ShelfRow from './ShelfRow.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

// TODO initialize the shelf the book is actually at
class Shelf extends React.Component {
    state = {
        books: [],
        loaded: false 
    }
    
    // get books form API
    getBooks = async () => {
        let booksFromAPI = await BooksAPI.getAll()
        this.setState(() => ({
            books: booksFromAPI,
            loaded: true
        }))
    }

    // update book shelf
    shelfUpdate = async (bookId, shelf) => {
        let {books} = this.state
        // index of changed Element
        const index = books.findIndex(x => x.id === bookId)
        let book = books[index]
        // update the book
        await BooksAPI.update(book, shelf)
        // getBooks
        let booksCopy = JSON.parse(JSON.stringify(books));
        booksCopy[index].shelf = shelf
        // change the books state, update the shelf of the modified book only
        this.setState(() => ({
            books: booksCopy
        }))
    }
    
    componentDidMount(){
        this.getBooks()
    }

    render(){
        let { books, loaded } = this.state
        if(!loaded) return null
        // cargar esto cuando el state de books ya este lleno
        return <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <ShelfRow books = { books.filter( x => x.shelf === "currentlyReading" ) } shelfName={"currentlyReading"} onShelfUpdate = {this.shelfUpdate} />
                <ShelfRow books = { books.filter( x => x.shelf === "wantToRead" ) } shelfName={"wantToRead"} onShelfUpdate = {this.shelfUpdate} />
                <ShelfRow books = { books.filter( x => x.shelf === "read" ) } shelfName={"read"} onShelfUpdate = {this.shelfUpdate} />
            </div>
            <Link className="open-search" to="/search">
                <button className="open-search" type="button" />
            </Link>
        </div>
    }
}

export default Shelf

