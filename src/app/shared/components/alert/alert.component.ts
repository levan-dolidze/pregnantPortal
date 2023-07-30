import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

  message: string
  ngOnInit() {
    this.message = this.data.message
  }

  alertMode() {

    if (this.data.type === 'error') {
      return 'error'
    }
   
    else {
      return 'success'
    }

  }

}
