import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ViewDetailsShopComponent } from './view-details-shop/view-details-shop.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuyNowComponent } from './buy-now/buy-now.component';


@NgModule({
  declarations: [
    ShopComponent,
    ViewDetailsShopComponent,
    BuyNowComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule

  ]
})
export class ShopModule { }
