import { Router, NavigationEnd } from '@angular/router';
import { FavoriteService } from './../services/favorite.service';
import { LoginService } from './../services/login.service';
import { ThumbnailPipe } from './../pipes/thumbnail.pipe';
import { MediaService } from './../services/media.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css']
})
export class MediaplayerComponent implements OnInit {
  private id: number;
  private clickedMedia: any = {};
  private favouriteList: any = [];

  private hasLiked: boolean = false;
  
  constructor(private mediaService: MediaService, private route: ActivatedRoute, private thumbnailpipe: ThumbnailPipe, private loginService: LoginService, private favoriteService: FavoriteService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });

    if (!this.loginService.logged)
      this.router.navigate(['login']);

    this.route.params.subscribe(
      (params: any) => {
        this.id = params.id; // cast to number
      }
    );

    this.mediaService.getMediaById(this.id)
      .subscribe(
      res => {
        this.clickedMedia = res;
        this.mediaService.getUserById(this.clickedMedia.user_id)
          .subscribe(
          resp => {
            this.clickedMedia.username = resp.username;
          });
        console.log(this.clickedMedia);
      });

    this.favoriteService.getFavouriteByFile(this.id)
      .subscribe(
      res => {
        this.favouriteList = res;
        console.log(this.favouriteList);
        for (let favourite of this.favouriteList) {
          if (this.loginService.getUser().user_id === favourite.user_id) {
            this.hasLiked = true;
          }
        }
      });
  }

  setlike = () => {   
    if (!this.hasLiked) {
      let param: any = {};
      param.file_id = +this.id;
      this.favoriteService.createFavorite(param)
        .subscribe(res => {
          this.hasLiked = !this.hasLiked;
        });
    } else {
      this.favoriteService.deleteFavorite(this.id)
        .subscribe(res => {
          this.hasLiked = !this.hasLiked;
        });
    }

  }

  
  

}
