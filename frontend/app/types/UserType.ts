export interface GetUserType {
  _id: string;
  name: string;
  email: string;
  avatar?: {
    url: string;
    publicId: string;
  };
}

export interface PostUserType {
  name?: string;
  email?: string;
  password?: string;
  recaptcha?: string | null;
}
