import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { authActionModes } from 'src/app/shared/layout/models/authModel';

@Injectable({
  providedIn: 'root'
})
export class AuthBtnModesService {

  constructor(private authService:AuthService) { }


  getAuthBtnMode(container: Array<any>, token: any, admin: boolean): Observable<Array<authActionModes>> {


    if (token.emailVerified && this.authService.isAdminNew()) {
      container = []
      container.push(
        {
          text: 'logOut',
          type: 'logOut',
          icon: "update",
          permission: "user",
        },
        {
          text: 'admin',
          type: 'admin',
          icon: "edit",
          permission: "admin",
        },
        {
          text: '',
          type: 'userWorld',
          icon: "supervised_user_circle",
          isIcon:true,
          permission: "user",
        },
      )
    }

    else if (token.emailVerified && !this.authService.isAdminNew()) {
      container = []
      container.push(
        {
          text: 'logOut',
          type: 'logOut',
          icon: "update",
          permission: "user",
        },
        {
          text: '',
          type: 'userWorld',
          icon: "supervised_user_circle",
          isIcon:true,
          permission: "user",
        },
      )
      return of(container)
    }

    else if (!token.emailVerified) {
      container = []

      container.push(
        {
          text: 'logIn',
          type: 'logIn',
          icon: "update",
          permission: "user",
          
        },
        {
          text: 'signUp',
          type: 'signUp',
          icon: "update",
          permission: "user",
        },
      )
      return of(container)
    }

    return of(container).pipe(
      shareReplay()
    )
  }


  getAdminBtns(container: Array<any>, token: boolean, admin: boolean) {


    if (token && admin&&this.authService.isAdminNew()) {
      container = []
      container.push(
        {
          text: 'ordered_courses',
          type: 'courses',
          icon: "update",
          link: "/admin/admin-courses",
          permission: "user",
        },
        {
          text: 'ordered_pregnancy_stuff',
          type: 'items',
          icon: "update",
          link: "/admin/admin-pregnancy",
          permission: "user",
        },
        {
          text: 'customer_message',
          type: 'message',
          icon: "update",
          link: "/admin/admin-message",
          permission: "user",
        },
        {
          text: 'home',
          type: 'home',
          icon: "update",
          link: "/admin/admin-home",
          permission: "user",
        },
        {
          text: 'about',
          type: 'about',
          icon: "update",
          link: "/admin/admin-about",
          permission: "user",
        },
        // {
        //   text: 'book',
        //   type: 'book',
        //   icon: "update",
        //   link: "/admin/admin-books",
        //   permission: "user",
        // },
        // {
        //   text: 'free-guide',
        //   type: 'free-guide',
        //   icon: "update",
        //   link: "/admin/admin-free-guides",
        //   permission: "user",
        // },
        {
          text: 'shop',
          type: 'shop',
          icon: "update",
          link: "/admin/admin-shop",
          permission: "user",
        },
        {
          text: 'blog',
          type: 'blog',
          icon: "update",
          link: "/admin/admin-blog",
          permission: "user",
        },
        {
          text: 'contact',
          type: 'contact',
          icon: "update",
          link: "/admin/admin-contact",
          permission: "user",
        },


      )


    }
    else {
      container = []
    }
    return of(container)
  }
  getMyWorldBtns(container: Array<any>, token: any, admin: boolean) {


    if (token.emailVerified && !this.authService.isAdminNew()) {
      container = []
      container.push(
        {
          text: 'user_courses',
          type: 'userWorld',
          icon: "update",
          link: "/my-courses",
          permission: "user",
        },
        {
          text: 'user_communications',
          type: 'userWorld',
          icon: "update",
          link: "/my-communication",
          permission: "user",
        },
      )
    }
    else {
      container = []
    }
    return of(container)
  }


}
