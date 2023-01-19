import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUpdatePrize } from '../interfaces/CreateUpdatePrize';
import { PaginatePrizes } from '../interfaces/PaginatePrizes';
import { Prize } from '../interfaces/Prizes';

@Injectable({
  providedIn: 'root'
})
export class PrizesService {

  constructor(private http: HttpClient) { }
  // gets the list of prizes from db with pagination and filters
  getPrizes(pageIndex: number = 1, pageSize: number = 5, nameFilter: string = '') {
    return this.http.get<PaginatePrizes>(environment.apiUrl +'/prizes', {withCredentials:true,
      params: new HttpParams().set('size', pageSize)
                              .set('page', pageIndex)
                              .set('name', nameFilter)
    })
  }
  // adds prizes to db
  createPrize(prize: CreateUpdatePrize) {
    return this.http.post<Prize>(environment.apiUrl +'/prizes', prize, {withCredentials: true})
  }
  // updates prize in db
  updatePrize(id: number, prize: CreateUpdatePrize) {
    return this.http.put<Prize>(environment.apiUrl+`/prizes/${id}`, prize, {withCredentials: true})
  }
  // deletes prize in db
  deletePrize(id: number) {
    return this.http.delete(environment.apiUrl+`/prizes/${id}`, {withCredentials: true})
  }
}
