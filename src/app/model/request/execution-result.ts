import {HttpHeaders, HttpStatusCode} from "@angular/common/http";

export interface ExecutionResults {
  requestId: string;
  code: HttpStatusCode;
  status: string;
  body: any;
  headers: object;
}
