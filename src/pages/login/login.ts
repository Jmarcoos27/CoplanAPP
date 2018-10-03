import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UsuarioModel } from './Usuario/usuario.model';
import { HomePage } from './../home/home';
import { AuthService } from './Usuario/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario:UsuarioModel = new UsuarioModel()

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private authService:AuthService,
              public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
  }

  logar(){
    let loading = this.loadingCtrl.create({
      content:'Aguarde...'
    });
    if(this.usuario.login != undefined  && this.usuario.senha != undefined){
      this.authService.logar(this.usuario);
      loading.present();
      this.authService.usuarioConectado.subscribe(response => {
        const res:boolean = <boolean>response
        if(res){
          loading.dismiss();
          this.navCtrl.setRoot(HomePage)
        }
        else{
          loading.dismiss();
          this.mostarAlertErroAoLogar();
        }
      })
    }
    else{
      this.mostarAlertErroAoLogar();
      loading.dismiss();
    }
  }

  mostarAlertErroAoLogar(){
    const alert = this.alertCtrl.create({
      title: 'Erro ao logar',
      subTitle:'Houve um erro ao tentar acessar o aplicativo',
      buttons: ['OK']
    });
    alert.present();
  }

}
