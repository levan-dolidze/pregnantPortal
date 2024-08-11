import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);

  const isUserAdmin = authService.userState;

  let isAdmin = isUserAdmin() ? true : false;

  return isAdmin
};
