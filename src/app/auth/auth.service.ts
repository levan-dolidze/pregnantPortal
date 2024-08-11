import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';
import { SignUp } from './models/authModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { ApiService } from '../shared/services/api.service';
import { UserIsAdmin } from './sign-up/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
const users = '/users.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly adminId = 'vjK5JImmJpVXFEDAud0wY7lVDq52'; //dummy

  destroyRef = inject(DestroyRef);
  private getUserIsAdmin = signal<any>(false);
  private isUserLoggedIn = signal<any>(false);

  userState = computed(this.getUserIsAdmin);
  isUserLoggedInState = computed(this.isUserLoggedIn);

  private userIsAdminStateLoaded$ = this.getIsAdmin();

  constructor(
    public firebaseAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
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
          this.isUserLoggedIn.update((x) => (x = user.emailVerified));
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

 private getIsAdmin(): Observable<UserIsAdmin[]> {
    return this.apiService.get(users).pipe(
      map((res) => {
        if (res) {
          const admin = [];
          for (const key in res) {
            admin.push({ ...res[key], key: key });
          }
          return admin;
        } else {
          return [];
        }
      })
    );
  };

  async signUp(params: SignUp) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(params.email, params.password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  async signIn(email: string, password: string) {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user.emailVerified) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.getUserIsAdmin.update(
            (x) => (x = res.user.emailVerified && res.user.uid == this.adminId)
          );
          this.isUserLoggedIn.update((x) => (x = res.user.emailVerified));
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
    catch {
      this._snackBar.openFromComponent(AlertComponent, {
        duration: 2000,
        data: {
          message: 'ავტორიზაცია ვერ მოხდა!',
          type: 'error',
        },
      });
    }
  }

  async logOut() {
    this.firebaseAuth.signOut();
    localStorage.clear();
    this.getUserIsAdmin.update((x) => (x = false));
    this.isUserLoggedIn.update((x) => (x = false));
  }
}
