const getImageUrl = (size, path) =>
  `https://image.tmdb.org/t/p/${size.toLowerCase()}/${path}`;

module.exports = { getImageUrl };
