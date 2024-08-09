import { GetCategoryType } from "@/app/types/CategoryType";

export interface TranBreakDown {
  category: GetCategoryType;
  amount: number;
  percentage: string;
}
