import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  errorMessage = '';
  posts: any;
  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getPosts(this.tokenStorage.getUser().data.token).subscribe(
      data => {
        const myArray = Object.entries(data.data);
    
        this.posts = myArray[0][1];

        // console.log(mapped);

        // console.log('res', resultArray);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

}
