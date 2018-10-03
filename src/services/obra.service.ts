import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { UsuarioModel } from './../pages/login/Usuario/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ObraService{

  private baseUrlService:string = '';
  cliente:UsuarioModel = new UsuarioModel();

  constructor(private http:HttpClient,private configService: ConfigService){
    this.baseUrlService = this.configService.getUrlService() + '/obra/';
  }

  getObrasPorCliente():Observable<any>{
    this.cliente = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<any>(this.baseUrlService+"cliente/"+this.cliente.nomeUsuario);
  }

}
