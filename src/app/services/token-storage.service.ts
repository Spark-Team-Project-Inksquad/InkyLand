import { Injectable } from '@angular/core';

//storage
import localForage from "localforage";


// RxJs
import { map, share, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private tokenStore: any;

  constructor() {
    this.tokenStore = localForage.createInstance({
      name: "tokenStore"
    });
  }

  getToken() {

    return new Observable((observer) => {
      this.tokenStore.getItem('token', function (err, value) {
        if (err) {
          observer.error("Could not get token");
        }

        observer.next(value);
        observer.complete();
      })
    });

  }

  setToken(token:string) {

    return new Observable((observer) => {
      this.tokenStore.setItem('token', token, function (err, value) {
        if (err) {
          observer.error("Could not set Token")
        }

        observer.next(value);
        observer.complete();
      })
    })

  }

  clearToken() {
    return new Observable((observer) => {
      this.tokenStore.setItem("token", null, function (err, value) {
        if (err) {
          observer.error("Could not complete token");
        }

        observer.next(value);
        observer.complete();
      })
    })
  }


}
