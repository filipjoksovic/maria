import {RequestModel} from "../model/request.model";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {isValidQueryParameter, mapToHeaderParameter, mapToQueryParameter, trimParameters} from "./params.utils";
import {securityConfigs} from "../model/request-security.config";
import {RequestSecurity} from "../model/request-security.enum";
import {DataState, StatefulData} from "../model/core/stateful-data.model";
import {RequestTypeEnum} from "../model/request-type.enum";
import {RequestExecutionStateEnum, RequestModelState} from "../model/state/request-model.state";

export const createHttpParams = (requestModel: RequestModel): HttpParams => {
  let httpParams = new HttpParams();
  requestModel.params!.map((params) => mapToQueryParameter(params)).map(trimParameters).filter(isValidQueryParameter).forEach((param) => {
    httpParams = httpParams.append(param.name, param.value);
  });

  return httpParams;
}

export const createHeaders = (requestModel: RequestModel): HttpHeaders => {
  let headers = new HttpHeaders();
  requestModel.headers!.map((params) => mapToHeaderParameter(params)).map(trimParameters).filter(isValidQueryParameter).forEach((param) => {
    headers = headers.set(param.name, param.value);
  });
  return headers;
}

export const generateRequestUrl = (request: RequestModel): string => {
  let url = request.url;
  Object.keys(securityConfigs).forEach((key) => {
      if (url.startsWith(securityConfigs[key as RequestSecurity].text)) {
        url = url.replace(securityConfigs[key as RequestSecurity].text, "");
      }
    }
  );
  url = securityConfigs[request.type ?? RequestSecurity.HTTPS].text + url;
  url = url.trim();
  return url;
}

export const getBlankRequest: () => StatefulData<RequestModelState> =
  () => {
    return {
      state: DataState.LOADED,
      data: {
        id: crypto.randomUUID(),
        name: "New Request",
        url: '',
        method: RequestTypeEnum.GET,
        type: RequestSecurity.HTTP,
        params: [{
          position: 1,
          name: '',
          text_value: '',
          description: '',
          select: true
        }],
        headers: [
          {
            position: 1,
            name: '',
            text_value: '',
            select: true,
            description: ''
          }
        ],
        state: RequestExecutionStateEnum.LOADED
      }
    };
  }

export const getStatelessRequest = (): RequestModelState => ({
  id: crypto.randomUUID(),
  name: "New Request",
  url: '',
  method: RequestTypeEnum.GET,
  type: RequestSecurity.HTTP,
  params: [{
    position: 1,
    name: '',
    text_value: '',
    description: '',
    select: true
  }],
  headers: [
    {
      position: 1,
      name: '',
      text_value: '',
      select: true,
      description: ''
    }
  ],
  state: RequestExecutionStateEnum.LOADED
});
