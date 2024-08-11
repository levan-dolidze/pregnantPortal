import { effect, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  isUserLoggedInState = this.authService.isUserLoggedInState;

  
  constructor(private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
  }
  canActivate(): any {
    let isLoggedin =this.isUserLoggedInState()?true:false
    return isLoggedin
  }

}
