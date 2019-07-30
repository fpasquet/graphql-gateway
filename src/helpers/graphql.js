const { sync } = require("glob");
const path = require("path");
const {
  loadTypedefs,
  mergeTypeDefs,
  loadResolversFiles,
  mergeResolvers
} = require("graphql-toolkit");
const { PubSub } = require("apollo-server");

class GraphQLHelper {
  constructor() {
    this._typeDefs = null;
    this._resolvers = null;
    this._directives = null;
    this._dataSources = null;
    this._pubSub = null;
  }

  async getTypeDefs() {
    if (!this._typeDefs) {
      const typeDefs = loadTypedefs(
        path.resolve(__dirname, "../definitions/**/*.graphql")
      ).then(typeDefFiles => {
        return mergeTypeDefs(typeDefFiles.map(({ content }) => content));
      });
      this._typeDefs = typeDefs;
    }

    return this._typeDefs;
  }

  async getResolvers() {
    if (!this._resolvers) {
      const resolverFiles = loadResolversFiles(
        path.resolve(__dirname, "../resolvers/**/*.js")
      );
      this._resolvers = mergeResolvers(resolverFiles);
    }

    return this._resolvers;
  }

  getDirectives() {
    if (!this._directives) {
      let directives = {};

      const directivesPaths = sync(
        path.resolve(__dirname, "../directives/**/*.js")
      );
      for (let path in directivesPaths) {
        const Directive = require(directivesPaths[path]);
        directives[Directive.name] = new Directive();
      }

      this._directives = directives;
    }

    return this._directives;
  }

  getDataSources() {
    if (!this._dataSources) {
      let dataSources = {};

      const dataSourcePaths = sync(
        path.resolve(__dirname, "../dataSources/**/*.js")
      );
      for (let path in dataSourcePaths) {
        const DataSource = require(dataSourcePaths[path]);
        dataSources[DataSource.name] = new DataSource();
      }

      this._dataSources = dataSources;
    }

    return this._dataSources;
  }

  get pubSub() {
    if (!this._pubSub) {
      this._pubSub = new PubSub();
    }

    return this._pubSub;
  }
}

module.exports = new GraphQLHelper();
