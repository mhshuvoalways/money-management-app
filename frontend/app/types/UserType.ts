export interface GetUserType {
  _id: string;
  name: string;
  avatar: {
    url: string;
    publicId: string;
  };
  phone: string;
  address: string;
  plan: string;
  user: {
    _id: string;
    email: string;
    isVerified: boolean;
    createdAt: Date;
  };
}

export interface PostUserType {
  _id?: string;
  name?: string;
  avatar?: {
    url: string;
    publicId: string;
  };
  phone?: string;
  address?: string;
}
