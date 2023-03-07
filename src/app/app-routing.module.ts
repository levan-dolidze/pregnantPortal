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
      { path: 'lending', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
