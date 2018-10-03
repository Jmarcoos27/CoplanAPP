import { AuthService } from './../pages/login/Usuario/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ObrasPage } from '../pages/obras/obras';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;

  rootPage:any = LoginPage

  menu:Boolean = false

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private authService:AuthService
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.authService.habilitarMenu.subscribe(mostrar=>this.menu = mostrar)
    });
  }

  onClickObras(){
    this.nav.setRoot(ObrasPage)
  }
}

