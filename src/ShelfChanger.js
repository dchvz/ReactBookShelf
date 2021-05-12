import React from "react";
import PropTypes from "prop-types";

/**
 * Component that renders the available shelfs for a book
 */
function ShelfChanger(props) {
  return (
    <div className="book-shelf-changer">
      <select
        onChange={(e) => props.handleShelfUpdate(props.bookId, e.target.value)}
        value={props.shelfName === undefined ? "none" : props.shelfName}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

ShelfChanger.propTypes = {
  /**
   * The shelf that the current book is on
   */
  shelfName: PropTypes.string,
  /**
   * The id of the book that can change its shelf
   */
  bookId: PropTypes.string,
  /**
   * Function that updates the selected book's shelf
   */
  handleShelfUpdate: PropTypes.func,
};

export default ShelfChanger;
