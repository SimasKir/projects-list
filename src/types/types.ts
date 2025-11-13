import { ReactNode } from "react";

export type ProjectCardResponse = {
  status: ProjectStatusEnum;
  basic_interest: number;
  pid: string;
  investment_purpose: string | null;
  max_bonus_interest: number | null;
  initial_rating: string;
  loan_ratio: LoanRatioEnum;
  loan_ratio_external: number;
  loan_ratio_max: number;
  image_url: string | null;
  project_name: string;
  invested_amount: number;
  required_amount: number;
  days_to_get_money: string;
  funded_duration: string;
  investors: number;
  credit_duration: string;
  preview_url: string;
  country?: string;
  security_measures: SecurityMeasuresEnum
}

export enum ProjectStatusEnum {
  COMING_SOON = 'coming_soon',
  OPEN_FOR_INVESTMENTS = 'open_for_investments',
  FUNDED = 'funded',
  NOT_FUNDED = 'not_funded',
  CONFIRMED = 'confirmed',
  FINISHED = 'finished',
}

export enum SecurityMeasuresEnum {
  FIRST_RANK_MORTGAGE = 'first_rank_mortgage',
  SECOND_RANK_MORTGAGE = 'second_rank_mortgage',
}

enum LoanRatioEnum {
  LTV = 'LTV',
  LTC = 'LTC',
}

export type ProjectsContextType = {
  projects: ProjectCardResponse[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectCardResponse[]>>;
  maxItems?: number;
  level: PaginationLevelType;
  setLevel: React.Dispatch<React.SetStateAction<PaginationLevelType>>;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  haveFilters: boolean;
  setHaveFilters: React.Dispatch<React.SetStateAction<boolean>>;
  sort: SortType[];
  setSort: React.Dispatch<React.SetStateAction<SortType[]>>;
  haveSort: boolean;
  setHaveSort: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ProjectsProviderProps = {
  children: ReactNode;
};

export type PaginationLevelType = 0 |1 | 2 | 3 | 4 | 5;

export type ApiMeta = {
  total?: number;
  [key: string]: any;
}

export type CountryType = "lt" | "ee" | "es" | "lv";

export type RatingType = "AAA" | "AA+" | "AA" | "AA-" | "A+" | "A" | "A-" | "BBB+" | "BBB" | "BBB-";

export type PurposeType = "real_estate_development" | "refinancing" | "working_capital" | "real_estate_acquisition" | "other";

export type FiltersType = {
  country: CountryType[];
  initial_rating: RatingType[];
  purpose: PurposeType[];
  credit_duration_min: number | null;
  credit_duration_max: number | null;
  pid: string | "";
};

export type MultiSelectKeys = 'country' | 'initial_rating' | 'purpose';

export type MultiSelectValue = CountryType | RatingType | PurposeType;

export type SortKeyType = "basic_interest" | "initial_rating" | "credit_duration" | "private_id";

export type SortDirectionType = "asc" | "desc" | "none";

export type SortType = {
  key: SortKeyType;
  dir: SortDirectionType;
}

export type CardButtonProps = {
  status: ProjectStatusEnum;
  preview_url?: string | null;
};

