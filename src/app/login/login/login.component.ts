import { Component, OnInit,NgZone} from '@angular/core';
import { Router } from '@angular/router';
import {RegisterApiService} from '../../shared/register.api.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Student } from '../../shared/student';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  studentForm: FormGroup;
  owner:Student;
  errorMessage:any;
  displayError:any;
  constructor(private router: Router,  private studentApi: RegisterApiService,
    private ngZone: NgZone,) {}
  
  ngOnInit() {}
  // onLogin(owner:any) {
  //   console.log(JSON.stringify(owner));
  //   if (this.studentForm.valid) {
  //     this.studentApi.AddStudent(this.studentForm.value).subscribe(res => {
  //       this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
  //     });
  //   }
  //   localStorage.setItem('isLoggedin', 'true');
    
  // }
  onLogin(owner: Student) {
    owner._id = null;
    this.studentApi.register(owner).subscribe(
      newOwner => {
        this.owner = newOwner;
        console.log("output==>"+this.owner);
        if(newOwner==0){
          this.displayError="Something went wrong.Please try again later!"
        }else{
          this.displayError="";
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigate(['/dashboard']);
        }
      //  this.gotoOwnersList();
      },
      error => this.errorMessage = error as any
      
    );
    console.log("output error==>"+this.errorMessage)
  }
}
