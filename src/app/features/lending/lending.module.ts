import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LendingRoutingModule } from './lending-routing.module';
import { LendingComponent } from './lending.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LendingComponent
  ],
  imports: [
    CommonModule,
    LendingRoutingModule,
    SharedModule
  ]
})
export class LendingModule { }
