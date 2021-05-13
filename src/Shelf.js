import React from "react";
import { Link } from "react-router-dom";
import ShelfRow from "./ShelfRow.js";
import "./App.css";
import PropTypes from "prop-types";

/**
 * array of shelfs that the books can be displayed on
 */
const shelves = [
  { title: "Currently Reading", key: "currentlyReading" },
  { title: "Want To Read", key: "wantToRead" },
  { title: "Read", key: "read" },
];

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
        {shelves.map((item) => (
          <ShelfRow
            key={item.key}
            books={props.books.filter((x) => x.shelf === item.key)}
            shelfName={item.title}
            handleShelfUpdate={props.handleShelfUpdate}
          />
        ))}
      </div>
      <Link className="open-search" to="/search">
        <button className="open-search" type="button" />
      </Link>
    </div>
  );
}

Shelf.propTypes = {
  handleShelfUpdate: PropTypes.func,
  books: PropTypes.array,
};

export default Shelf;
