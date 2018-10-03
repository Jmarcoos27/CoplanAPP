import { Observable } from 'rxjs';
import { EntradaMateriaPrimaModel } from './../models/entrada-materia-prima.model';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()
export class EntradaMateriaPrimaService{
  private baseUrlService:string = '';

  constructor(private http:HttpClient,private configService: ConfigService){
    this.baseUrlService = this.configService.getUrlService() + '/entrada_materiaprima/';
  }

  getEntradaMateriaPrimaPorObra(nomeObra:string):Observable<any>{
    return this.http.get<any>(this.baseUrlService + 'obra/' + nomeObra)
  }
}
