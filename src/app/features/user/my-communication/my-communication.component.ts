import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorAnswer } from 'src/app/admin/admin-contact/models';
import { AdminHttpService } from 'src/app/admin/admin-http.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-my-communication',
  templateUrl: './my-communication.component.html',
  styleUrls: ['./my-communication.component.scss']
})
export class MyCommunicationComponent implements OnInit {


  constructor(
    private adminService: AdminHttpService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute
  ) {

  }

  doctorAnswers: DoctorAnswer[]
  ngOnInit(): void {
    this.getDoctorAnswers();
  }

  auth = inject(AuthService);

  user = this.auth.userData;

  get uid(): any {
    return this.localStorage.getTokenResult
  }

  getDoctorAnswers() {
    this.adminService.getDoctorAnswers().subscribe({
      next: ((res) => {
        this.doctorAnswers = res.filter((x => x.uid === this.user()?.uid))
      }),
      error: ((err) => {
        console.error(err)
      })
    })
  }

}
