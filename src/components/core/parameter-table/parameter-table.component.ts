import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {StringKeys} from "../../request-query-parameters/request-query-parameters.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";

export type PositionableObject = { position: number } & object;

@Component({
  selector: 'app-parameter-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './parameter-table.component.html',
  styleUrl: './parameter-table.component.scss'
})
export class ParameterTableComponent<T extends PositionableObject> implements OnInit {

  selection = new SelectionModel<T>(true, []);

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
    this.iterableKeys = Object.keys(this.dataSource[0]).filter(key => key !== 'position' && key !== 'select') as StringKeys<T>[];
  }

  public handleOnChange(event: Event, rowData: T, prop: StringKeys<T>) {
    this.rowChanged.emit({event, rowData, prop});
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}

export interface RowChangeEvent<T> {
  event: Event;
  rowData: T;
  prop: StringKeys<T>
}
