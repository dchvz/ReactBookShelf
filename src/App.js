import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage.js'
import Shelf from './Shelf.js'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  // update book on shelf
  shelfUpdate = async (bookId, shelf) => {
    let {books} = this.state
    // index of changed Element
    const index = books.findIndex(x => x.id === bookId)
    let newBook = {}
    if(index === -1 ){
      // if the book is not on the shelf, just add it
      newBook = await this.getBook(bookId)
      newBook.shelf = shelf
      this.setState(() => ({
        books: [...books, newBook]
      }))
    } else {
      newBook = books[index]
      // getBooks
      let booksCopy = JSON.parse(JSON.stringify(books));
      booksCopy[index].shelf = shelf
      // change the books state, update the shelf of the modified book only
      this.setState(() => ({
          books: booksCopy
      }))
    }
    // update the book
    await BooksAPI.update(newBook, shelf)
  }

  // get book's data by id
  getBook = async id =>{
    return await BooksAPI.get(id)
  }

  // get books form API
  getBooks = async () => {
    let booksFromAPI = await BooksAPI.getAll()
      this.setState(() => ({
          books: booksFromAPI
      }))
  }

  render() {
    let { books } = this.state 
    return (
      <div className="app">
        <Route exact path="/" render = { () => (
          <Shelf books={books} shelfUpdate ={this.shelfUpdate} />
        )} />
        <Route exact path="/search" render = { () => (
          <SearchPage books={books} shelfUpdate ={this.shelfUpdate} />
        )} />
      </div>
    )
  }

  componentDidMount(){
    this.getBooks()
  }
}

export default BooksApp
