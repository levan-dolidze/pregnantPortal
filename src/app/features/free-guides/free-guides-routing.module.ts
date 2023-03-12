import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { FreeGuidesComponent } from './free-guides.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: 'გზამკვლევი' },
    children: [{
      path: '',
      component: FreeGuidesComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeGuidesRoutingModule { }
