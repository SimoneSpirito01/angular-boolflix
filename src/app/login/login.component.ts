import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';


const usersService = new UsersService()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { 
  }

  @ViewChild('myForm') form: any

  buttonOptions: any = {
    text: 'Login',
    type: 'success',
    useSubmitBehavior: true,
  };

  ngOnInit(): void {
  }

  emailValidation(params: any) {
    return usersService.checkEmail(params.value, usersService.users);
  }

  passwordValidation(params: any) {
    let form: any = document.getElementById('my_form')
    const formData = new FormData(form)
    return usersService.checkPassword(params.value, usersService.users, formData.get('Email'));
  }

  onFormSubmit(data: any) {
    data.preventDefault()
    const formData = new FormData(this.form.nativeElement)
    localStorage.setItem('userData', usersService.getUsername(formData.get('Email')) || '')
    this.router.navigate(['/home'])
  }

}
