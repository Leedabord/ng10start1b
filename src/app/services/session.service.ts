import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { Post } from './post';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  userName = "Sam";
  
  private apiURL: string = "https://jsonplaceholder.typicode.com";
     
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
    
  constructor(private httpClient: HttpClient) { }

  changeMessage(message: string) {
      this.messageSource.next(message)
  }
    
  public getPosts(): Observable<any>{
      return this.httpClient.get(this.apiURL  + '/posts/')
  }
     
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL)
  
      .pipe(
        catchError(this.errorHandler)
      )
  }
       
  create(post:Post): Observable<any>  {
  
      return this.httpClient.post(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
  
      .pipe(
        catchError(this.errorHandler)
      )
  }  
       
    find(id:number): Observable<any>  {
  
      return this.httpClient.get(this.apiURL + '/posts/' + id)
  
      .pipe(
        catchError(this.errorHandler)
      )
    }
       
    update(id:number, post:Post): Observable<any>  {
  
      return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
  
      .pipe(
        catchError(this.errorHandler)
      )
    }
       
    delete(id:number){
      return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
  
      .pipe(
        catchError(this.errorHandler)
      )
    }
      
      
    errorHandler(error:any) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
   }

   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}