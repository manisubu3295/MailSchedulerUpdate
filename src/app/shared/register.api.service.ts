import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Student } from './student';
import { User } from './User';


@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {
  endpoint: string = 'http://localhost:8080/TestAPIProject/ws/v1';
  
  constructor(private http: HttpClient) { }
  register(data:User){
    console.log("coming inside");
    console.log(JSON.stringify(data));
    let API_URL = `${this.endpoint}/register`;
    console.log("data"+data)
    return this.http.post<any>(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }
  login(data:User){
    console.log("coming inside");
    console.log(JSON.stringify(data));
    let API_URL = `${this.endpoint}/login`;
    console.log("data"+data)
    return this.http.post<any>(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  GetStudents(){    
    console.log("calling getstudents");
    return this.http.get(`${this.endpoint}/owners`);
  }
  GetUserDetails(){
    console.log("calling getstudents");
    return this.http.get(`${this.endpoint}/getUserDetails`);
  }
  getMailStatus(mailStatus:any){
    console.log("calling fetMailststu")
    console.log(JSON.stringify(mailStatus));
    return this.http.post(`${this.endpoint}/mailDetails`,mailStatus).pipe(
      catchError(this.errorMgmt)
    );
  }
  sendmail(data:any){
    let API_URL = `${this.endpoint}/sendMail`;
    return this.http.post<any>(API_URL, data)
    .pipe(
      catchError(this.errorMgmt)
    );
  }
}
