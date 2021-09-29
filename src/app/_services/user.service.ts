import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const POST_API = 'http://localhost:3000/post/';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // this.token = this.tokenStorage.getUser().data.token

  constructor(private http: HttpClient) { }

  getPosts(auth_token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get(POST_API, { headers: headers });
  }

  addPosts(title: string, body: string, status: number): Observable<any> {
    return this.http.post(POST_API, {
      title,
      body,
      status
    });
  }

  getSinglePosts(auth_token:string, id:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get(POST_API + id, { headers: headers });
  }

  updatePosts(auth_token:string, id:string, title: string, body: string, status: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put(POST_API + id, { title, body, status, headers: headers });
  }

  deletePosts(auth_token:string, id:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete(POST_API + id, { headers: headers });
  }

  

  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
}
