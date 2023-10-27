import { UserAttributes } from './models/usuario';

declare namespace Express {
  interface Request {
    user?: UserAttributes | null;
  }
}
