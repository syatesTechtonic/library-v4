import books from '../books.js';
import populateBooks from '../populate-books.js';
import createCoverAndRating from './stars.js'

function toggleEditBook (id) {
  const bookToEdit = books.find(book => book.id === id);
  const { author, title, cover, pubDate, pages, synopsis, rating } = bookToEdit;
  const formDisplay = document.createElement('form');
  formDisplay.id = id + '-form';
  formDisplay.classList.add('js-bk-form');
  formDisplay.addEventListener('submit', editBookSubmit);
  formDisplay.innerHTML = `<header id="${id}-header" class="bk-info__header js-bk-header">
    <div class="bk-edit__author">
      <label for="author">Author:</label>
      <input name="author" value="${author}"/>
    </div>
    <div class="bk-edit__title">
      <label for="author">Title:</label>
      <input name="title" value="${title}"/>
    </div>
  </header>
  <article id="${id}-info" class="bk-info bk-info--open js-bk-info">
    <div class="bk-info__copy">
      <label for="pubDate" class="bk-info__copy--bold">Publication Date: </label>
      <input name="pubDate" type="date" class="bk-edit__pubDate" value="${pubDate}"/>
      <label for="pages" class="bk-info__copy--bold">Pages: </label>
      <input name="pages" type="number" class="bk-edit__pages" value="${pages}"/>
      <label for="synopsis" class="bk-info__copy--bold">Synopsis: </label>
      <textarea name="synopsis" type="text" class="bk-edit__synopsis">${synopsis}</textarea>
      <div class="bk-info__buttons">
        <button id="${id}-save" type="submit" class="lb-button js-save">Save</button>
        <button id="${id}-cancel" type="button" class="lb-button js-cancel">Cancel</button>
      </div>
    </div>
  </article>`;
  const readDisplay = document.getElementById(id + '-book');
  readDisplay.replaceWith(formDisplay);
  attachEditHandlers(id);
  const coverAndRating = createCoverAndRating(id, title, cover, rating);
  const info = document.getElementById(id + '-info');
  info.prepend(coverAndRating);
}

function attachEditHandlers (id) {
  $('#' + id + '-cancel').bind("click", (e) => {
    e.preventDefault();
    populateBooks(books);
    return;
  });
}

function editBookSubmit (e) {
  e.preventDefault();
  const elements = e.target.elements;
  const bookId = e.target.id.split('-')[0];
  const book = books.find(book => book.id === bookId);
  const rating = document.getElementById(bookId + '-rating').dataset.rating;
  book.author = elements['author'].value;
  book.title = elements['title'].value;
  book.pubDate = elements['pubDate'].value;
  book.pages = elements['pages'].value;
  book.synopsis = elements['synopsis'].value;
  book.rating = parseInt(rating);
  populateBooks(books);
}

export default toggleEditBook;