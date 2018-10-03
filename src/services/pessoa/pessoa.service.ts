import { PessoaModel } from './pessoa.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PessoaService{
  baseUrlService: string = '';

  constructor(private http:HttpClient,private configService: ConfigService){
    this.baseUrlService = this.configService.getUrlService() + '/pessoa/';
  }

  getPessoa(codigo:number):Observable<PessoaModel>{
    return this.http.get<PessoaModel>(this.baseUrlService + codigo);
  }
}
