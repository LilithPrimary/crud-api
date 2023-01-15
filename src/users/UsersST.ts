import { Users } from './Users';

export class UsersST {
  private static instance: Users;

  public static getInstance(): Users {
    if (!UsersST.instance) {
      UsersST.instance = new Users();
    }
    return UsersST.instance;
  }
}
