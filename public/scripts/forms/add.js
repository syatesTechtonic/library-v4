import books from '../books.js';
import populateBooks from '../populate-books.js';

function toggleAddBook () {
  const id = randomString();
  const formDisplay = document.createElement('form');
  formDisplay.id = id + '-form';
  formDisplay.classList.add('js-bk-form');
  formDisplay.addEventListener('submit', addBookSubmit);
  formDisplay.innerHTML = `<header id="${id}-header" class="bk-info__header js-bk-header">
    <div class="bk-edit__author">
      <label for="author">Author:</label>
      <input name="author" value=""/>
    </div>
    <div class="bk-edit__title">
      <label for="author">Title:</label>
      <input name="title" value=""/>
    </div>
  </header>
  <article id="${id}-info" class="bk-info js-bk-info">
    <div class="bk-info__cover-rating">
      <img name="cover" src="assets/images/covers/no-cover.png" alt="" class="bk-info__cover">
      <div class="bk-info__rating">
        <span data-star="1" class="fas fa-star bk-info__star"></span>
        <span data-star="2" class="fas fa-star bk-info__star"></span>
        <span data-star="3" class="fas fa-star bk-info__star"></span>
        <span data-star="4" class="fas fa-star bk-info__star"></span>
        <span data-star="5" class="fas fa-star bk-info__star"></span>
      </div>
    </div>
    <div class="bk-info__copy">
      <label for="pubDate" class="bk-info__copy--bold">Publication Date: </label>
      <input name="pubDate" type="date" class="bk-edit__pubDate" value="1970-01-01"/>
      <label for="pages" class="bk-info__copy--bold">Pages: </label>
      <input name="pages" type="number" class="bk-edit__pages" value="0"/>
      <label for="synopsis" class="bk-info__copy--bold">Synopsis: </label>
      <textarea name="synopsis" type="text" class="bk-edit__synopsis"></textarea>
      <div class="bk-info__buttons">
        <button id="${id}-add" type="submit" class="lb-button js-add">Save</button>
        <button id="${id}-cancel" type="button" class="lb-button js-cancel">Cancel</button>
      </div>
    </div>
  </article>`;
  const bkTableBody = document.getElementById('bkTableBody');
  bkTableBody.prepend(formDisplay);
  $('#' + id + '-header').addClass('bk-info__header--selected');
  $('#bkTableBody').children('.js-bk-header').not('#' + id + '-header').removeClass('bk-info__header--selected');
  $('#' + id + '-info').hide().addClass('bk-info--open').slideDown();
  attachAddHandlers(id);
}

function attachAddHandlers (id) {
  $('#' + id + '-cancel').bind("click", (e) => {
    e.preventDefault();
    populateBooks(books);
    return;
  });
}

function addBookSubmit (e) {
  e.preventDefault();
  const elements = e.target.elements;
  const book = {
    author: elements['author'].value,
    title: elements['title'].value,
    pubDate: elements['pubDate'].value,
    pages: elements['pages'].value,
    synopsis: elements['synopsis'].value
  }
  books.splice(0,0,book);
  populateBooks(books);
}

function randomString() {
  return Math.random().toString(36).substring(2, 15);
}

export default toggleAddBook;