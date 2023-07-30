import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ShopComponent } from './shop.component';
import { ViewDetailsShopComponent } from './view-details-shop/view-details-shop.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: 'მაღაზია' },
    children: [
      {
        path: '',
        component: ShopComponent,
      },
      {
        path: 'view-details-shop/:key',
        component: ViewDetailsShopComponent
      }


    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
