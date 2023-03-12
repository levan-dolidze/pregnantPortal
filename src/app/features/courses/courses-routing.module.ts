import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: 'კურსები' },
    children: [{
      path: '',
      component: CoursesComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
