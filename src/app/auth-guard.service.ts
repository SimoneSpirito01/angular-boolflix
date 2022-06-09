import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) { }

  canActivate(): boolean {
    if(!this.usersService.checkLoggedUser()) {
      this.router.navigate(['/'])
      return false
    }
    return true
  }
}
