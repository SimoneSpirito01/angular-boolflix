import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
   users = [
    {
      username: 'simo',
      email: 'simo@gmail.com',
      password: 'simo2022'
    },
    {
      username: 'test',
      email: 'test@gmail.com',
      password: 'test2022'
    },
  ]

  loggedUser: Subject<string> = new Subject<string>()

  constructor() { }

  checkLoggedUser(): boolean {
    let user = localStorage.getItem('userData')
    if(!user) return false
    this.loggedUser.next(user)
    return true
  }

  checkEmail(email: string, users: User[]) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users.some(u => u.email == email));
      }, 300);
    });
  };

  checkPassword(password: string, users: User[], email: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users.find(u => u.email == email)?.password == password);
      }, 300);
    });
  };

  getUsername(email: any) {
    return this.users.find(u => u.email == email)?.username
  }



}
