const { ApolloServer } = require("apollo-server");
const { InMemoryLRUCache } = require("apollo-server-caching");
const responseCachePlugin = require("apollo-server-plugin-response-cache");

const GraphQLHelper = require("./helpers/graphql");

const cache = new InMemoryLRUCache({
  maxSize: 100 * 1024 * 1024 // cache size will be 100 MB
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: await GraphQLHelper.getTypeDefs(),
    resolvers: await GraphQLHelper.getResolvers(),
    schemaDirectives: GraphQLHelper.getDirectives(),
    dataSources: () => GraphQLHelper.getDataSources(),
    context: ({ req }) => {
      const {
        ["content-language"]: lang = "en",
        ["content-region"]: region = "EN"
      } = req.headers;

      return {
        lang,
        region: region.toLocaleUpperCase()
      };
    },
    plugins: [responseCachePlugin()],
    cacheControl: {
      defaultMaxAge: 5
    },
    cache,
    persistdQueries: {
      cache
    }
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer();
