import Book from './book.js';
import Observable from './observable.js';
import BookTable from './booktable.js';

const observable = new Observable();
const bookTable = new BookTable(observable);

export default class Engine {
  constructor(observable) {
    this.observable = observable;
    this.getData();
    this.bindListeners();
  }

  getData() {
    const data = fetch('./scripts/books.json', {
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => res.map(book => new Book(this.observable, book)))
    .catch(err => console.error(err));
  }

  bindListeners() {
    document.getElementById('addBook').addEventListener('click', () => {
      console.log('add book');
      return;
    });
    document.getElementById('pageDown').addEventListener('click', () => {
      bookTable.pageDown();
      return;
    });
    document.getElementById('pageUp').addEventListener('click', () => {
      bookTable.pageUp(bookTable.books.length);
      return;
    });
    document.getElementById('showAllBooks').addEventListener('click', () => {
      console.log('show all books');
      return;
    });
    document.getElementById('bookSearchSubmit').addEventListener('click', (e) => {
      e.preventDefault();
      console.log('search for book');
      return;
    });
  }
  
}

const engine = new Engine(observable);
