import { CountryType, FiltersType, PurposeType, RatingType, SortKeyType, SortType } from "@/types/types";

//filters default values
export const DEFAULT_FILTERS: FiltersType = {
  country: [],
  initial_rating: [],
  purpose: [],
  credit_duration_min: null,
  credit_duration_max: null,
  pid: "",
};

//sort default values
export const DEFAULT_SORT: SortType[] = [
  { key: "basic_interest", dir: "none" },
  { key: "initial_rating", dir: "none" },
  { key: "credit_duration", dir: "none" },
];

//sort labels
export const OPTIONS: { key: SortKeyType; label: string }[] = [
  { key: "basic_interest", label: "Palūkanos" },
  { key: "initial_rating", label: "Pradinis reitingas" },
  { key: "credit_duration", label: "Kredito trukmė" },
];

//possible countries values
export const COUNTRIES: CountryType[] = ["lt", "ee", "es", "lv"];

//possible ratings values
export const RATINGS: RatingType[] = [
  "AAA",
  "AA+",
  "AA",
  "AA-",
  "A+",
  "A",
  "A-",
  "BBB+",
  "BBB",
  "BBB-",
];

//possible purposes values
export const PURPOSES: PurposeType[] = [
  "real_estate_development",
  "refinancing",
  "working_capital",
  "real_estate_acquisition",
  "other",
];