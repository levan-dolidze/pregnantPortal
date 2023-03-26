import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { authActionModes } from 'src/app/shared/layout/models/authModel';

@Injectable({
  providedIn: 'root'
})
export class AuthBtnModesService {

  constructor() { }



  getAuthBtnMode(container: Array<any>, token: boolean, admin: boolean): Observable<Array<authActionModes>> {


    if (!token && admin) {
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

      )


    }

    else if (token && !admin) {
      container = []
      container.push(
        {
          text: 'logOut',
          type: 'logOut',
          icon: "update",
          permission: "user",
        },
      )
      return of(container)

    }

    else if (!token) {
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

    return of(container)
  }


  getAdminBtns(container: Array<any>, token: boolean, admin: boolean) {


    //dummy -უნდა შეიცვალოს token
    if (!token && admin) {
      container = []
      container.push(
        {
          text: 'courses',
          type: 'courses',
          icon: "update",
          link: "/admin/admin-courses",
          permission: "user",
        },
        {
          text: 'pregnancy_stuff',
          type: 'courses',
          icon: "update",
          link: "/admin/admin-pregnancy",
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
        {
          text: 'book',
          type: 'book',
          icon: "update",
          link: "/admin/admin-books",
          permission: "user",
        },
        {
          text: 'free-guide',
          type: 'free-guide',
          icon: "update",
          link: "/admin/admin-free-guides",
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


}
