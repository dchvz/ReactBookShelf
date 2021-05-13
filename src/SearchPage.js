import React from "react";
import * as BooksAPI from "./BooksAPI";
import ShelfRow from "./ShelfRow.js";
import { Link } from "react-router-dom";
import "./App.css";
import PropTypes from "prop-types";

class SearchBooks extends React.Component {
  state = {
    foundBooks: [],
  };

  /**
   * Searches books for a given query, and updates the state if results were found
   * @param {string} query - query used to look for books in the BooksAPI, as long as it's length is 3, since that is the length of the shortest search term
   */
  searchBooks = async (query) => {
    if (query.length > 0) {
      const bookResults = await BooksAPI.search(query);
      if (bookResults.error !== "empty query") {
        this.setState(() => ({
          foundBooks: bookResults.filter(
            (x) => x.authors !== undefined && x.imageLinks !== undefined
          ),
        }));
        this.setShelfs();
      } else {
        this.resetFoundBooks();
      }
    } else {
      this.resetFoundBooks();
    }
  };

  /**
   * changes the foundBooks array of the state to be empty
   * @return {void}
   */
  resetFoundBooks = () => {
    this.setState(() => ({
      foundBooks: [],
    }));
  };
  /**
   * Method that adds the shelf field to books from the search results
   */
  setShelfs = () => {
    const { foundBooks } = this.state;
    const { books } = this.props;
    let updatedBookShelf = JSON.parse(JSON.stringify(foundBooks));
    for (let book of books) {
      const index = foundBooks.findIndex((x) => x.id === book.id);
      if (index !== -1) {
        updatedBookShelf[index] = book;
      }
    }
    this.setState(() => ({
      foundBooks: updatedBookShelf,
    }));
  };

  /**
   * Component that renders a search bar and the search results if there are any
   */
  render() {
    let { foundBooks } = this.state;
    let { handleShelfUpdate } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {foundBooks.length > 0 ? (
            <ShelfRow
              books={foundBooks}
              shelfName={"Search Results"}
              handleShelfUpdate={handleShelfUpdate}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  handleShelfUpdate: PropTypes.func,
  books: PropTypes.array,
};

export default SearchBooks;
