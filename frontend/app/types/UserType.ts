interface UserState {
  name: string;
  email: string;
  avatar?: {
    url: string;
    publicId: string;
  };
}

export default UserState;
