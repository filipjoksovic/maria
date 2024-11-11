import {HttpStatusCode} from "@angular/common/http";

export interface RequestResultModel {
  responseContent: string;
  requestStatus: HttpStatusCode;
  requestStatusText: string;
}
