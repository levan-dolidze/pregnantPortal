import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';


@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent,
    LogInComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
   

  ]
})
export class AuthModule { }
