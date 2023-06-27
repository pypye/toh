import {Component, OnInit} from '@angular/core';
import {UserManagementStore} from "../../service/user-management/user-management.store";
import {of} from "rxjs";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users = this.userManagementStore.getUsers;
  loading = this.userManagementStore.getLoading;

  constructor(private userManagementStore: UserManagementStore) {
  }

  ngOnInit() {
  }

  fetchUser() {
    this.userManagementStore.fetchUsers({results: 1})
  }

  fetchMultipleUser(value: string) {
    this.userManagementStore.fetchUsers({results: Number(value)})
  }

  clearUser() {
    this.userManagementStore.clearUsers()
  }

  deleteUser(user: any) {
    this.userManagementStore.deleteUser(user)
  }
}
