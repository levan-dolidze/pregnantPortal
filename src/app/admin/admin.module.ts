import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { SharedModule } from '../shared/shared.module';
import { AdminPregnancyStuffComponent } from './admin-pregnancy-stuff/admin-pregnancy-stuff.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { AdminFreeGuideComponent } from './admin-free-guide/admin-free-guide.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { AdminCustomerMessageComponent } from './admin-customer-message/admin-customer-message.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminCoursesComponent,
    AdminPregnancyStuffComponent,
    AdminHomeComponent,
    AdminAboutComponent,
    AdminBookComponent,
    AdminFreeGuideComponent,
    AdminContactComponent,
    AdminCustomerMessageComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,

  ]
})
export class AdminModule { }
