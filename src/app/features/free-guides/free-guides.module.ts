import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeGuidesRoutingModule } from './free-guides-routing.module';
import { FreeGuidesComponent } from './free-guides.component';


@NgModule({
  declarations: [
    FreeGuidesComponent
  ],
  imports: [
    CommonModule,
    FreeGuidesRoutingModule
  ]
})
export class FreeGuidesModule { }
