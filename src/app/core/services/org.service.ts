import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APIS } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private http: HttpClient= inject(HttpClient);
  getEmployeedata() {
    return this.http.get(APIS.TREE.EMPLOYEE)
  }

}
