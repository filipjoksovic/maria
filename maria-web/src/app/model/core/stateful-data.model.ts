export enum DataState {
  UNDEFINED='UNDEFINED',
  LOADING='LOADING',
  LOADED='LOADED',
  ERROR='ERROR'
}

export type UndefinedDataState = {
  state:DataState.UNDEFINED;
  data:never;
}

export type LoadingDataState = {
  state:DataState.LOADING;
  data:never;
}

export type LoadedDataState<T> = {
  state:DataState.LOADED;
  data:T;
}

export type ErrorDataState = {
  state:DataState.ERROR;
  data:never;
  error:object;
}

export type StatefulData<T> = UndefinedDataState | LoadingDataState | LoadedDataState<T> | ErrorDataState;

