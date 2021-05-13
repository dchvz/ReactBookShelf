import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage.js";
import Shelf from "./Shelf.js";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  /**
   * Updates the selected book's shelf
   * @param {string} bookId - The id of the book whose shelf is going to be updated
   * @param {string} shelf - The value of the new book for the selected shelf
   * @returns {void}
   */
  shelfUpdate = async (bookId, shelf) => {
    const { books } = this.state;
    const index = books.findIndex((x) => x.id === bookId);
    let newBook = {};
    if (index === -1) {
      newBook = await this.getBook(bookId);
      newBook.shelf = shelf;
      this.setState(() => ({
        books: [...books, newBook],
      }));
    } else {
      newBook = books[index];
      let booksCopy = JSON.parse(JSON.stringify(books));
      booksCopy[index].shelf = shelf;
      this.setState(() => ({
        books: booksCopy,
      }));
    }
    // update the book
    await BooksAPI.update(newBook, shelf);
  };

  /**
   * Gets a book by id
   * @param {string} id - The id of the book to get
   * @returns {object} - Returns the book found by the BooksAPI
   */
  getBook = async (id) => {
    return await BooksAPI.get(id);
  };

  /**
   * Adds books who have shelfs assigned to them to this component's state
   * @returns {void}
   */
  getBooks = async () => {
    let booksFromAPI = await BooksAPI.getAll();
    this.setState(() => ({
      books: booksFromAPI,
    }));
  };

  /**
   * Component that renders the Shelf  or the SearchPage Component based on the route
   */
  render() {
    let { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Shelf books={books} handleShelfUpdate={this.shelfUpdate} />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage books={books} handleShelfUpdate={this.shelfUpdate} />
          )}
        />
      </div>
    );
  }

  /**
   * Gets all books who have assigned shelfs
   */
  componentDidMount() {
    this.getBooks();
  }
}

export default BooksApp;
