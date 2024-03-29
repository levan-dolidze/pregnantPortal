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
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
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
            data:{stepName:'courses'}


          },
          {
            path: 'admin-pregnancy',
            component: AdminPregnancyStuffComponent,
            canActivate: [AuthGuard],
            data:{stepName:'stuffs'}



          },
          {
            path: 'admin-home',
            component: AdminHomeComponent,
            canActivate: [AuthGuard],
            data:{stepName:'home'}



          },
          {
            path: 'admin-about',
            component: AdminAboutComponent,

            canActivate: [AuthGuard],
            data:{stepName:'about'}


          },
          {
            path: 'admin-books',
            component: AdminBookComponent,
            canActivate: [AuthGuard],
            data:{stepName:'books'}



          },
          {
            path: 'admin-free-guides',
            component: AdminFreeGuideComponent,
            canActivate: [AuthGuard],
            data:{stepName:'guide'}

          },
          {
            path: 'admin-blog',
            component: AdminBlogComponent,
            canActivate: [AuthGuard],
            data:{stepName:'blog'}

          },
        
          {
            path: 'admin-contact',
            component: AdminContactComponent,
            canActivate: [AuthGuard],
            data:{stepName:'contact'}

          },
          {
            path: 'admin-shop',
            component: AdminShopComponent,
            canActivate: [AuthGuard],
            data:{stepName:'shop'}



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
