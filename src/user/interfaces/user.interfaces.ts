import { Auth } from 'src/auth/interfaces/auth.interfaces';

export class User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  auth: Auth;
}
