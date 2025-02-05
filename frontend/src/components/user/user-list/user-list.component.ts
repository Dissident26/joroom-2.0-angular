import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { UserService } from '../../../api';
import { UserDto } from '../../../types';

@Component({
  selector: 'app-user-list',
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  IMAGE_SIZE = 50;
  userList!: UserDto[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsersList().subscribe((response) => {
      this.userList = response;
    });
  }
}
