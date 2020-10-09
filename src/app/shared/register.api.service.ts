import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Student } from './student';


@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {
  endpoint: string = 'http://localhost:8080/TestAPIProject/ws/v1';
  
  constructor(private http: HttpClient) { }
  register(data:Student){
    let API_URL = `${this.endpoint}/register`;
    console.log(data)
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
    console.log("calling getstudents")
    return this.http.get(`${this.endpoint}/owners`);
  }
  sendmail(data:any){
    let API_URL = `${this.endpoint}/sendMail`;
    return this.http.post<any>(API_URL, data)
    .pipe(
      catchError(this.errorMgmt)
    );
  }
}
