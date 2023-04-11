import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { BehaviorSubject, map, of, Subject } from 'rxjs';
import { Admin, SignUp } from './models/authModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAdminEvent$: BehaviorSubject<boolean>;


  constructor(public firebaseAuth: AngularFireAuth) {
    this.isAdminEvent$ = new BehaviorSubject<boolean>(null);

  }





  isAdmin(email: string) {
    if (email === Admin.admin) {
      this.isAdminEvent$.next(true)
      localStorage.setItem('admin', '1')
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
      if (res.user.emailVerified) {
        localStorage.setItem('user', JSON.stringify(res.user))

      }
      else {
        console.error('error')
      }


    })
  };

  async logOut() {
    this.firebaseAuth.signOut();
    localStorage.clear()
  }

}
