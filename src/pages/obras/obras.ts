import { EstoquePage } from './../estoque/estoque';
import { ContaPagarPage } from './../conta-pagar/conta-pagar';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ObraModel } from './obra.model';
import { ObraService } from '../../services/obra.service';


@Component({
  selector: 'page-obras',
  templateUrl: 'obras.html',
})
export class ObrasPage {

  obras:ObraModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public obraService:ObraService,
              public modalCtrl:ModalController,
              public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content:'Aguarde...'
    });
    loading.present()
    this.obraService.getObrasPorCliente().subscribe(response => {
      loading.dismiss();
      this.obras = response;
    });
  }

  onClickContasAPagar(obra:ObraModel){
    this.navCtrl.push(ContaPagarPage,{
      id: obra.id
    });
  }
  onItensClick(obra:ObraModel){
    this.navCtrl.push(EstoquePage,{
      nome:obra.nome
    });
  }
}
