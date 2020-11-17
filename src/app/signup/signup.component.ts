import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpDetails } from '../classes/signup-details';
import { SignupService } from '../services/signup.service';
import { Observable, Observer, of, observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private signupDetails = new SignUpDetails();

  constructor(private signupService : SignupService, private router : Router) { }

  ngOnInit() {
  }

  signupForm = new FormGroup({
    customerName: new FormControl('' , Validators.required),
    companyName: new FormControl('' , Validators.required),
    email: new FormControl('', Validators.required),
    contactNumber : new FormControl('' , Validators.required),
    address : new FormControl('' , Validators.required),
  });

SignUp(SignUpInformation)
  {
      this.signupDetails.customerName = this.CoustumerName.value;
      this.signupDetails.companyName = this.CompanyName.value;
      this.signupDetails.email = this.Email.value;
      this.signupDetails.contactNumber = this.ContactNumber.value;
      this.signupDetails.address = this.Address.value;

      this.signupService.sendSignUpDetails(this.signupDetails).subscribe(
        response => {
          console.log("Response ="+response);
            console.log('Response Code ='+response.body.statusCode);

             if(response.body.statusCode==201){
              console.log('Response Recived='+response.body.message);
              alert(response.body.message);
              this.router.navigate(['/clients', response]);
              }
              else if (response.body.statusCode === 200) {
              console.log('Response Recived='+response.body.message);
              alert(response.body.message);
              this.router.navigate(['/profile', response]);
              }
             else
             {
              alert(response.body.message);
              alert("Invalid combination of Email and password");
              this.router.navigate(['/login']);
             }
         error =>((error: any) => {
           console.log("Error in authentication");
           if (error.status === 500) {
               return Observable.throw(new Error(error.status));
           }
           else if (error.status === 400) {
               return Observable.throw(new Error(error.status));
           }
           else if (error.status === 409) {
               return Observable.throw(new Error(error.status));
           }
           else if (error.status === 406) {
               return Observable.throw(new Error(error.status));
              }
            });
          }
        );
    }

  get Email(){
    return this.signupForm.get('email');
  }
  
  get CoustumerName(){
    return this.signupForm.get('customerName');
  }
  
  get CompanyName(){
    return this.signupForm.get('companyName');
  }

  get ContactNumber(){
    return this.signupForm.get('contactNumber');
  }

  get Address(){
    return this.signupForm.get('address');
  }
}