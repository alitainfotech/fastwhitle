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
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  form: any = {
    title: null,
    body: null
  };
  isSuccessful = false;
  isAddPostFailed = false;

  errorMessage = '';
  post: any;
  routeSub: any;
  id: any;
  constructor(private userService: UserService, public fb: FormBuilder, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute) {
    this.post = {
      "_id": "",
      "title": "",
      "body": ""
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {

     this.userService.getSinglePosts(this.tokenStorage.getUser().data.token, params['id']).subscribe(
      data => {
        this.post = data.data.post[0];
        this.form = data.data.post[0];
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );

   });

  }
  onSubmit(): void {
      console.log(this.form);
      const { title, body } = this.form;

      this.userService.updatePosts(this.tokenStorage.getUser().data.token, this.post._id, title, body, 1).subscribe(
        data => {
          this.isSuccessful = true;
          this.isAddPostFailed = false;
          this.router.navigate(['posts']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isAddPostFailed = true;
        }
      );
    }

    redirectPage(): void{
    this.router.navigate(['posts']);
  }
}
