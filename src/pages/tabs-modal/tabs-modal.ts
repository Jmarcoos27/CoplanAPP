import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EstoquePage } from './../estoque/estoque';
import { ContaPagarPage } from './../conta-pagar/conta-pagar'

/**
 * Generated class for the TabsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs-modal',
  templateUrl: 'tabs-modal.html',
})
export class TabsModalPage {

  estoque = EstoquePage;
  contaPagar = ContaPagarPage;

  params:{
    id:'13'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
