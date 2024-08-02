import { GetCategoryType } from "./CategoryType";
import { GetWalletType } from "./WalletType";

export interface GetIncomeExpenseType {
  _id: string;
  category: GetCategoryType;
  wallet: GetWalletType;
  date: Date;
  amount: number;
  description: string;
}

export interface PostIncomeExpenseType {
  _id?: string;
  categoryId?: string;
  walletId?: string;
  date?: Date;
  amount?: number;
  description?: string;
}


export interface GetIncomeExpenseErrorType {
  categoryId?: string;
  walletId?: string;
  date?: string;
  amount?: number;
  description?: string;
}
