import { NgModule } from '@angular/core';

import { LendingRoutingModule } from './lending-routing.module';
import { LendingComponent } from './lending.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { NgOptimizedImage } from '@angular/common';
// import { NgxEchartsModule } from 'ngx-echarts/public-api';


@NgModule({
  declarations: [
    LendingComponent
  ],
  imports: [
    LendingRoutingModule,
    SharedModule,
    CustomMaterialModule,
    NgOptimizedImage
    // NgxEchartsModule.forChild(),


  ]
})
export class LendingModule { }
