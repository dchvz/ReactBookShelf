import React from 'react'
import './App.css';
import ShelfChanger from './ShelfChanger.js'
// TODO, ver que la opcion de select cambie el state del componente padre, se puede manejar como props.books, cambiar a class

class ShelfRow extends React.Component{
    constructor(props) {
        super()
    }
    handleShelfChange = (bookId, shelf) =>{
        this.props.onShelfUpdate(bookId,shelf )
    } 
    render() {
        let { books, shelfName } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ shelfName }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((item, index) => 
                                <li className="books-grid" key={index}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ item.imageLinks.thumbnail })` }}></div>
                                            <ShelfChanger shelfName={item.shelf} bookId={item.id} onHandleShelfChange={this.handleShelfChange} />
                                        </div>
                                        <div className="book-title">{ item.title }</div>
                                        <div className="book-authors">{ item.authors.toString() }</div>
                                    </div>
                                </li>)
                        }
                    </ol>
                </div>
            </div>
        )
    }
}


export default ShelfRow