import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {RootObject} from "../interfaces/CategoriesInterfaces";
import {RootObjectInterface} from "../interfaces/ObjectsInterface";

@Injectable({
  providedIn: 'root'
})
export class AddItemsService {
   constructor(private http: HttpClient) {
  }

  createCategory(newCategory: string) {
    const data = { name: newCategory };
    return this.http.post(`${environment.server_url}/api/create/category`,  data, { headers: this.getHeader(), withCredentials: true });
  }

  createItem(eventName: string, eventValue: number, category: number) {
const data = { name: eventName, value: eventValue, category: category };
return this.http.post(`${environment.server_url}/api/create/item`,  data, { headers: this.getHeader(), withCredentials: true });
  }
  getCategoryList(): Observable<RootObject> {
    return this.http.get<RootObject>(`${environment.server_url}/api/get/categories`, {withCredentials: true });
  }



  getObjectsList(categoryId: number, weekStart: any, weekEnd: any): Observable<RootObjectInterface> {
    // Przekazuje początek i koniec tygodnia jako parametry w zapytaniu.
    return this.http.get<RootObjectInterface>(`${environment.server_url}/api/get/object/${categoryId}`, {
      params: {
        weekStart: weekStart,
        weekEnd: weekEnd
      },
      withCredentials: true
    });
  }


  private getHeader() {
    let x_xsrf_token = this.getCookie('XSRF-TOKEN');
    const headers = new HttpHeaders({
      'X-XSRF-TOKEN': x_xsrf_token,
      'Accept': 'application/json'
    });
    return headers;
  }

  getCookie(name: string): string {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }


}
