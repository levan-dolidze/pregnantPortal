import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminHttpService } from 'src/app/admin/admin-http.service';
import { FullCourse, OrderedFullCourse } from 'src/app/admin/models/shop';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {


  constructor(
    private adminService: AdminHttpService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.key = this.route.snapshot.paramMap.get('key')

  }

  key: string

  myCourses: OrderedFullCourse[];
  
  fullCourses: FullCourse[];
  keys: string[]


  ngOnInit(): void {
    this.getMyCourses();
  }




  get uid(): any {
    return this.localStorage.getTokenResult
  }

  getFullCourses(keys: string[]) {


    this.adminService.getFullCourses().subscribe({
      next: ((res) => {
        console.log(res)
        this.fullCourses = res.filter(item => keys.includes(item.parentKey));
      }),
      error: ((res) => {

      })
    })
  };


  getMyCourses() {
    this.adminService.getMyConfirmedCourses().subscribe({
      next: ((res) => {

      


        const keys = res.filter((x => x.uid === this.uid.uid)).map((x=>x.stuff.key))

        this.getFullCourses(keys)

      }),
      error: ((err) => {
        console.error(err)
      })
    })
  }
};


