import React from "react";
import "./App.css";
import ShelfChanger from "./ShelfChanger.js";
import PropTypes from "prop-types";
/**
 * Component that renders the books on a specific shelf
 */
function ShelfRow(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((item) => (
            <li className="books-grid" key={item.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${item.imageLinks.thumbnail})`,
                    }}
                  />
                  <ShelfChanger
                    shelfName={item.shelf}
                    bookId={item.id}
                    handleShelfUpdate={props.handleShelfUpdate}
                  />
                </div>
                <div className="book-title">{item.title}</div>
                <div className="book-authors">{item.authors.toString()}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

ShelfRow.propTypes = {
  shelfName: PropTypes.string,
  handleShelfUpdate: PropTypes.func,
  books: PropTypes.array,
};

export default ShelfRow;
