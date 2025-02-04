import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { endpoints } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  getTagsList(){
    return this.httpClient.get<any>(environment.baseUrl + endpoints.tag.list)
  }

  getTagById(tagId: number){
    return this.httpClient.get<any>(environment.baseUrl + endpoints.tag.getById(tagId))

  }

  getPostsByTagId(tagId: number){
    return this.httpClient.get<any>(environment.baseUrl + endpoints.tag.getPostsByTagId(tagId))
  }
}
