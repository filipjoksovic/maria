import { RequestTypeEnum } from "./request-type.enum";

export interface RequestModel {
    id:string;
    name: string;
    url:string;
    method: RequestTypeEnum;
    params: QueryParametersModel[];
    headers: string[];
}

export interface QueryParametersModel{
  name:string;
  value:string;
}
