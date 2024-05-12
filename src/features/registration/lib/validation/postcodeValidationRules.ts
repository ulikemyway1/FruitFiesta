const postcodeValidationRules = {
  Belarus: {
    short: "BY",
    validationPattern: /^\d{6}$/,
    validationErrorMessage: "Please, use correct Belarusian postcode: 6 digits",
  },
  Poland: {
    short: "PL",
    validationPattern: /^\d{2}-\d{3}$/,
    validationErrorMessage:
      "Please, use correct Polish postcode: (2 digits)-(3 digits)",
  },
  Russia: {
    short: "RU",
    validationPattern: /^\d{6}$/,
    validationErrorMessage: "Please, use correct Russian postcode: 6 digits",
  },
  Ukraine: {
    short: "UA",
    validationPattern: /^\d{5}$/,
    validationErrorMessage: "Please, use correct Ukrainian postcode: 5 digits",
  },
};

export type CountriesSet = keyof typeof postcodeValidationRules;

export function isMemberOfCountriesSet(
  country: string,
): country is CountriesSet {
  return (
    country === "Belarus" ||
    country === "Poland" ||
    country === "Russia" ||
    country === "Ukraine"
  );
}

export default postcodeValidationRules;
