export interface DropdownData {
    text: string;
}

export type DropdownDataConfiguration<T extends string | number | symbol> = Record<T, DropdownData>;