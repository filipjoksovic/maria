import { EventEmitter, Injectable } from '@angular/core';
import { IDataStore } from '../model/core/data-store.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements IDataStore {

  private dataStore: Storage = localStorage;

  private _dataStored$: Subject<string> = new Subject();
  private _dataCleared$: Subject<void> = new Subject();
  private _dataDeleted$: Subject<string> = new Subject();

  public dataStored$: Observable<string> = this._dataStored$.asObservable();
  public dataCleared$: Observable<void> = this._dataCleared$.asObservable();
  public dataDeleted$: Observable<string> = this._dataDeleted$.asObservable();

  constructor() { }

  store(key: string, data: object): void {
    this.dataStore.setItem(key, JSON.stringify(data));
    this._dataStored$.next(key);
  }

  clear(): void {
    this.dataStore.clear();
    this._dataCleared$.next();
  }

  delete(key: string): void {
    this.dataStore.removeItem(key);
    this._dataDeleted$.next(key);
  }

  get(key: string): object {
    return JSON.parse(this.dataStore.getItem(key) ?? "{}");
  }

  getArray(key: string): object[] {
    return JSON.parse(this.dataStore.getItem(key) ?? "[]");
  }

}
