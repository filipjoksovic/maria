import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, filter, find, map, merge, Observable, of, Subject, Subscriber, switchMap, tap, zip} from 'rxjs';
import {RequestModel} from '../model/request.model';
import {RequestTypeEnum} from '../model/request-type.enum';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {


  private readonly _requests$: BehaviorSubject<RequestModel[]>;
  public readonly requests$: Observable<RequestModel[]>;

  private readonly _requestAdded$: Subject<RequestModel> = new Subject<RequestModel>();
  private readonly _requestDeleted$: Subject<string> = new Subject<string>();

  private readonly _activeRequest$: Subject<RequestModel> = new Subject();
  public readonly activeRequest$ = this._activeRequest$.asObservable();

  private readonly _requestSelected$: Subject<string> = new Subject();

  private readonly _requestUpdated$: Subject<{ id: string } & Partial<RequestModel>> = new Subject();

  constructor(private readonly router: Router, private readonly dataService: DataService) {
    this._requests$ = new BehaviorSubject<RequestModel[]>(this.fetchRequestsFromDataStore());
    this.requests$ = this._requests$.asObservable();

    this._requestAdded$.subscribe((requestToAdd) => {
      const currentData = this._requests$.value;
      const newData = [...currentData, requestToAdd];
      this._requests$.next(newData);
      this.dataService.store("requests", newData);
    })

    this._requestDeleted$.subscribe((requestUuid) => {
      const currentData = this._requests$.value;
      const newData = currentData.filter(request => request.id !== requestUuid);

      this._requests$.next(newData);
      this.dataService.store("requests", newData);
    })

    this._requestSelected$.pipe(
      switchMap(requestId => {
        return this.requests$.pipe(map(requests => requests.find(request => request.id === requestId)))
      }),
      filter(request => request !== null && request !== undefined),
      tap(request => this._activeRequest$.next(request))).subscribe();

    this._requestUpdated$.pipe(
      switchMap((updateData) => {
        return zip(of(updateData), this.requests$.pipe(map(requests => requests.find(request => request.id === updateData.id))))
      }),
      filter(([updateData, request]) => request !== null && request !== undefined),
      tap(([updateData, foundRequest]) => {
        const updatedRequest: RequestModel = {
          ...foundRequest,
          ...updateData
        } as RequestModel;

        const currentData = this._requests$.value;
        const newData = currentData.filter(request => request.id !== updateData.id);

        newData.push(updatedRequest);

        this._requests$.next(newData);
        console.log(newData);
        this.dataService.store("requests", newData);
      })
    ).subscribe();

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

  handleRequestDelete(requestUuid: string) {
    console.log("Deleting request", requestUuid);

    this._requestDeleted$.next(requestUuid);
  }

  setActiveRequest(id: string | null) {
    if (id == null) {
      throw new Error("id not found");
    }

    this._requestSelected$.next(id);
  }

  updateRequest(request: RequestModel, updateData: Partial<RequestModel>) {
    if (request === null) {
      return;
    }

    console.log("Request", request);
    console.log("Update", updateData);
    console.log("Updating request");
    this._requestUpdated$.next({
      ...request,
      ...updateData
    })

  }
}


