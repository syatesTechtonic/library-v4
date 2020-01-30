import books from '../books.js';
import populateBooks from '../populate-books.js';

function checkBook (input, book) {
  return input.title && book.title.toLowerCase().includes(input.title.toLowerCase()) || input.author && book.author.toLowerCase().includes(input.author.toLowerCase());
}

function bindSearch () {
  $('#bookSearch').submit(e => {
    e.preventDefault();
    const input = {
      title: $('[name="titleSearch"]').val() || '',
      author: $('[name="authorSearch"]').val() || ''
    }
    const results = books.filter(book => checkBook(input, book));
    if (results) {
      $('#bkTableBody').children().remove();
      populateBooks(results);
      return;
    }
    console.log('no books matched your serach');
    return;
  })
}

export default bindSearch;