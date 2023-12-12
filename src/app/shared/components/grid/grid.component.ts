import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridConfig } from '../grid-config';
import { GridActionTypes } from './model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],

})
export class GridComponent implements OnInit {


  @Input() edit: boolean = true
  @Input() cancel: boolean;
  @Input() feedback: boolean;
  @Input() showDetails: boolean;
  @Input() showAdd: boolean
  @Input() showConfirm: boolean;
  @Input() displayedColumns: GridConfig[] = [];


  @Output() emitActions: EventEmitter<GridActionTypes> = new EventEmitter<GridActionTypes>()



  pageTitle: string = 'Stuffs';

  ngOnInit(): void {


  }



  emitAction(i: number, type: 'cancel' | 'detail' | 'confirm'|'add'|'feedback', data: any) {


    const params: GridActionTypes = {
      index: i,
      types: type,
      data: data
    }
    this.emitActions.emit(params)

  }



}

