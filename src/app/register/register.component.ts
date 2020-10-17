import { Component, OnInit,NgZone, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {RegisterApiService} from '../shared/register.api.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Student } from '../shared/student';

import {FormControl} from '@angular/forms';
import { User } from '../shared/User';
import { MustMatch } from '../_helper/must-match.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  disableSelect = new FormControl(false);
  studentForm: FormGroup;
 // owner:Student;
  errorMessage:any;
  displayError:any;
  hide = true;
  hide1=true;
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];
  user:User;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public fb: FormBuilder,private router: Router,  private studentApi: RegisterApiService,
    private ngZone: NgZone,) {}
  
  ngOnInit() {
    this.submitBookForm();
  }
  //to display the error message in UI
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  } 

  onRegister() {
    delete this.studentForm.value.repassword;
    this.user=this.studentForm.value;
    this.user._id=null;
    console.log(this.user)
    console.log("first place"+JSON.stringify(this.user));
    if (this.studentForm.valid) {
      this.studentApi.register(this.user).subscribe(
          newOwner => {
            this.user = newOwner;
            console.log("output==>"+this.user);
           if(newOwner==0){
            this.displayError="Something went wrong.Please try again later!"
            }else if(newOwner==2){
              this.displayError="Email Id already exists.Please login!"
            }else{
             this.displayError="";
               localStorage.setItem('isLoggedin', 'true');
              this.router.navigate(['/dashboard']);
             }
        //   //  this.gotoOwnersList();
          },
          error => this.errorMessage = error as any
          
       );
    }
   // owner._id = null;
    // this.studentApi.register(owner).subscribe(
    //   newOwner => {
    //     this.owner = newOwner;
    //     console.log("output==>"+this.owner);
    //     if(newOwner==0){
    //       this.displayError="Something went wrong.Please try again later!"
    //     }else{
    //       this.displayError="";
    //       localStorage.setItem('isLoggedin', 'true');
    //       this.router.navigate(['/dashboard']);
    //     }
    //   //  this.gotoOwnersList();
    //   },
    //   error => this.errorMessage = error as any
      
    // );
    console.log("output error==>"+this.errorMessage)
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  } 
  submitBookForm() {
   
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      country: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['Male'],
      maritalStatus: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.min(3)] ],
      repassword: ['', [Validators.required,Validators.min(3) ]]
    },{
      validator: MustMatch('password', 'repassword')
  })
  }
  get passwordInput() { return this.studentForm.get('password'); } 
  get repasswordInput() { return this.studentForm.get('repassword'); } 
  onLogin(){
    this.router.navigate(['/login']);
  }
 //for telephone

}


