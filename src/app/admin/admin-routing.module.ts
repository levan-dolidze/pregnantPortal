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

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: 'ადმინი' },
    children: [
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: 'admin-courses',
            component: AdminCoursesComponent,

          },
          {
            path: 'admin-pregnancy',
            component: AdminPregnancyStuffComponent,

          },
          {
            path: 'admin-home',
            component: AdminHomeComponent,

          },
          {
            path: 'admin-about',
            component: AdminAboutComponent,

          },
          {
            path: 'admin-books',
            component: AdminBookComponent,

          },
          {
            path: 'admin-free-guides',
            component: AdminFreeGuideComponent,

          },
          {
            path: 'admin-contact',
            component: AdminContactComponent,

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
