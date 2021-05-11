import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage.js'
import Shelf from './Shelf.js'
import * as BooksAPI from './BooksAPI'

// todo, pasar props al shelf
class BooksApp extends React.Component {
  state = {
    books: []
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render = { () => (
          <Shelf data />
        )} />
        <Route exact path="/search" render = { () => (
          <SearchPage />
        )} />
      </div>
    )
  }
  // get books form API
  getBooks = async () => {
    let booksFromAPI = await BooksAPI.getAll()
      this.setState(() => ({
          books: booksFromAPI,
          loaded: true
      }))
    }

  componentDidMount(){
    console.log('this gets called')
    this.getBooks()
  }
}

export default BooksApp
