import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCommunicationComponent } from './my-communication.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { pageName: 'ჩემი კომუნიკაცია' },

    children:[
      {
        path: '',
        component: MyCommunicationComponent,
      }
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCommunicationRoutingModule { }
