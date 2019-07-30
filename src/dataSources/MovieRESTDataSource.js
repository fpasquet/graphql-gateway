const RESTDataSource = require("./RESTDataSource");

class MovieRESTDataSource extends RESTDataSource {
  async getMovies({ page = 1, sortedBy }) {
    const { lang, region } = this.context;
    return this.get(`/movie/${sortedBy.toLowerCase()}`, {
      page,
      language: lang,
      region
    });
  }
}

module.exports = MovieRESTDataSource;
