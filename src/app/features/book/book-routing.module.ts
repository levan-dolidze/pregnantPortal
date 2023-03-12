import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { BookComponent } from './book.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: 'წიგნები' },
    children: [{
      path: '',
      component: BookComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
