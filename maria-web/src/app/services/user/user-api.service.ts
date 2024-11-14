import {Injectable} from '@angular/core';
import {UserModel} from "../../model/user/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private readonly http: HttpClient) {
  }

  public createUser(user: Partial<UserModel>) {
    return this.http.post<UserModel>(`http://localhost:8080/user/account`, user);
  }
}
