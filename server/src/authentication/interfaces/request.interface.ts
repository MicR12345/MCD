import { Request } from 'express';
import { UserDataDto } from '../dto/login-user-response.dto';

export interface IRequestJwt extends Request {
  user: UserDataDto;
}
