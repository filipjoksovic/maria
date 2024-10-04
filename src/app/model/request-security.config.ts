import { ConfigurationType } from "./core/data-config.type";
import { DropdownData } from "./core/dropdown-data.model";
import { RequestSecurity } from "./request-security.enum";

export type RequestSecurityConfig = {
    color?: string;
} & DropdownData;

export type RequestSecurityConfiguration = ConfigurationType<RequestSecurity, RequestSecurityConfig>

export const securityConfigs: RequestSecurityConfiguration = {
    [RequestSecurity.HTTP]: {
        text: 'http://'
    },
    [RequestSecurity.HTTPS]: {
        text: 'https://'
    }
}