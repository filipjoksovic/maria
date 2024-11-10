import {RequestTypeEnum} from "./request-type.enum";
import {RequestSecurity} from "./request-security.enum";

export interface RequestModel {
  id: string;
  name: string;
  url: string;
  method: RequestTypeEnum;
  type?: RequestSecurity;
  params?: QueryParametersModel[];
  headers?: HeadersModel[];
  body?: string;
}

export interface QueryParametersModel {
  name: string;
  value: string;
}

export interface HeadersModel {
  name: string;
  value: string;
}
