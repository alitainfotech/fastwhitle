import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormBuilder } from "@angular/forms";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  form: any = {
    title: null,
    body: null
  };
  isSuccessful = false;
  isAddPostFailed = false;
  errorMessage = '';

  constructor(private userService: UserService, public fb: FormBuilder, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { title, body } = this.form;

    this.userService.addPosts(title, body, 1).subscribe(
      data => {
        // this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveUser(data);

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
