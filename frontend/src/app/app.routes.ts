import { Routes } from '@angular/router';
import { UserListComponent } from '../components/user';

export const paths = {
  userList: '/user',
};

export const routes: Routes = [
  {
    title: 'User List',
    path: paths.userList,
    loadComponent: () => UserListComponent,
  },
];
