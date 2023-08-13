import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCommunicationRoutingModule } from './my-communication-routing.module';
import { MyCommunicationComponent } from './my-communication.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MyCommunicationComponent
  ],
  imports: [
    CommonModule,
    MyCommunicationRoutingModule,
    SharedModule
  ]
})
export class MyCommunicationModule { }
