const destinationCities = [
  { value: "LAS", label: "Los Angeles, USA" },
  { value: "JFK", label: "New York, USA" },
  { value: "ORD", label: "Chicago, USA" },
  { value: "YEG", label: "Edmonton, Canada" },
  { value: "YYZ", label: "Toronto, Canada" },
  { value: "YVR", label: "Vancouver, Canada" },
  { value: "YXX", label: "Abbotsford, Canada" },
  { value: "CRK", label: "Angeles, Philippines" },
  { value: "AAE", label: "Annaba, Algeria" },
];

const departureCountry = [
  { value: "India", label: "India" },
  { value: "USA", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "UK", label: "UK" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
];

const IndianFlights = ["HYD", "AMD", "MAA", "DEL", "CCU", "BOM"];
const USAFlights = ["LAS", "JFK", "ORD", "SEA", "MIA", "PHX"];
const CanadaFlights = ["YYZ", "YVR", "YUL", "YEG"];
const UKFlights = ["LGW", "LHR", "MAN", "BHX"];
const SaudiFlights = ["JED", "RUH", "DMM", "MED"];

const getFlightData = (countryFrom, city) => {
  if (countryFrom === "India")
    return IndianFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
  else if (countryFrom === "USA")
    return USAFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
  else if (countryFrom === "Canada")
    return CanadaFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
  else if (countryFrom === "UK")
    return UKFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
  else if (countryFrom === "Saudi Arabia")
    return SaudiFlights.map((val) => {
      if (val !== city) {
        return { value: val + " - " + city, label: val + " - " + city };
      } else {
        return "";
      }
    });
};

const getHotelsData = (city) => {
  switch (city) {
    case "LAS":
      return [
        { value: "Freehand Los Angeles", label: "Freehand Los Angeles" },
        { value: "Bitmore Los Angeles", label: "Bitmore Los Angeles" },
        { value: "The Ritz-Carlton", label: "The Ritz-Carlton" },
      ];
    case "JFK":
      return [
        {
          value: "Hilton New York Times Square",
          label: "Hilton New York Times Square",
        },
        {
          value: "Cachet Boutique Hotel NYC",
          label: "Cachet Boutique Hotel NYC",
        },
        { value: "The Millenium Hotel", label: "The Millenium Hotel" },
      ];
    case "ORD":
      return [
        {
          value: "Chicago Lake Shore Hotel",
          label: "Chicago Lake Shore Hotel",
        },
        {
          value: "The Godfrey Hotel Chicago",
          label: "The Godfrey Hotel Chicago",
        },
        { value: "Central Loop Hotel", label: "Central Loop Hotel" },
      ];
    case "YEG":
      return [
        {
          value: "Fairmont Hotel Macdonald",
          label: "Fairmont Hotel Macdonald",
        },
        { value: "Fantasyland Hotel", label: "Fantasyland Hotel" },
        { value: "Element Edmonton West", label: "Element Edmonton West" },
      ];
    case "YYZ":
      return [
        {
          value: "Toronto Don Valley Hotel",
          label: "Toronto Don Valley Hotel",
        },
        {
          value: "The Westin Harbour Castle",
          label: "The Westin Harbour Castle",
        },
        {
          value: "Sheraton Centre Toronto Hotel",
          label: "Sheraton Centre Toronto Hotel",
        },
      ];
    case "YVR":
      return [
        { value: "Pan Pacific Vancouver", label: "Pan Pacific Vancouver" },
        {
          value: "River Rock Casino Resort",
          label: "River Rock Casino Resort",
        },
        { value: "Fairmont Waterfront", label: "Fairmont Waterfront" },
      ];
    case "YXX":
      return [
        {
          value: "Rowena's Inn on the River",
          label: "Rowena's Inn on the River",
        },
        { value: "Sasquatch Inn", label: "Sasquatch Inn" },
        {
          value: "Hampton Inn by Hilton Chilliwack",
          label: "Hampton Inn by Hilton Chilliwack",
        },
      ];
    case "CRK":
      return [
        { value: "Prime Asia Hotel", label: "Prime Asia Hotel" },
        { value: "ABC Hotel", label: "ABC Hotel" },
        { value: "Clarkton Hotel", label: "Clarkton Hotel" },
      ];
    case "AAE":
      return [
        { value: "Sheraton Annaba Hotel", label: "Sheraton Annaba Hotel" },
        { value: "Hotel EI Mountazah", label: "Hotel EI Mountazah" },
        { value: "Hotel Le Majestic", label: "Hotel Le Majestic" },
      ];
  }
};

const activities = [
  { value: "hiking", label: "Hiking" },
  { value: "surfing", label: "Surfing" },
  { value: "meals", label: "Meals" },
  { value: "camping", label: "Camping" },
  { value: "horse ride", label: "Horse Ride" },
  { value: "fishing", label: "Fishing" },
  { value: "boating", label: "Boating" },
];

export const getData = (dataType, countryFrom, cityTo) => {
  const country = countryFrom === "" ? "India" : countryFrom;
  const city = cityTo === "" ? "Los Angeles, USA" : cityTo;
  switch (dataType) {
    case "destination":
      return destinationCities;
    case "departure":
      return departureCountry;
    case "flights":
      return getFlightData(country, city);
    case "hotels":
      return getHotelsData(city);
    case "activities":
      return activities;
  }
};
