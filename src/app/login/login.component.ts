import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminDetails } from '../classes/admin-details';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { Observable, Observer, of, observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  private adminDetail = new AdminDetails();


  constructor(private adminService : AdminService, private router : Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('' , [Validators.required , Validators.minLength(3) ])
  });

  Login(LoginInformation)
  {
      this.adminDetail.emailId = this.Email.value;
      this.adminDetail.password = this.Password.value;

      this.adminService.sendAdminDetails(this.adminDetail).subscribe(
        (response) => {
          
         var records = JSON.stringify(response)     
            console.log("Response ="+records);
            console.log('Response Code ='+response.body.statusCode);

             if(response.body.statusCode==201){
              console.log('Response Recived='+response.body.message);
              alert(response.body.message);
              sessionStorage.setItem('emailId', this.adminDetail.emailId);
              this.router.navigate(['/profile', response]);
              }
              else if (response.body.statusCode === 200) {
              console.log('Response Recived='+response.body.message);
              alert(response.body.message);
              this.router.navigate(['/profile', response]);
              }
             else
             {
              alert(response.body.message);
              this.router.navigate(['/login']);
             }
            error =>((error: any) => {
              console.log("Error in authentication");
              if (error.statusCode === 500) {
                  return Observable.throw(new Error(error.statusCode));
              }
              else if (error.statusCode === 400) {
                  return Observable.throw(new Error(error.statusCode));
              }
              else if (error.statusCode === 409) {
                  return Observable.throw(new Error(error.statusCode));
              }
              else if (error.statusCode === 406) {
                  return Observable.throw(new Error(error.statusCode));
              }
          });
       }
      );
  }

  get Email(){
      return this.loginForm.get('email');
  }

  get Password(){
      return this.loginForm.get('password');
  }


}

