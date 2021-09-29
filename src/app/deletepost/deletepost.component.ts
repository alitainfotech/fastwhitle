import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-deletepost',
  templateUrl: './deletepost.component.html',
  styleUrls: ['./deletepost.component.css']
})
export class DeletepostComponent implements OnInit {

  errorMessage = '';
  routeSub: any;
  id: any;
  constructor(private userService: UserService, public fb: FormBuilder, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('here');
    this.routeSub = this.route.params.subscribe(params => {

     this.userService.deletePosts(this.tokenStorage.getUser().data.token, params['id']).subscribe(
      data => {
        this.router.navigate(['posts']);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );

   });

  }



}
