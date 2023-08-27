import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employees } from 'src/app/admin/admin-about/models';
import { fade, menu } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.scss'],
  animations: [fade, menu]

})
export class LendingComponent implements OnInit {

  constructor() { }

  membersArray$: Observable<Employees[]>

  ngOnInit(): void {
    this.initData()

  }

  initData() {


    const data = [

      {
        file: '../../../assets/images/doctorimg.jpg',
        name: 'თამარ',
        lastname: 'თევზაძე',
        position: 'ექიმი მეან - გინეკოლოგი',
        description: 'ჩემი გვერდი ეხება ქალთა ჯამრთელობას და შევქმენი იმისთვის რომ ჩვენმა ქალბატონებმა,გოგონებმა და მომავალმა დედებმა მიიღონ სანდო,საჭირო და საინტერესო ინფორმაცია მათი ჯამრთელობის შესახებ. მინდა გაგიზიაროთ ჩემო ცოდნა და გამოცდილება და მოგაწოდოთ თანამედროვე მტკიცებით მედიცინის მიღწევებზე დაფუძნებული ინფორმაცია,რათა დროულად მიმართოთ ექიმს და დაიცვათ თვენი და თქვენი ახლობლების ჯამრთელობა',
      }
    ]
    this.membersArray$ = of(data)
  }


  openEmployeeInfo(i: number) {

  }

}
