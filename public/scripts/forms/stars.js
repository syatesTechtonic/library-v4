function createCover (id, title, cover) {
  const coverImg = document.createElement('img');
  let coverSrc = cover || 'assets/images/covers/no-cover.png';
  coverImg.id = id + '-cover';
  coverImg.classList.add('bk-info__cover');
  coverImg.src = coverSrc;
  coverImg.alt = title;
  $(coverImg).bind("click", (e) => {
    e.preventDefault();
    console.log(coverSrc);
  });
  return coverImg;
}

function createRating (id, rating) {
  const ratingDiv = document.createElement('div');
  ratingDiv.id = id + '-rating';
  ratingDiv.classList.add('bk-edit__rating');
  ratingDiv.dataset.rating = 0;
  for (let i = 1; i <= 5; i++) {
    let star = document.createElement('span');
    star.classList.add('fas', 'fa-star', 'bk-info__star')
    star.dataset.star = i;
    if (rating >= i) {
      star.classList.add('bk-info__star--checked');
    }
    $(star).bind("click", (e) => {
      e.preventDefault();
      $(star).addClass('bk-info__star--checked');
      $(star).prevAll().addClass('bk-info__star--checked');
      $(star).nextAll().removeClass('bk-info__star--checked');
      ratingDiv.dataset.rating = star.dataset.star;
    });
    ratingDiv.appendChild(star);
  }
  return ratingDiv;
}

function createCoverAndRating (id, title, cover, rating) {
  const coverImg = createCover(id, title, cover);
  const ratingDiv = createRating(id, rating);
  const coverRatingDiv = document.createElement('div');
  coverRatingDiv.classList.add('bk-info__cover-rating');
  coverRatingDiv.appendChild(coverImg);
  coverRatingDiv.appendChild(ratingDiv);
  return coverRatingDiv;
}

export default createCoverAndRating;