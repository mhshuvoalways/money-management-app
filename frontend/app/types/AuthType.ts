export interface RegisterLoginType {
  name?: string;
  email?: string;
  password?: string;
  recaptcha?: string | null;
}

export interface ChangePasswordAuthType {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
