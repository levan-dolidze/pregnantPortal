import { Component } from '@angular/core';
import { CustomErrorStateMatcher } from '../shared/custom-state-matcher/custom-state-matcher';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [{ provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher }]

})
export class AdminComponent {

}
