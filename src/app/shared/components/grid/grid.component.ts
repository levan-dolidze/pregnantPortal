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
  @Input() showDetails: boolean
  @Input() displayedColumns: GridConfig[] = [];


  @Output() emitActions: EventEmitter<GridActionTypes> = new EventEmitter<GridActionTypes>()



  pageTitle: string = 'Stuffs';

  ngOnInit(): void {

  }



  emitAction(i: number, type: 'cancel' | 'detail',data:any) {

    console.log(data)

    const params: GridActionTypes = {
      index: i,
      types: type,
      data:data
    }
    this.emitActions.emit(params)

  }

 

}

