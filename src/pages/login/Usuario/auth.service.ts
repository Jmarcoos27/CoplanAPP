import { ConfigService } from '../../../services/config.service';
import { Injectable,EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from './usuario.model';


@Injectable()
export class AuthService{
  habilitarMenu = new EventEmitter<Boolean>()
  usuarioConectado = new EventEmitter<Boolean>()
  private baseUrlService:string = '';

  constructor(private http:HttpClient,private configService: ConfigService){
    this.baseUrlService = this.configService.getUrlService() + '/usuario/';
  }

  logar(usuario:UsuarioModel){
    this.getUsuarioAppPorLoginESenha(usuario).subscribe(response=>{
      let user:UsuarioModel = <UsuarioModel>response
      if(user.nomeUsuario != null){
        this.habilitarMenu.emit(true);
        this.usuarioConectado.emit(true);
        localStorage.setItem('currentUser',JSON.stringify(user));
      }
      else this.usuarioConectado.emit(false);
    });
  }

  getUsuarioAppPorLoginESenha(usuario:UsuarioModel){
    return this.http.get(this.baseUrlService+usuario.login+"/"+usuario.senha)
  }

  logOut(){
    this.usuarioConectado.emit(false);
    localStorage.removeItem('currentUser');
  }
}
