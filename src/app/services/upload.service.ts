import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {
  private url: string = 'http://media.mw.metropolia.fi/wbma';
  //private user: any = JSON.parse(localStorage.getItem('user'));
  private token = '';//this.user.token;
  
  constructor(private http: Http, private loginService: LoginService, private router: Router) {
    this.token = this.loginService.getUser().token;
   }
  
  uploadMedia = (formContent: any)=> {
    console.log(this.token);
    return this.http.post(this.url + '/media?token=' + this.token, formContent)
      .map(
        res => {
          res.json();
          this.router.navigate(['front']);
        }
          
          
      );
  }
}
