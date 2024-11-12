import {RequestModel} from "../request.model";

export type RequestModelState = RequestModel & RequestExecutionData;

export type RequestExecutionData = {
  state: RequestExecutionStateEnum;
  timeStarted?: Date;
  timeEnded?: Date;
}

export enum RequestExecutionStateEnum {
  UNDEFINED = 'UNDEFINED',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR'
}
