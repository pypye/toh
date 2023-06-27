import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {UserManagementService} from "./user-management.service";
import {tap} from "rxjs";
import {processData, User} from "./user-management.processor";

const INITIAL_STATE = {
  users: [],
  loading: false
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementStore extends ComponentStore<any> {
  constructor(private UserManagementService: UserManagementService) {
    super(INITIAL_STATE);
  }

  readonly getLoading = this.select(state => state.loading);

  readonly setLoading = this.updater((state, loading: boolean) => {
    return {...state, loading}
  });

  readonly getUsers = this.select(state => state.users);

  readonly setUsers = this.updater((state, users: User[]) => {
    return {...state, users}
  });


  readonly fetchUsers = this.updater((state, params: Object) => {
    this.setLoading(true);
    this.UserManagementService.fetchUsers(params).pipe(
      processData(),
      tap((res: any) => {
        this.setLoading(false);
        this.setUsers([...state.users, ...res])
      })
    ).subscribe()
    return state;
  });

  readonly clearUsers = this.updater((state) => {
    return {...state, users: []}
  });

  readonly deleteUser = this.updater((state, user: User) => {
    return {...state, users: state.users.filter((u: User) => u !== user)}
  });
}
