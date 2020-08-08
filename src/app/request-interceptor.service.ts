import { Injectable } from '@angular/core';
import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import {Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
  constructor(public auth: ApiService,private router:Router) { }
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

      var idToken = localStorage.getItem("token"); 
      //idToken  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsIm5hbWUiOiJKaWpvIEpvc2VwaCIsImVtYWlsIjoiamlqb2dqQGdtYWlsLmNvbSIsInBob25lIjoiOTY1NjUyMjI0MyIsImF2YXRhcl9pbWFnZSI6bnVsbCwiaW1hZ2VCYXNlIjoiaHR0cDovLzE3Mi4xMDUuMzMuMjI2L2FtYWNvL2NvbW1vbi91cGxvYWRzL3VzZXItaW1hZ2VzLyIsImlzX2N1c3RvbWVyIjp0cnVlLCJpc19waG9uZV92ZXJpZmllZCI6MCwiaWF0IjoxNTk2NzI5OTA4fQ.Jy5Wh-Gc7IkzhMQNq3jUYYscz8aApJbmJGhOCBhX7us";
      if (idToken) {
           req = req.clone({
              headers: req.headers.set("Authorization",
                  "Bearer " + idToken)
          }); 
//
          
          return next.handle(req).pipe(catchError(err => {
            if (err.status === 401) { 
              localStorage.clear();
              this.reloadCurrentRoute()           
            }  
             const error = err;
              return throwError(error);            
        }));
      }
      else {
          return next.handle(req);
      }
  }
}


 
