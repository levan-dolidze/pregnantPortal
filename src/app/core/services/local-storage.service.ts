import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Stuffs } from 'src/app/admin/models/shop';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public isTokenEvent$: BehaviorSubject<boolean>;


  constructor() {

    this.isTokenEvent$ = new BehaviorSubject<boolean>(null);

  }


  get getTokenResult() {
    return this.isTokenEvent$.value
  }
  getToken() {
    let authInfo = localStorage.getItem('user');
    if (authInfo) {
      let tokenJson = JSON.parse(authInfo);
      if (tokenJson.emailVerified) {
        this.isTokenEvent$.next(tokenJson)
        return of(tokenJson)
      }
      this.isTokenEvent$.next(false)
      return of(false)
    }
    this.isTokenEvent$.next(false)
    return of(false)
  }

  getAdmin() {
    const admin = localStorage.getItem('admin')
    if (admin) {
      return of(admin)
    }
    else {
      return of(false)
    }

  }

  getStuffsDetails(key: string):Observable<Stuffs> {

    const allStufs = localStorage.getItem('stuff');
    if (allStufs) {
      const stuffs: Stuffs[] = JSON.parse(allStufs)
      return of(stuffs.find(x => x.key === key)) 
    }
    return null



  }
}
