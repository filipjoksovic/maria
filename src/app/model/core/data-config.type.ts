import { DropdownData } from "./dropdown-data.model";

export type ConfigurationType<T extends number | string | symbol, V extends DropdownData> = Record<T, V>