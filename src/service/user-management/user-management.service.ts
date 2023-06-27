import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

const baseUrl = 'https://randomuser.me/api'

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) {
  }

  fetchUser() {
    return this.http.get(baseUrl)
  }

  fetchUsers(params: any) {
    return this.http.get(baseUrl, {params: params})
  }
}
