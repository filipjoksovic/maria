import { EventEmitter } from "@angular/core";
import { Observable, Subject } from "rxjs";

export interface IDataStore {
    dataStored$: Observable<string>;
    dataDeleted$: Observable<string>;
    dataCleared$: Observable<void>;

    store(key: string, data: object): void;
    delete(key: string): void;
    clear(): void;
    get(key: string): object;
}