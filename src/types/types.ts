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

enum ProjectStatusEnum {
  COMING_SOON = 'coming_soon',
  OPEN_FOR_INVESTMENTS = 'open_for_investments',
  FUNDED = 'funded',
  NOT_FUNDED = 'not_funded',
  CONFIRMED = 'confirmed',
  FINISHED = 'finished',
}

enum SecurityMeasuresEnum {
  FIRST_RANK_MORTGAGE = 'first_rank_mortgage',
  SECOND_RANK_MORTGAGE = 'second_rank_mortgage',
}

enum LoanRatioEnum {
  LTV = 'LTV',
  LTC = 'LTC',
}