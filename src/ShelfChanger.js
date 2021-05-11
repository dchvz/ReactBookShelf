import React from 'react'

class ShelfChanger extends React.Component {
    constructor(props){
        super()
    }
    // llamar a la funcion para cambiar el valor del state
    handleShelfChange = (e) => {
        this.props.onHandleShelfChange(this.props.bookId, e.target.value)
    }
    render(){
        let { shelfName } = this.props
        let shelfValue = shelfName === undefined?  "none": shelfName
        return (
            <div className="book-shelf-changer">
                <select onChange={this.handleShelfChange} value={shelfValue}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default ShelfChanger