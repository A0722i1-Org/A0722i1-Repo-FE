import {Role} from './Role';

export interface Account {
  accountId?: number;
  username?: string;
  encryptPassword?: string;
  email?: string;
  roles?: Role[];
  enable?: boolean;
}
