export interface CreateWalletType {
  _id?: string;
  walletName?: string;
  balance?: number;
  walletPosition?: number;
}

export interface GetWalletType {
  _id: string;
  walletName: string;
  balance: number;
  walletPosition: number;
  createdAt?: Date;
}
