import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { fade, menu } from 'src/app/shared/animations/animations';
import { Employees } from './models';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.scss'],
  animations:[fade,menu]
})
export class AdminAboutComponent {

 
}
