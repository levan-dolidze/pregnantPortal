import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: 'მაღაზია' },
    children: [{
      path: '',
      component: ShopComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
