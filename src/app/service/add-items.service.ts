import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {RootObject} from "../interfaces/CategoriesInterfaces";
import {RootObjectInterface} from "../interfaces/ObjectsInterface";
import {RootOptionsInterface} from "../interfaces/OptionsInterface";

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

  createItemWithDate(eventName: string, eventValue: number, category: number, date: string) {
    const data = { name: eventName, value: eventValue, category: category, date: date };
    return this.http.post(`${environment.server_url}/api/create/item/date`,  data, { headers: this.getHeader(), withCredentials: true });
  }

  getCategoryList(): Observable<RootObject> {
    return this.http.get<RootObject>(`${environment.server_url}/api/get/categories`, {withCredentials: true });
  }

  getOptions(): Observable<RootOptionsInterface> {
    return this.http.get<RootOptionsInterface>(`${environment.server_url}/api/get/options`, {withCredentials: true });
  }

  saveOptions(step: number, maxValue: number) {
     const data = { step_value: step, max_value: maxValue };
    return this.http.post(`${environment.server_url}/api/save/options`, data, { headers: this.getHeader(), withCredentials: true });
  }
  getObjectsList(categoryId: number | null, weekStart: any, weekEnd: any): Observable<RootObjectInterface> {
    // Przekazuje początek i koniec tygodnia jako parametry w zapytaniu.
    console.log(weekStart + ' ' + weekEnd + ' ' + categoryId);
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


  removeObject(objectId: number) {
    return this.http.post(`${environment.server_url}/api/remove/object/${objectId}`,  objectId, { headers: this.getHeader(), withCredentials: true });

  }
  deleteCategory(categoryId: number) {
    return this.http.post(`${environment.server_url}/api/remove/category/${categoryId}`,{} ,{ headers: this.getHeader(), withCredentials: true });
  }


  changeObjectValue(objectId: number, newValue: number) {
    const data = {
      id: objectId,
      value: newValue
      };
    return this.http.post(`${environment.server_url}/api/change/object/${objectId}`, data, { headers: this.getHeader(), withCredentials: true });
  }


}
