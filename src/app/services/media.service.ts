import { Router } from '@angular/router';
import { LoginService } from './login.service';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router'

@Injectable()
export class MediaService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private limit: number = 10;
  private token: string ='';

  constructor(private http: Http, private loginService: LoginService, private router: Router) {
  }

  getMedia = () => {
    return this.http.get(this.url + '/media?limit=' + this.limit)
      .map(
        res =>
          res.json()
      );
  }

  getMediaById = (id: number) => {
    return this.http.get(this.url + '/media/' + id).map (
      res => res.json()
    );
  }

  getUserById = (id : number) => {
    this.token = this.loginService.getUser().token;
    return this.http.get(this.url + '/user/' + id + '?token=' + this.token).map(
      res => res.json()
    );
  }



}
