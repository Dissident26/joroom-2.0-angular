import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { endpoints } from '../endpoints';
import { CommentDto, PostDto } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  constructor(private httpClient: HttpClient) {}

  getPostsList() {
    return this.httpClient.get<PostDto[]>(environment.baseUrl + endpoints.post.list);
  }

  getPostById(postId: number) {
    return this.httpClient.get<PostDto>(environment.baseUrl + endpoints.post.getById(postId));
  }

  getCommentsByPostId(postId: number) {
    return this.httpClient.get<CommentDto[]>(environment.baseUrl + endpoints.post.getCommentsByPostId(postId));
  }
}
