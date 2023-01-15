import { IUser } from '../types/IUser';

export class Users {
  private privateUsers: IUser[] = [];

  get users() {
    return this.privateUsers;
  }

  set users(users: IUser[]) {
    this.privateUsers = users;
  }
}
