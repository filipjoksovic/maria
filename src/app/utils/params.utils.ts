import {QueryParameterRow} from "../../components/request-query-parameters/request-query-parameters.component";
import {QueryParametersModel} from "../model/request.model";

export const isValidParameter = (row: QueryParameterRow): boolean => {
  return row.name !== '' && row.text_value !== '' && row.description !== '';
}

export const isValidParameterForMapping = (row: QueryParameterRow): boolean => {
  return row.name !== '' && row.text_value !== '';
}

export const mapToQueryParameters = (params: QueryParameterRow[]): QueryParametersModel[] => {
  return params.filter(isValidParameterForMapping).map(row => {
    return {
      name: row.name,
      value: row.text_value
    }
  })
}

export const isValidQueryParameter = (param: QueryParametersModel): boolean => {
  return param.name !== '' && param.value !== '';
}

export const trimParameters = (param: QueryParametersModel): QueryParametersModel => {
  return {
    name: param.name.trim(),
    value: param.value.trim()
  }
}