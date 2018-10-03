import { PessoaModel } from './../../services/pessoa/pessoa.model';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { PessoaService } from './../../services/pessoa/pessoa.service';
import { ContasAPagarService } from './contas-pagar.service';
import { ContasAPagarModel } from './contas-pagar.model';

@Component({
  selector: 'page-conta-pagar',
  templateUrl: 'conta-pagar.html',
})
export class ContaPagarPage {

  contasQuitadas:ContasAPagarModel[] = [];
  contasAbertas:ContasAPagarModel[] = [];
  contasVencidas:ContasAPagarModel[] = [];
  totalQuitadas:number = 0;
  totalEmAberto:number = 0;
  totalVencidas:number = 0;
  fornecedoresQuitados:string[] = [];
  fornecedoresEmAberto:string[] = [];
  fornecedoresVencidos:string[] = [];
  dataHoje = new Date()

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public contasAPagarService: ContasAPagarService,
              public alertCtrl: AlertController,
              public pessoaService: PessoaService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content:'Aguarde...'
    });
    const idObra = this.navParams.get('id');
    if( idObra !== undefined){
      loading.present();
      this.contasAPagarService.getContasPorObra(idObra).subscribe(contas =>{
        const retorno: ContasAPagarModel[] = contas;
        for( let i = 0; i< retorno.length; i++){
          if(retorno[i].situacao === 1){
            this.contasQuitadas.push(retorno[i]);
            this.totalQuitadas += retorno[i].valor;
          }
          else if(retorno[i].situacao === 0 && new Date(retorno[i].vencimento) < this.dataHoje){
            this.contasVencidas.push(retorno[i]);
            this.totalVencidas += retorno[i].valor;
          }
          else {
            this.contasAbertas.push(retorno[i]);
            this.totalEmAberto += retorno[i].valor;
          }
        }
        const httpcalls = [];
        for ( let i = 0; i < this.contasAbertas.length; i++) {
          httpcalls.push(this.pessoaService.getPessoa(this.contasAbertas[i].pessoa));
        }
        forkJoin(httpcalls).subscribe(res => {
          res.forEach(response => {
            const pessoa: PessoaModel = <PessoaModel> response;
            this.fornecedoresEmAberto.push(pessoa.nome);
          });
        });
        const httpcallsQuitadas = [];
        for ( let i = 0; i < this.contasQuitadas.length; i++) {
          httpcallsQuitadas.push(this.pessoaService.getPessoa(this.contasQuitadas[i].pessoa));
        }
        forkJoin(httpcallsQuitadas).subscribe(res => {
          res.forEach(response => {
            const pessoa: PessoaModel = <PessoaModel> response;
            this.fornecedoresQuitados.push(pessoa.nome);
          });
        });
        const httpcallsVencidas = [];
        for ( let i = 0; i < this.contasVencidas.length; i++) {
          httpcallsQuitadas.push(this.pessoaService.getPessoa(this.contasVencidas[i].pessoa));
        }
        forkJoin(httpcallsQuitadas).subscribe(res => {
          res.forEach(response => {
            const pessoa: PessoaModel = <PessoaModel> response;
            this.fornecedoresVencidos.push(pessoa.nome);
          });
        });
      });
      loading.dismiss();
    }
    else{
      this.mostrarAlertErro();
    }
  }

  mostrarAlertErro(){
    const alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle:'Houve um erro ao carregar Contas a pagar',
      buttons: ['OK']
    });
    alert.present();
  }
  detalharConta(conta:ContasAPagarModel){
    let vencimento:Date = new Date(conta.vencimento)
    let emissao:Date = new Date(conta.data_emissao)
    const alert = this.alertCtrl.create({
      title: 'Conta de ' + conta.pessoa,
      subTitle: 'Emissão: ' + emissao.toLocaleDateString() + '\n' +
                'Vencimento: ' + vencimento.toLocaleDateString() + '\n' +
                'Valor:R$ ' + conta.valor + '\n' +
                'Observação: ' + conta.obs,
      buttons: ['OK']
    });
    alert.present();
  }
}
