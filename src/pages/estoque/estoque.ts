import { MateriaPrimaService } from './../../services/materia_prima.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EntradaMateriaPrimaModel } from './../../models/entrada-materia-prima.model';
import { EntradaMateriaPrimaService } from './../../services/entrada_materia_prima.service';
import { ItensEntradaMateriaPrimaService } from './../../services/itens-entrada-materiaprima.service';
import { ItemEntradaMateriaPrimaModel } from './../../models/item-entrada-materiaprima.model';
import { MateriaPrimaModel } from './../../models/materia-prima.model';



@Component({
  selector: 'page-estoque',
  templateUrl: 'estoque.html',
})

export class EstoquePage {

  entradas:EntradaMateriaPrimaModel[] = [];
  materiasPrimas:string[] = [];
  unidades:string[] = [];
  itensEntradas:ItemEntradaMateriaPrimaModel[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private entradaMateriaPrimaService:EntradaMateriaPrimaService,
              private itensEntradaMateriaPrimaService:ItensEntradaMateriaPrimaService,
              private materiaPrimaService:MateriaPrimaService,
              private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content:'Aguarde...'
    });
    const nomeObra = this.navParams.get('nome');
    loading.present();
    this.entradaMateriaPrimaService.getEntradaMateriaPrimaPorObra(nomeObra).subscribe(retorno =>{
      this.entradas = retorno;
      const httpcalls = [];
      for(let i = 0;i < this.entradas.length; i++){
        httpcalls.push(this.itensEntradaMateriaPrimaService.getItensEntradaMateriaPrimaPorEntrada(this.entradas[i].id));
      }
      forkJoin(httpcalls).subscribe(res => {
        res.forEach(response => {
          const entrada: ItemEntradaMateriaPrimaModel[] = <ItemEntradaMateriaPrimaModel[]> response;
          for(let i = 0; i< entrada.length; i++){
            const item = entrada[i];
            const newArray = this.itensEntradas.filter(function (el){
              return el.materiaprima === item.materiaprima;
            })
            if(newArray.length > 0){
              let indexItem:ItemEntradaMateriaPrimaModel = new ItemEntradaMateriaPrimaModel();
              indexItem = newArray[0];
              let index = this.itensEntradas.indexOf(indexItem);
              this.itensEntradas[index].quantidade += item.quantidade;
            }
            else{
              this.itensEntradas.push(entrada[i]);
            }
          }
        });
        const materiaPrimaCalls = [];
        for(let i = 0;i < this.itensEntradas.length; i++){
          materiaPrimaCalls.push(this.materiaPrimaService.getMateriaPrimaPorCodigo(this.itensEntradas[i].materiaprima));
        }
        forkJoin(materiaPrimaCalls).subscribe(response =>{
          response.forEach(res =>{
            const materia:MateriaPrimaModel = <MateriaPrimaModel> res;
            this.materiasPrimas.push(materia.nome);
            this.unidades.push(materia.unidade);
          });
        });
      });
    });
    loading.dismiss();
  }

}
