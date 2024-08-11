export interface CreateWalletType {
  _id?: string;
  walletName?: string;
  walletPosition?: number;
}

export interface GetWalletType {
  _id: string;
  walletName: string;
  walletPosition: number;
}
