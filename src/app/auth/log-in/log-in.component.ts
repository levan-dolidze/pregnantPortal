import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    @Optional() public dialogRef: MatDialogRef<LogInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { promoCodeDetails: any },
  ) { }

  ngOnInit(): void {
  }

}
