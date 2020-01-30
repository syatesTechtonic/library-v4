export default class BookTable {
  constructor(observable) {
    this.observable = observable;
    this.books = [];
    this.booksToDisplay = [];
    this.page = 1;
    this.booksPerPage = 6;
    
    this.observable.subscribe('book-created', this.addBook.bind(this));
    this.observable.subscribe('book-updated', this.updateBook.bind(this));
    this.observable.subscribe('book-deleted', this.deleteBook.bind(this));
  }

  addBook(book) {
    const index = this.books.push(book) - 1;
    const range = {
      startIndex: (this.page - 1) * this.booksPerPage,
      endIndex: this.page * this.booksPerPage - 1,
      lastPage: Math.ceil(length / this.booksPerPage)
    };
    if (index >= range.startIndex && index <= range.endIndex) {
      this.makeBook(book);
      this.booksToDisplay.push(book);
    }
  }

  updateBook(updatedBook) {
    const index = this.books.findIndex(oldBook => oldBook.id === updatedBook.id);
    this.books.splice(index, 1, updatedBook);
  }

  deleteBook(id) {
    const index = this.books.findIndex(book => book.id === id);
    this.books.splice(index, 1);
  }

  async makeBook(book) {
    if (this.booksToDisplay.length >= this.booksPerPage) {
      return;
    }
    const { id, author, title, cover, pubDate, pages, synopsis, rating } = book;
    const markup = `<section id="${id}" class="js-bk">
      <header id="${id}-header" class="bk-info__header js-bk-header">
        <h3 class="bk-info__author">${author}</h3>
        <h3 class="bk-info__title">${title}</h3>
        <span class="fas fa-caret-down bk-info__carat"></span>
      </header>
      <article id="${id}-info" class="bk-info js-bk-info">
        <div class="bk-info__cover-rating">
          <img src="${cover ? cover : 'assets/images/covers/no-cover.png'}" alt="${title} cover" class="bk-info__cover">
          <div class="bk-info__rating">
            ${this.renderStars(rating)}
          </div>
        </div>
        <div class="bk-info__copy">
          <p><span class="bk-info__copy--bold">Publication Date: </span>${pubDate}</p>
          <p><span class="bk-info__copy--bold">Pages: </span>${pages}</p>
          <p><span class="bk-info__copy--bold">Synopsis: </span>${synopsis}</p>
          <div class="bk-info__buttons">
            <button id="${id}-edit" class="lb-button js-edit">Edit</button>
            <button id="${id}-delete" class="lb-button js-delete">Delete</button>
          </div>
        </div>
      </article>
    </section>`;
    await this.addBookToTable(markup);
    this.attachDisplayHandlers(book);
    return;
  }

  renderStars(rating) {
    let stars = ``;
    for (let i = 0; i < 5; i++) {
      stars += `<span data-star="${i}" class="fas fa-star bk-info__star${i < rating ? ' bk-info__star--checked' : ''}"></span>`
    }
    return stars;
  }

  addBookToTable(markup) {
    document.getElementById('bkTableBody').innerHTML += markup;
  }

  attachDisplayHandlers (book) {
    const id = book.id;
    const header = document.getElementById(id + '-header');
    const info = document.getElementById(id + '-info');
    header.addEventListener('click', (e) => {
      e.preventDefault();
      header.classList.toggle('bk-info__header--selected');
      info.classList.toggle('bk-info--open');
    });
    document.getElementById(id + '-edit').addEventListener('click', e => {
      e.preventDefault();
      this.makeForm(id);
      return;
    });
    document.getElementById(id + '-delete').addEventListener('click', e => {
      e.preventDefault();
      this.deleteBook(id);
      console.log(this.books)
      document.getElementById(id + '-header').remove();
      document.getElementById(id + '-info').remove();
      return;
    })
    // $('#' + id + '-header').bind("click", (e) => {
    //   e.preventDefault();
    //   if ($(headerId).hasClass('bk-info__header--selected')) {
    //     $(infoId).slideUp();
    //     $(headerId).removeClass('bk-info__header--selected');
    //     $(headerId).children('span').removeClass('bk-info__carat--selected');
    //     return;
    //   } else {
    //     $(headerId).addClass('bk-info__header--selected');
    //     $(headerId).children('span').addClass('bk-info__carat--selected');
    //     $('#bkTable').children('.js-bk-header').not(headerId).removeClass('bk-info__header--selected');
    //     $(infoId).hide().addClass('bk-info--open').slideDown();
    //     $('#bkTable').children('.js-bk-info').not(infoId).removeClass('bk-info--open').slideUp();
    //     return;
    //   }
    // });
  }

  async makeForm(id) {
    const book = this.books.find(book => book.id === id);
    const { author, title, cover, pubDate, pages, synopsis, rating } = book;
    const markup = `<form id="${id}-form" class="js-bk-form">
      <header id="${id}-header" class="bk-info__header js-bk-header">
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
        <div class="bk-edit__cover-rating">
          <img src="${cover ? cover : 'assets/images/covers/no-cover.png'}" alt="${title} cover" class="bk-info__cover">
          <div class="bk-info__rating">
            ${this.renderStars(rating)}
          </div>
        </div>
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
      </article>
    </form>`;
    await this.displayToForm(id, markup);
    this.attachEditHandlers(id);
    return;
  }

  displayToForm(id, markup) {
    const display = document.getElementById(id);
    display.innerHTML = markup;
  }
  
  attachEditHandlers (id) {
    const starDiv = document.getElementById(id + '-info').firstChild.lastChild;
    starDiv.children.forEach(clickedStar => clickedStar.addEventListener('click', e => {
      e.preventDefault();
      stars.forEach(eachStar => eachStar.dataSet.star <= clickedStar.dataSet.star ? eachStar.classList.add('bk-info__star--checked') : eachStar.classList.remove('bk-info__star--checked'))
      return;
    }))
  }

  // createRating (id, rating) {
    // const ratingDiv = document.createElement('div');
    // ratingDiv.id = id + '-rating';
    // ratingDiv.classList.add('bk-edit__rating');
    // ratingDiv.dataset.rating = 0;
    // for (let i = 1; i <= 5; i++) {
    //   let star = document.createElement('span');
    //   star.classList.add('fas', 'fa-star', 'bk-info__star')
    //   star.dataset.star = i;
    //   if (rating >= i) {
    //     star.classList.add('bk-info__star--checked');
    //   }
      // $(star).bind("click", (e) => {
      //   e.preventDefault();
      //   $(star).addClass('bk-info__star--checked');
      //   $(star).prevAll().addClass('bk-info__star--checked');
      //   $(star).nextAll().removeClass('bk-info__star--checked');
      //   ratingDiv.dataset.rating = star.dataset.star;
      // });
      // ratingDiv.appendChild(star);
    // }
    // return ratingDiv;
  // }
  
  editBookSubmit (e) {
    e.preventDefault();
    console.log('edit book submitted')
    // const elements = e.target.elements;
    // const bookId = e.target.id.split('-')[0];
    // const book = this.books.find(book => book.id === bookId);
    // const rating = document.getElementById(bookId + '-rating').dataset.rating;
    // book.author = String(elements['author'].value) || '';
    // book.title = String(elements['title'].value) || '';
    // book.cover = String(elements['cover'].src) || '../assets/images/covers/no-cover.png';
    // book.rating = parseInt(rating) || 0;
    // book.pages = parseInt(elements['pages'].value) || 0;
    // book.pubDate = new Date(elements['pubDate'].value).getFullYear() || new Date().getFullYear().toString();
    // book.synopsis = String(elements['synopsis'].value) || '';
  }

  pageDown() {
    this.page = this.page === 1 ? this.page : this.page - 1;
    console.log(this.page);
  }

  pageUp(length) {
    const lastPage = Math.ceil(length / this.booksPerPage);
    this.page = this.page === lastPage ? this.page : this.page + 1;
    console.log(this.page);
  }

//   deleteBook(id) {
//     this.books.splice(this.books.findIndex(book => book.data.id === id), 1);
//     this.books.forEach(book => console.log(book.data));
//   }

//   updateBook(updatedBook) {
//     this.books.splice(this.books.findIndex(oldBook => oldBook.data.id === updatedBook.id), 1);
//     this.addBook(updatedBook);
//   }
}