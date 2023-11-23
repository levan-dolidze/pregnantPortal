import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRootComponent } from './shared/app-root/app-root.component';

const routes: Routes = [
  {

    path: '',
    component: AppRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'lending',
        pathMatch: 'full'
      },
      { path: 'lending', loadChildren: () => import('./features/lending/lending.module').then(m => m.LendingModule) },
      { path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) },
      { path: 'courses', loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule) },
      // { path: 'book', loadChildren: () => import('./features/book/book.module').then(m => m.BookModule) },
      // { path: 'free-guides', loadChildren: () => import('./features/free-guides/free-guides.module').then(m => m.FreeGuidesModule) },
      { path: 'shop', loadChildren: () => import('./features/shop/shop.module').then(m => m.ShopModule) },
      { path: 'blog', loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule) },

      { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'my-courses', loadChildren: () => import('./features/user/my-courses.module').then(m => m.MyCoursesModule) },
      { path: 'my-communication', loadChildren: () => import('./features/user/my-communication/my-communication.module').then(m => m.MyCommunicationModule) },


    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
