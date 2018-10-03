import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { AuthService } from '../pages/login/Usuario/auth.service';
import { ConfigService } from './../services/config.service';
import { ObraService } from '../services/obra.service';
import { TabsModalPage } from './../pages/tabs-modal/tabs-modal';
import { EstoquePage } from './../pages/estoque/estoque';
import { ObrasPage } from './../pages/obras/obras';
import { ContaPagarPage} from './../pages/conta-pagar/conta-pagar';
import { ContasAPagarService } from '../pages/conta-pagar/contas-pagar.service';
import { PessoaService } from './../services/pessoa/pessoa.service';
import { MateriaPrimaService } from './../services/materia_prima.service';
import { ItensEntradaMateriaPrimaService } from './../services/itens-entrada-materiaprima.service';
import { EntradaMateriaPrimaService } from './../services/entrada_materia_prima.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ObrasPage,
    EstoquePage,
    TabsModalPage,
    ContaPagarPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ObrasPage,
    EstoquePage,
    TabsModalPage,
    ContaPagarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ConfigService,
    ObraService,
    ContasAPagarService,
    PessoaService,
    EntradaMateriaPrimaService,
    ItensEntradaMateriaPrimaService,
    MateriaPrimaService
  ]
})
export class AppModule {}
