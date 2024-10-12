import { RequestTypeEnum } from "./request-type.enum";

export interface RequestModel {
    id:string;
    name: string;
    method: RequestTypeEnum;
    params: string[];
    headers: string[];
}