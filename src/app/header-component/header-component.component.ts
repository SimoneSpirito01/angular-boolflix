import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponentComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {
    this.usersService.loggedUser.subscribe((l) => (this.loggedUser = l));
  }

  loggedUser?: string;

  ngOnInit(): void {}

  onItemClick(event: any) {
    localStorage.removeItem('userData');
    this.usersService.loggedUser.next('');
    this.router.navigate(['/']);
  }
}
