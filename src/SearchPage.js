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
    if (query.length >= 3) {
      let bookResults = await BooksAPI.search(query);
      if (bookResults.length > 0) {
        this.setState(() => ({
          foundBooks: bookResults.filter(
            (x) => x.authors !== undefined && x.imageLinks !== undefined
          ),
        }));
        this.setShelfs();
      }
    }
  };

  /**
   * Method that adds the shelf field to books from the search results
   */
  setShelfs = () => {
    let { foundBooks } = this.state;
    let { books } = this.props;
    let updatedBookShelf = JSON.parse(JSON.stringify(foundBooks));
    for (let book of books) {
      let index = foundBooks.findIndex((x) => x.id === book.id);
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
  /**
   * Function that updates the selected book's shelf
   */
  handleShelfUpdate: PropTypes.func,
  /**
   * Array of objects that have an assigned shelf
   */
  books: PropTypes.array,
};

export default SearchBooks;
