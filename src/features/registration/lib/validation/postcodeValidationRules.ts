const postcodeValidationRules: CountriesSetValidationRules = {
  Belarus: {
    short: "BY",
    validationPattern: /^\d{6}$/,
    validationErrorMessage: "Please, use correct Belarusian postcode: 6 digits",
    cityInputPlaceholder: "Minsk",
    streetInputPlaceholder: "Lenina street",
    postCodeInputPlaceholder: "220108",
  },
  Poland: {
    short: "PL",
    validationPattern: /^\d{2}-\d{3}$/,
    validationErrorMessage:
      "Please, use correct Polish postcode: (2 digits)-(3 digits)",
    cityInputPlaceholder: "Warsaw",
    streetInputPlaceholder: "Marszalkowska street",
    postCodeInputPlaceholder: "00-007",
  },
  Russia: {
    short: "RU",
    validationPattern: /^\d{6}$/,
    validationErrorMessage: "Please, use correct Russian postcode: 6 digits",
    cityInputPlaceholder: "Saint Petersburg",
    streetInputPlaceholder: "Malaya Sadovaya street",
    postCodeInputPlaceholder: "103406",
  },
  Ukraine: {
    short: "UA",
    validationPattern: /^\d{5}$/,
    validationErrorMessage: "Please, use correct Ukrainian postcode: 5 digits",
    cityInputPlaceholder: "Kiev",
    streetInputPlaceholder: "Volodymyrska Street",
    postCodeInputPlaceholder: "65321",
  },
};

export type CountriesSet = keyof typeof postcodeValidationRules;

export function isMemberOfCountriesSet(
  country: string | number,
): country is CountriesSet {
  return (
    country === "Belarus" ||
    country === "Poland" ||
    country === "Russia" ||
    country === "Ukraine"
  );
}
type SetForCountry = {
  short: string;
  validationPattern: RegExp;
  validationErrorMessage: string;
  postCodeInputPlaceholder: string;
  cityInputPlaceholder: string;
  streetInputPlaceholder: string;
};

type CountriesSetValidationRules = {
  [key: string]: SetForCountry;
};

export default postcodeValidationRules;
