const i18nCountries = require("i18n-iso-countries");
const { countries, languages } = require("countries-list");
const { DataSource } = require("apollo-datasource");

class ConfigDataSource extends DataSource {
  initialize({ context }) {
    i18nCountries.registerLocale(
      require(`i18n-iso-countries/langs/${context.lang}.json`)
    );
    this.context = context;
  }

  getLanguages() {
    return Object.keys(languages).map(code => ({ code, ...languages[code] }));
  }

  getCountries() {
    const { lang } = this.context;
    const countryNames = i18nCountries.getNames(lang);

    return Object.keys(countryNames).map(code => {
      const currentCountry = countries[code];
      return {
        code,
        name: countryNames[code],
        ...currentCountry
      };
    });
  }

  getLanguagesByCountryCode(coutryCode) {
    const country = countries[coutryCode];
    return country.languages.map(code => {
      return {
        ...languages[code],
        code
      };
    });
  }
}

module.exports = ConfigDataSource;
