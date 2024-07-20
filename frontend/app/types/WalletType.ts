export interface CreateWalletType {
  _id?: string;
  walletName?: string;
  balance?: number;
}

export interface GetWalletType {
  _id: string;
  walletName: string;
  balance: number;
}
