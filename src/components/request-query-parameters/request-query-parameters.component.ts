import {Component, EventEmitter, Output} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ParameterTableComponent, RowChangeEvent} from "../core/parameter-table/parameter-table.component";

@Component({
  selector: 'app-request-query-parameters',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, ParameterTableComponent],
  templateUrl: './request-query-parameters.component.html',
  styleUrl: './request-query-parameters.component.scss'
})
export class RequestQueryParametersComponent {

  @Output()
  public queryParametersChanged: EventEmitter<QueryParameterRow[]> = new EventEmitter<QueryParameterRow[]>();

  queryParameters = ELEMENT_DATA;
  queryParameterLabels: { [key in keyof QueryParameterRow]: string } = {
    select: 'Select',
    position: 'Position',
    name: 'Name',
    text_value: 'Value',
    description: 'Description'
  };

  handleOnChange({event, rowData, prop}: RowChangeEvent<QueryParameterRow>) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      return;
    }
    rowData[prop] = value;
    if (!this.containsBlankRow(this.queryParameters)) {
      this.queryParameters = [...this.queryParameters, {
        select: true,
        name: '',
        position: this.queryParameters.length + 1,
        text_value: '',
        description: ''
      }];
    } else {
      this.queryParameters = [...this.queryParameters];
    }

    this.queryParametersChanged.emit(this.queryParameters);
  }

  public containsBlankRow(dataSource: QueryParameterRow[]): boolean {
    return dataSource.some(row => row.name === '' && row.text_value === '' && row.description === '');
  }
}

export interface QueryParameterRow {
  select: boolean;
  name: string;
  position: number;
  text_value: string;
  description: string;
}

const ELEMENT_DATA: QueryParameterRow[] = [
  {select: true, position: 1, name: '', text_value: '', description: ''},
];

export type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T];
