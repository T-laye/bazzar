export interface IUser {
  name: {
    first_name: string;
    last_name: string;
    middle_name: string;
    _id: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    default_address: boolean;
    _id: string;
  };
  email?: string;
  password?: string;
  phoneNumber?: string;
  picture?: string;
  user_id?: string;
}

export interface ISession {
  user: IUser;
  message?: string;
  accessToken: string;
  refreshToken: string;
}
