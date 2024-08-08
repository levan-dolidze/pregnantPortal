import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { Admin, SignUp } from './models/authModel';
import { AlertService } from '../core/services/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { ApiService } from '../shared/services/api.service';
import { UserIsAdmin } from './sign-up/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
const users = '/users.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdminEvent$: BehaviorSubject<boolean>;

  readonly adminId = 'vjK5JImmJpVXFEDAud0wY7lVDq52';

  destroyRef = inject(DestroyRef);
  private getUserIsAdmin = signal<any>(false);
  private isUserLoggedIn = signal<any>(false);

  userState = computed(this.getUserIsAdmin);
  isUserLoggedInState = computed(this.isUserLoggedIn);
  
  private userIsAdminStateLoaded$ = this.getIsAdmin();


  constructor(
    public firebaseAuth: AngularFireAuth,
    private alert: AlertService,
    private _snackBar: MatSnackBar,
    private apiService: ApiService,
    private angularFirestore: AngularFirestore
  ) {
    this.isAdminEvent$ = new BehaviorSubject<boolean>(null);
    this.userIsAdminStateLoaded$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list: any) => {
          const user: any = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user') ?? '')
            : '';
          this.getUserIsAdmin.update(
            (x) => (x = user.emailVerified && user.uid === this.adminId)
          );
          this.isUserLoggedIn.update(
            (x) => (x = user.emailVerified)
          );
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  getIsAdmin(): Observable<UserIsAdmin[]> {
    return this.apiService.get(users).pipe(
      map((res) => {
        if (res) {
          const stuffs = [];
          for (const key in res) {
            stuffs.push({ ...res[key], key: key });
          }
          return stuffs;
        } else {
          return [];
        }
      })
    );
  }

  isAdminNew() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (
        parsedUser.emailVerified &&
        parsedUser.uid === this.adminId
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  isAdmin(email: string) {
    if (email === Admin.admin) {
      this.isAdminEvent$.next(true);
      localStorage.setItem('admin', '1');
      return of(true);
    } else {
      this.isAdminEvent$.next(false);
      return of(false);
    }
  }

  async signUp(params: SignUp) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(params.email, params.password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }



  async signIn(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user.emailVerified) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.getUserIsAdmin.update(
            (x) => (x = res.user.emailVerified && res.user.uid == this.adminId)
          );
          this.isUserLoggedIn.update(
            (x) => (x = res.user.emailVerified)
          );
        } else {
          this._snackBar.openFromComponent(AlertComponent, {
            duration: 2000,
            data: {
              message: 'ავტორიზაცია ვერ მოხდა!',
              type: 'error',
            },
          });
          console.error('error');
        }
      });
  }

  async logOut() {
    this.firebaseAuth.signOut();
    localStorage.clear();
    this.getUserIsAdmin.update((x) => (x = false));
    this.isUserLoggedIn.update((x) => (x = false));
  }
}
