const { kebabCase: slugify } = require("lodash");
const { getImageUrl } = require("../helpers/transformer");

const resolvers = {
  MOVIE_SORTED_BY: {
    POPULAR: "popular",
    TOP_RATED: "top_rated",
    UPCOMING: "upcoming",
    NOW_PLAYING: "now_playing"
  },
  MovieWithPagination: {
    pageInfo: ({ total_results: total, page, results: items }) => ({
      total,
      currentPage: page,
      numberOfItems: items.length
    }),
    items: ({ results: items }) => items
  },
  Movie: {
    slug: ({ title }) => slugify(title),
    releaseDate: ({ release_date: releaseDate }) => releaseDate,
    originalTitle: ({ original_title: originalTitle }) => originalTitle,
    originalLang: ({ original_language: originalLang }) => originalLang,
    isAdult: ({ adult: isAdult }) => isAdult,
    posterPath: ({ poster_path: posterPath }, { size }) =>
      getImageUrl(size, posterPath),
    backdropPath: ({ backdrop_path: backdropPath }, { size }) =>
      getImageUrl(size, backdropPath),
    voteCount: ({ vote_count: voteCount }) => voteCount,
    voteAverage: ({ vote_average: voteAverage }) => voteAverage
  },
  Query: {
    movies: (_, { page, sortedBy }, { dataSources: { MovieRESTDataSource } }) =>
      MovieRESTDataSource.getMovies({ page, sortedBy })
  }
};

module.exports = resolvers;
