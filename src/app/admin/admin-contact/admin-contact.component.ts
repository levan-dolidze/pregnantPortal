import { Component, OnInit } from '@angular/core';
import { GridDirective } from 'src/app/shared/components/grid/grid.directive';
import { AdminHttpService } from '../admin-http.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from 'src/app/features/contact/model';
import { GridConfig } from 'src/app/shared/components/grid-config';
import { GridActionTypes } from 'src/app/shared/components/grid/model';
import { MatDialog } from '@angular/material/dialog';
import { AdminDoctorAnswerComponent } from './admin-doctor-answer/admin-doctor-answer.component';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss']
})
export class AdminContactComponent extends GridDirective implements OnInit {


  constructor(

    http: ApiService,
    _snackBar: MatSnackBar,
    adminHttp: AdminHttpService,
    private dialog: MatDialog,



  ) {
    super(http, adminHttp, _snackBar)

  }

  ngOnInit(): void {

    this.initData()

  }

  initData() {
    this.initGet(this.adminHttp, 'getQuestions', null)
  }

  questions: Question[];
  displayedColumns: GridConfig[]


  override getData(data: any): void {
    this.questions = data

    this.displayedColumns = [
      {
        title: 'key',
        label: 'uhuhds',
        onClick: true,
        getData: this.questions.map(x => x.key),
      },
      {
        title: 'შეკითხვა',
        label: 'uhuhds',
        onClick: true,
        getData: this.questions.map(x => x.question),
      },
      {
        title: 'იმეილი',
        label: 'uhuhds',
        onClick: true,
        getData: this.questions.map(x => x.email),
      },


    ];

  }

  onAction(message: GridActionTypes) {

    const findKey = message.data.find((res: any) => {
      return res.title === 'key'

    })
    const findQ = message.data.find((res: any) => {
      return res.title === 'შეკითხვა'

    })
    const key = findKey.getData[message.index];

    switch (message.types) {
      case 'cancel':
        // this.initDelete(this.adminHttp, 'deleteStuff', key)
        break;
      case 'feedback':
        
      const dialogRef = this.dialog.open(AdminDoctorAnswerComponent, {
     
        data: { key: key,question:findQ }
      });
        break;

    }
  }
}
