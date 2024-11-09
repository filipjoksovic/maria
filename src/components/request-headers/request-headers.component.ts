import {Component, EventEmitter, Output} from '@angular/core';
import {ParameterTableComponent, RowChangeEvent} from "../core/parameter-table/parameter-table.component";
import {QueryParameterRow} from "../request-query-parameters/request-query-parameters.component";

@Component({
  selector: 'app-request-headers',
  standalone: true,
  imports: [
    ParameterTableComponent
  ],
  templateUrl: './request-headers.component.html',
  styleUrl: './request-headers.component.scss'
})
export class RequestHeadersComponent {
  requestHeaders = ELEMENT_DATA;
  requestHeaderLabels: { [key in keyof RequestHeaderRow]: string } = {
    select: 'Select',
    name: 'Name',
    position: 'Position',
    text_value: 'Value',
    description: 'Description'
  };


  @Output()
  public requestHeadersChanged: EventEmitter<RequestHeaderRow[]> = new EventEmitter<RequestHeaderRow[]>();


  handleOnChange({event, rowData, prop}: RowChangeEvent<RequestHeaderRow>) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      return;
    }
    rowData[prop] = value;
    if (!this.containsBlankRow(this.requestHeaders)) {
      this.requestHeaders = [...this.requestHeaders, {
        select: true,
        name: '',
        position: this.requestHeaders.length + 1,
        text_value: '',
        description: ''
      }];
    } else {
      this.requestHeaders = [...this.requestHeaders];
    }

    this.requestHeadersChanged.emit(this.requestHeaders);
  }

  public containsBlankRow(dataSource: RequestHeaderRow[]): boolean {
    return dataSource.some(row => row.name === '' && row.text_value === '' && row.description === '');
  }
}

const ELEMENT_DATA: RequestHeaderRow[] = [
  {select: true, position: 1, name: '', text_value: '', description: '',},
];

export interface RequestHeaderRow {
  select: boolean;
  position: number;
  name: string;
  text_value: string;
  description: string;
}
