import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { BehaviorSubject, map, of, Subject } from 'rxjs';
import { Admin, SignUp } from './models/authModel';
import { AlertService } from '../core/services/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../shared/components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAdminEvent$: BehaviorSubject<boolean>;


  constructor(public firebaseAuth: AngularFireAuth,
    private alert: AlertService,
    private _snackBar: MatSnackBar,


  ) {
    this.isAdminEvent$ = new BehaviorSubject<boolean>(null);


  }




  isAdminNew() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.emailVerified && parsedUser.uid === 'osQEYxPug4ZekILcy7XnIYZc1VD2') {
        return true
      }
      return false
    }
    return false
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

        this._snackBar.openFromComponent(AlertComponent, {
          duration: 2000,
          data: {
            message: 'ავტორიზაცია ვერ მოხდა!',
            type: 'error'
          }
        })

        console.error('error')


      }


    })
  };

  async logOut() {
    this.firebaseAuth.signOut();
    localStorage.clear()
  }

}
