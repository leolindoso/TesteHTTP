import { Component, OnInit } from '@angular/core';
import { PesquisaService } from '../pesquisa.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pesquisaResultado: any[];
  pesquisou : boolean = false;
  target : string = "";
  postData : any;
  algo: any;
  situacao : string = "Encerrado"

  constructor(private pesquisaService: PesquisaService, private router : Router, ) { }

  ngOnInit() {
    this.target = "";
    //this.listar();
    this.pesquisaResultado = this.pesquisaService.dados;
  }

  listar(){
    this.pesquisou = true;
    this.pesquisaService.listar();
    this.pesquisaResultado = this.pesquisaService.dados;
  }

  pesquisar(target,situacao){
    this.pesquisou = true;
    this.router.navigate(['\Pesquisa'], {queryParams: {searchParam: this.target,situationParam: this.situacao}});
  }

  post(){
    //this.pesquisaService.post(this.target,this.situacao);
    this.router.navigate(['\Pesquisa'], {queryParams: {searchParam: this.target,situationParam: this.situacao}});
   
  }
  changeSituacao($event){
    console.log("InnerHTML: " + $event.path[0].innerHTML);
    this.situacao = $event.path[0].innerHTML;
  }

}
