const resolvers = {
  Country: {
    nativeName: ({ native }) => native,
    languages: ({ code }, _, { dataSources: { ConfigDataSource } }) =>
      ConfigDataSource.getLanguagesByCountryCode(code)
  },
  Language: {
    nativeName: ({ native }) => native
  },
  Query: {
    languages: (_, __, { dataSources: { ConfigDataSource } }) =>
      ConfigDataSource.getLanguages(),
    countries: (_, __, { dataSources: { ConfigDataSource } }) =>
      ConfigDataSource.getCountries()
  }
};

module.exports = resolvers;
