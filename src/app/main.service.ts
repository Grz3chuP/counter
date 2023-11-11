import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  refreshCsrfToken(): Observable<any> {
    return this.http.get(`${environment.server_url}/sanctum/csrf-cookie`, { withCredentials: true });
  }
  checkLogin() {
    return this.http.get(`${environment.server_url}/api/user`, { withCredentials: true });
  }

  checkIfUnauthenticatedAndRedirectIfSo(error: any) {
    if (error.error.message.startsWith('Unauthenticated')) {
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `${environment.server_url}/login?intended=${returnUrl}`;
      return true;
    }
    return false;
  }
}
