export interface Account {
  accountId?: number;
  accountName: string;
  encryptPassword?: string;
  email?: string;
  verificationCode?: string;
  isEnabled?: boolean;
}
