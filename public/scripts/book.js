export default class Book {
  constructor(observable, book) {
    const { id, author, title, cover, rating, pubDate, pages, synopsis } = book;
    this.observable = observable
    this.bookData = {
      id: String(id) || '',
      author: String(author) || '',
      title: String(title) || '',
      cover: String(cover) || '../assets/images/covers/no-cover.png',
      rating: parseInt(rating) || 0,
      pages: parseInt(pages) || 0,
      pubDate: new Date(pubDate).getFullYear() || new Date().getFullYear().toString(),
      synopsis: String(synopsis) || ''
    }
    
    this.observable.publish('book-created', this.bookData)
  }

  updateBook (updatedBook) {
    const { author, title, cover, rating, pubDate, pages, synopsis } = updatedBook;
    this.bookData.author = String(author) || '';
    this.bookData.title = String(title) || ''; 
    this.bookData.cover = String(cover) || '../assets/images/covers/no-cover.png';
    this.bookData.rating = parseInt(rating) || 0;
    this.bookData.pages = parseInt(pages) || 0;
    this.bookData.pubDate = new Date(pubDate).getFullYear() || new Date().getFullYear().toString();
    this.bookData.synopsis = String(synopsis) || '';

    this.observable.publish('book-updated', this.bookData)
  }

  deleteBook (id) {
    this.observable.publish('book-deleted', { id })
  }

}