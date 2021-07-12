import { BaseResponse } from '../responses/BaseResponse';

export interface User {
  birthday: string;
  email: string;
  genre: string;
  id: number;
  lastname: string;
  name: string;
  password: string;
  token: string;
}

export interface LoginRs extends BaseResponse, User {}

export interface SignupRs extends BaseResponse {
  signupMessage: string;
}
