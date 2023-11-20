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
        file: 'assets/doctorimg.jpg',
        name: 'თამარ',
        lastname: 'თევზაძე',
        position: 'მეან - გინეკოლოგი',
        description: 'ჩემი გვერდი ეხება ქალთა ჯამრთელობას და შევქმენი იმისთვის რომ ჩვენმა ქალბატონებმა,გოგონებმა და მომავალმა დედებმა მიიღონ სანდო,საჭირო და საინტერესო ინფორმაცია მათი ჯამრთელობის შესახებ. მინდა გაგიზიაროთ ჩემო ცოდნა და გამოცდილება და მოგაწოდოთ თანამედროვე მტკიცებით მედიცინის მიღწევებზე დაფუძნებული ინფორმაცია,რათა დროულად მიმართოთ ექიმს და დაიცვათ თვენი და თქვენი ახლობლების ჯამრთელობა',

      }
    ]
    this.membersArray$ = of(data)
  }

}
