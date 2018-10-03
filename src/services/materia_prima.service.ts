import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MateriaPrimaService{
  private baseUrlService:string = '';

  constructor(private http:HttpClient,private configService: ConfigService){
    this.baseUrlService = this.configService.getUrlService() + '/materia_prima/';
  }

  getMateriaPrimaPorCodigo(codigo:number):Observable<any>{
    return this.http.get<any>(this.baseUrlService+codigo);
  }
}
