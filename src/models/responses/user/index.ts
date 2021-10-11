import { ShortUser, User } from '../../user';
import { BaseResponse } from '../BaseResponse';

export interface GetProfileRs extends BaseResponse {
  user: User;
}

export interface LoginRs extends BaseResponse, ShortUser {}

export interface SignupRs extends BaseResponse {
  signupMessage: string;
}
