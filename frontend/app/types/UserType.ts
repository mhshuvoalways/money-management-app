interface UserState {
  name: string;
  email: string;
  password?: string;
  avatar?: {
    url: string;
    publicId: string;
  };
}

export default UserState;
