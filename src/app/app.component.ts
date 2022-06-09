import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UsersService } from './users.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private usersService: UsersService) {
    /* router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: any ) => {
      console.log(event.url);
      event.url !== '/' && !this.usersService.checkLoggedUser() && this.router.navigate(['/'])
      event.url === '/' && this.usersService.checkLoggedUser() && this.router.navigate(['/home'])
    }); */

 }

  title = 'boolflix';
 





}
