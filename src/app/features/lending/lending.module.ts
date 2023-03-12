import { NgModule } from '@angular/core';

import { LendingRoutingModule } from './lending-routing.module';
import { LendingComponent } from './lending.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';


@NgModule({
  declarations: [
    LendingComponent
  ],
  imports: [
    LendingRoutingModule,
    SharedModule,
    CustomMaterialModule,

  ]
})
export class LendingModule { }
