import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/admin/admin-about/models';
import { fade, menu } from 'src/app/shared/animations/animations';
import { Observable,of} from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [fade, menu]

})
export class AboutComponent implements OnInit {

  membersArray$: Observable<Employees[]>


  openEmployeeInfo(i: number) {

  }

  constructor() { }


  ngOnInit(): void {

    this.initData()
  }

  initData (){

    
    const data = [

      {
        file: '../../../assets/images/doctorimg.jpg',
        name: 'თამარ',
        lastname: 'თევზაძე',
        position: 'მეან - გინეკოლოგი'
      }
    ]
    this.membersArray$ = of(data)
  }

}
