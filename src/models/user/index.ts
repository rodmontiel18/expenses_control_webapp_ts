export interface ShortUser {
  email: string;
  lastname: string;
  name: string;
  token: string;
}

export interface User extends Omit<ShortUser, 'token'> {
  birthday: string;
  genre: string;
  id: number;
  password: string;
}
