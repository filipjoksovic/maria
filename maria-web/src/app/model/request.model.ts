import {RequestTypeEnum} from "./request-type.enum";
import {RequestSecurity} from "./request-security.enum";
import {QueryParameterRow} from "../../components/request-query-parameters/request-query-parameters.component";
import {RequestHeaderRow} from "../../components/request-headers/request-headers.component";

export interface RequestModel {
  id: string;
  name: string;
  url: string;
  method: RequestTypeEnum;
  type?: RequestSecurity;
  params?: QueryParameterRow[];
  headers?: RequestHeaderRow[];
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
