import React from "react";
import { Link } from "react-router-dom";
import ShelfRow from "./ShelfRow.js";
import "./App.css";
import PropTypes from "prop-types";

/**
 * Component that displays books with assigned shelfs
 */
function Shelf(props) {
  if (props.books.length === 0) return null;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <ShelfRow
          books={props.books.filter((x) => x.shelf === "currentlyReading")}
          shelfName={"Currently Reading"}
          handleShelfUpdate={props.handleShelfUpdate}
        />
        <ShelfRow
          books={props.books.filter((x) => x.shelf === "wantToRead")}
          shelfName={"Want to Read"}
          handleShelfUpdate={props.handleShelfUpdate}
        />
        <ShelfRow
          books={props.books.filter((x) => x.shelf === "read")}
          shelfName={"Read"}
          handleShelfUpdate={props.handleShelfUpdate}
        />
      </div>
      <Link className="open-search" to="/search">
        <button className="open-search" type="button" />
      </Link>
    </div>
  );
}

Shelf.propTypes = {
  /**
   * Function that updates the selected book's shelf
   */
  handleShelfUpdate: PropTypes.func,
  /**
   * Array of objects that have an assigned shelf
   */
  books: PropTypes.array,
};

export default Shelf;
