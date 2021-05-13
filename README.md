# MyReads Project

This application renders a list of books by shelfs so that the user can categorize the books he/she finds interesting on the categories: **"Currently Reading", "Want to Read", "Read"**

## Getting Started

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## File Structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of the app, renders the main Components(Shelf and SearchPage) based on the route
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── Shelf.js # A React component that renders books from the Udacity backend in the corresponding shelf
    ├── SearchPage.js # A React component that includes a search bar to look for new books that can be added to the shelf or change books who are already in shelfs to another shelf
    ├── ShelfRow.js # A React component that renders the books from a specific shelf
    ├── ShelfChanger.js # A React component that changes the book's current shelf to what is selected in it
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
##

## Udacity's Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page. 

## React Components

### `App.js`

It is the component that contains the data of books that have an assigned shelf. 

It contains the following in its state
*  books: `<Array>` books array with assigned shelfs

It uses the following functions

```js
shelfUpdate(bookId, shelf)
```
* bookId `<String>`
* shelf `<String>`
* Updates the state containing the books with assigned shelfs


```js
getBooks()
```
* Gets books that have assigned shelfs from the Udacity's Backend Server


### `Shelf.js`

It is the component that displays books with assigned shelfs to them, to do so it receives props from its parent `App.js`

*  handleShelfUpdate: `<Function>` function that updates the shelf of a selected book on the App.js state
*  books: `<Array>` books with assigned shelfs

### `ShelfRow.js`

It is the component that displays the book on a specific shelf, to do so it receives the following props

*  handleShelfUpdate: `<Function>` function that updates the shelf of a selected book on the App.js state
*  books: `<Array>` Books of an specific category
*  shelfName: `<String>` The name of the current book shelf


### `ShelfChanger.js`

It is the component that changes the shelf of the selected book

*  handleShelfUpdate: `<Function>` function that updates the shelf of a selected book on the App.js state
*  bookId: `<String>` The id of the book that is gonna get its shelf changed
*  shelfName: `<String>` The current shelf that the book is actually on


### `SearchPage.js`

It is the component that looks for books that match a specific query and then is able to change its shelf

It contains the following in its state
*  foundBooks: `<Array>` books array of found books by a given query

It uses the following functions

```js
searchBooks(query)
```
* query `<String>`
* Updates the `foundBooks` field of the state whenever the query length is > 0, otherwise it updates it to be an empty array, it also verifies that the result had no errors. It only adds the results when they have the `authors` and `imageLinks` properties.

```js
resetFoundBooks()
```
* It resets the `foundBooks` field of the state to be an empty array

```js
setShelfs()
```
* It assigns a shelf to the found books if they already have one assigned


It receives the following as props:

*  handleShelfUpdate: `<Function>` function that updates the shelf of a selected book on the App.js state
*  books: `<Array>` books with assigned shelfs

Note that the `search()` endpoint receives an error object when the search term is not valid, so no results are shown when such data is retrived.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
