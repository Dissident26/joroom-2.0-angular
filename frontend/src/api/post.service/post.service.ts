import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { endpoints } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private httpClient: HttpClient) { }

  getPostsList(){
    return this.httpClient.get<any>(environment.baseUrl + endpoints.post.list)
  }

  getPostById(postId: number){
    return this.httpClient.get<any>(environment.baseUrl + endpoints.post.getById(postId))
  }

  getCommentsByPostId(postId: number){
    return this.httpClient.get<any>(environment.baseUrl + endpoints.post.getCommentsByPostId(postId))
  }
}
