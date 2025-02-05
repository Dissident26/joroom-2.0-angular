import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { endpoints } from '../endpoints';
import { PostDto, UserDto } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsersList() {
    return this.httpClient.get<UserDto[]>(environment.baseUrl + endpoints.user.list);
  }

  getUserById(userId: number) {
    return this.httpClient.get<UserDto>(environment.baseUrl + endpoints.user.getById(userId));
  }

  getPostsByUserId(userId: number) {
    return this.httpClient.get<PostDto[]>(environment.baseUrl + endpoints.user.getPostsByUserId(userId));
  }
}
