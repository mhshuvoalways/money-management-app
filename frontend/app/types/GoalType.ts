export interface SingleContribution {
  contribution: string;
  date: Date;
}

export interface CreateGoalType {
  _id?: string;
  goalName?: string;
  targetAmount?: number;
  saved?: number;
  contribution?: string;
  contributionType?: string;
}

export interface GetGoalsType {
  _id: string;
  goalName: string;
  targetAmount: number;
  saved: number;
  contributions: SingleContribution[];
  contributionType: string;
}
