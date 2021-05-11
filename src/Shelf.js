import React from 'react'
import { Link } from 'react-router-dom'
import ShelfRow from './ShelfRow.js'
import './App.css'

function Shelf(props) {
    if( props.books.length === 0 ) return null
    return (
        // cargar esto cuando el state de books ya este lleno
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <ShelfRow books = { props.books.filter( x => x.shelf === "currentlyReading" ) } shelfName={"Currently Reading"} shelfUpdate = {props.shelfUpdate} />
                <ShelfRow books = { props.books.filter( x => x.shelf === "wantToRead" ) } shelfName={"Want to Read"} shelfUpdate = {props.shelfUpdate} />
                <ShelfRow books = { props.books.filter( x => x.shelf === "read" ) } shelfName={"Read"} shelfUpdate = {props.shelfUpdate} />
            </div>
            <Link className="open-search" to="/search">
                <button className="open-search" type="button" />
            </Link>
        </div>
    )
}

export default Shelf

