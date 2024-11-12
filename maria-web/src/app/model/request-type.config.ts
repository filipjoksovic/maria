import { ConfigurationType } from "./core/data-config.type";
import { DropdownData } from "./core/dropdown-data.model";
import { RequestTypeEnum } from "./request-type.enum";

export type RequestTypeConfig = {
    color: string;
} & DropdownData;

export type RequestConfiguration = ConfigurationType<RequestTypeEnum, RequestTypeConfig>;

export const typeConfigs: RequestConfiguration = {
    [RequestTypeEnum.GET]: {
        color: 'green',
        text: "GET"
    },
    [RequestTypeEnum.POST]: {
        color: 'orange',
        text: "POST",
    },
    [RequestTypeEnum.PUT]: {
        color: 'orange',
        text: "PUT"
    },
    [RequestTypeEnum.DELETE]: {
        color: 'red',
        text: "DELETE"
    }
}