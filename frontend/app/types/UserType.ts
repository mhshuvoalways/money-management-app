export interface GetUserType {
  _id: string;
  name: string;
  email: string;
  avatar: {
    url: string;
    publicId: string;
  };
  phone: string;
  address: string;
  plan: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface PostUserType {
  _id?: string;
  name?: string;
  email?: string;
  avatar?: {
    url: string;
    publicId: string;
  };
  password?: string;
  recaptcha?: string | null;
  phone?: string;
  address?: string;
}

export interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
