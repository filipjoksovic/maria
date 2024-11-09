import { RequestTypeEnum } from "./request-type.enum";

export interface RequestModel {
    id:string;
    name: string;
    url:string;
    method: RequestTypeEnum;
    params: QueryParametersModel[];
    headers: HeadersModel[];
}

export interface QueryParametersModel{
  name:string;
  value:string;
}

export interface HeadersModel{
  name:string;
  value:string;
}
