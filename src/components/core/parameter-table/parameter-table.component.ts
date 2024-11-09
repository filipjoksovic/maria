import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {StringKeys} from "../../request-query-parameters/request-query-parameters.component";

@Component({
  selector: 'app-parameter-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './parameter-table.component.html',
  styleUrl: './parameter-table.component.scss'
})
export class ParameterTableComponent<T extends object> implements OnInit {

  @Input({required: true})
  public dataSource!: T[];

  @Input({required: true})
  public dataSourceLabels!: { [key in keyof T]: string };

  public dataSourceKeys!: string[];

  @Output()
  public rowChanged: EventEmitter<RowChangeEvent<T>> = new EventEmitter<RowChangeEvent<T>>();

  public iterableKeys: StringKeys<T>[] = [];

  ngOnInit() {
    this.dataSourceKeys = Object.keys(this.dataSource[0])
    this.iterableKeys = Object.keys(this.dataSource[0]).filter(key => key !== 'position') as StringKeys<T>[];
  }

  public handleOnChange(event: Event, rowData: T, prop: StringKeys<T>) {
    this.rowChanged.emit({event, rowData, prop});
  }

}

export interface RowChangeEvent<T> {
  event: Event;
  rowData: T;
  prop: StringKeys<T>
}
