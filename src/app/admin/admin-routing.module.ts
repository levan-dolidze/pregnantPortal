import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminFreeGuideComponent } from './admin-free-guide/admin-free-guide.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPregnancyStuffComponent } from './admin-pregnancy-stuff/admin-pregnancy-stuff.component';
import { AdminComponent } from './admin.component';
import { AdminShopComponent } from './admin-shop/admin-shop.component';
import { AdminUploadedFullCoursesComponent } from './admin-uploaded-full-courses/admin-uploaded-full-courses.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: 'ადმინი' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],

        children: [
          {
            path: 'admin-courses',
            component: AdminCoursesComponent,
            canActivate: [AuthGuard],


          },
          {
            path: 'admin-pregnancy',
            component: AdminPregnancyStuffComponent,
            canActivate: [AuthGuard],


          },
          {
            path: 'admin-home',
            component: AdminHomeComponent,
            canActivate: [AuthGuard],


          },
          {
            path: 'admin-about',
            component: AdminAboutComponent,

            canActivate: [AuthGuard],

          },
          {
            path: 'admin-books',
            component: AdminBookComponent,
            canActivate: [AuthGuard],


          },
          {
            path: 'admin-free-guides',
            component: AdminFreeGuideComponent,
            canActivate: [AuthGuard],


          },
          {
            path: 'admin-contact',
            component: AdminContactComponent,
            canActivate: [AuthGuard],


          },
          {
            path: 'admin-shop',
            component: AdminShopComponent,
            canActivate: [AuthGuard],

          },
          {
            path: 'admin-shop',
            component: AdminShopComponent,
            canActivate: [AuthGuard],


          },
          {
            path: 'admin-uploaded-full-courses/:key',
            component: AdminUploadedFullCoursesComponent,
            canActivate: [AuthGuard],

          },

        ]
      }

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
