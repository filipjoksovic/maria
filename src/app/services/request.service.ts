import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { RequestModel } from '../model/request.model';
import { RequestTypeEnum } from '../model/request-type.enum';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly _requests$: BehaviorSubject<RequestModel[]>;
  public readonly requests$: Observable<RequestModel[]>;

  private readonly _requestAdded$: Subject<RequestModel> = new Subject<RequestModel>();

  constructor(private readonly router: Router, private readonly dataService: DataService) {
    this._requests$ = new BehaviorSubject<RequestModel[]>(this.fetchRequestsFromDataStore());
    this.requests$ = this._requests$.asObservable();

    this._requestAdded$.subscribe((requestToAdd) => {
      const currentData = this._requests$.value;
      const newData = [...currentData, requestToAdd];
      this._requests$.next(newData);
      this.dataService.store("requests", newData);
    })

  }


  private fetchRequestsFromDataStore(): RequestModel[] {
    console.log(this.dataService);
    const requests: object[] = this.dataService.getArray("requests");
    return requests as RequestModel[];
  }

  private createNewRequest() {
    const request: RequestModel = {
      id: crypto.randomUUID(),
      name: "New Request",
      method: RequestTypeEnum.GET,
      params: [],
      headers: []
    }
    this._requestAdded$.next(request);

  }

  handleNewRequest() {
    this.createNewRequest();
    this.router.navigate(['/new'])
  }
}


