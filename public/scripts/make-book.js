function makeBook (book) {
  const { id, author, title, cover, pubDate, pages, synopsis, rating } = book;
  return `<section id="${id}-book" class="js-bk">
    <header id="${id}-header" class="bk-info__header js-bk-header">
      <h3 class="bk-info__author">${author}</h3>
      <h3 class="bk-info__title">${title}</h3>
      <span class="fas fa-caret-down bk-info__carat"></span>
    </header>
    <article id="${id}-info" class="bk-info js-bk-info">
      <div class="bk-info__cover-rating">
        <img src="${cover ? cover : 'assets/images/covers/no-cover.png'}" alt="${title}" class="bk-info__cover">
        <div class="bk-info__rating">
          ${makeStars(rating)}
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
  </section>`
}

function makeStars (rating) {
  let stars = ``;
  for (let i = 0; i < 5; i++) {
    stars += `<span data-star="${i}" class="fas fa-star bk-info__star${i < rating ? ' bk-info__star--checked' : ''}"></span>`
  }
  return stars;
}

export default makeBook;