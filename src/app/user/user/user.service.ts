import {inject, Injectable} from '@angular/core';
import {IUser, User} from "./user";
import {Observable, throwError} from "rxjs";
import {CacheService} from "../../common/cache.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {transformError} from "../../common/common";


export interface IUsers {
  data: IUser[]
  total: number
}

export interface IUserService {
  getUser(id: string): Observable<IUser>
  updateUser(id: string, user: IUser): Observable<IUser>
  getUsers(pageSize: number, searchText: string, pagesToSkip: number): Observable<IUsers>
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService{

  private readonly cache = inject(CacheService)
  private readonly httpClient = inject(HttpClient)
  private readonly authService = inject(AuthService)

  constructor() { }

  getUser(id: string | null): Observable<IUser> {
    if (id === null) {
      return throwError(() => 'User id is not set')
    }

    return this.httpClient.get<IUser>(`${environment.baseUrl}/user/${id}`)
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    if (id === '') {
      return throwError(() => 'User id is not set')
    }

    // cache user data in case of errors
    this.cache.setItem('draft-user', Object.assign(user, { _id: id }))
    const updateResponse$ = this.httpClient
      .put<IUser>(`${environment.baseUrl}/user/${id}`, user)
      .pipe(map(User.Build), catchError(transformError))

    updateResponse$.subscribe({
      next: (res) => {
        this.authService.currentUser$.next(res)
        this.cache.removeItem('draft-user')
      },
      error: (err) => throwError(() => err),
    })

    return updateResponse$
  }

  getUsers(
    pageSize: number,
    searchText = '',
    pagesToSkip = 0,
    sortColumn = '',
    sortDirection: '' | 'asc' | 'desc' = 'asc'
  ): Observable<IUsers> {
    const recordsToSkip = pageSize * pagesToSkip
    if (sortColumn) {
      sortColumn = sortDirection === 'desc' ? `-${sortColumn}` : sortColumn
    }
    return this.httpClient.get<IUsers>(`${environment.baseUrl}/users`, {
      params: {
        filter: searchText,
        skip: recordsToSkip.toString(),
        limit: pageSize.toString(),
        sortKey: sortColumn,
      },
    })
  }

}
