import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { ContasAPagarModel } from './contas-pagar.model';


@Injectable()
export class ContasAPagarService{
  baseUrlService: string = '';

  constructor(private http:HttpClient,private configService: ConfigService){
    this.baseUrlService = this.configService.getUrlService() + '/contas_a_pagar/';
  }

  getContasPorObra(obra:number): Observable<any>{
    return this.http.get<any>(this.baseUrlService + 'obra/' + obra);
  }
}
