import { Component, OnInit } from '@angular/core';

import { UserPreviewComponent } from '..';
import { UserService } from '../../../api';
import { UserDto } from '../../../types';

@Component({
  selector: 'app-user-list',
  imports: [UserPreviewComponent, UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private userList: UserDto[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsersList().subscribe((response) => {
      this.userList = response;
    });
  }
}
