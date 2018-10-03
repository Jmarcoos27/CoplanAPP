import { Injectable } from "@angular/core";
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItensEntradaMateriaPrimaService{

  private baseUrlService:string = '';

  constructor(private http:HttpClient,private configService: ConfigService){
    this.baseUrlService = this.configService.getUrlService() + '/itens_entrada_materiaprima/';
  }

  getItensEntradaMateriaPrimaPorEntrada(codigoEntrada:number){
    return this.http.get(this.baseUrlService + 'entrada_materiaprima/' + codigoEntrada );
  }

}
