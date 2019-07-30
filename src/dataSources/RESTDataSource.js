const {
  RESTDataSource: BaseRestDataSource
} = require("apollo-datasource-rest");

class RESTDataSource extends BaseRestDataSource {
  constructor() {
    super();
    this.baseURL = process.env.THEMOVIEDB_BASE_URL;
  }

  async resolveURL(request) {
    request.params.append("api_key", process.env.THEMOVIEDB_API_KEY);
    return super.resolveURL(request);
  }
}

module.exports = RESTDataSource;
