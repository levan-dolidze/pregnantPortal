import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Admin, SignUp } from './models/authModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAdminEvent$: BehaviorSubject<boolean>;


  constructor(public firebaseAuth: AngularFireAuth) {
    this.isAdminEvent$ = new BehaviorSubject<boolean>(null);

  }

  get result() {
    return this.isAdminEvent$.value
  }



  isAdmin(email: string) {
    if (email === Admin.admin) {
      this.isAdminEvent$.next(true)
      return of(true);
    } else {
      this.isAdminEvent$.next(false)
      return of(false);
    }
  }


  async signUp(params: SignUp) {
    await this.firebaseAuth.createUserWithEmailAndPassword(params.email, params.password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async signIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  };

  async logOut() {
    this.firebaseAuth.signOut();
    localStorage.clear()
  }

}
