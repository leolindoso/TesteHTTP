import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { Injectable, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http'
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

  semResultado : boolean = false;
  dados : any;
  resultPesquisa: any[];
  pesquisaURL = 'http://192.168.3.158/upa-webapi/api//Util/ObterPesquisaPaciente';

  constructor(private http: HttpClient,private ref:ApplicationRef) {
    this.resultPesquisa = new Array();
   }

  listar(){
    this.http.get(this.pesquisaURL).toPromise().then(response =>{this.dados = response});
    //console.log(this.http.get(this.pesquisaURL).subscribe(dados => this.dados = dados));
    //this.http.get<any[]>(this.pesquisaURL).subscribe(dados =>this.dados = dados);
    return this.dados
  }

  pesquisar(target){
    this.semResultado = true;
    this.resultPesquisa = new Array();
    this.http.get(this.pesquisaURL).toPromise().then(response =>{this.dados = response});
    //console.log(this.http.get(this.pesquisaURL).subscribe(dados => console.log(dados)));
    for( let obj of this.dados.data){
      //console.log("this.dados[i].id = " + obj.id);
      for(let tag of obj.tags){
        console.log("this.dados[i].tag = " + tag);
        //console.log(target);
        if(tag == target){
          console.log("é igual");
          this.semResultado = false;
          this.resultPesquisa.push(obj);
        }
      } 
    }
    return this.resultPesquisa;
  }

   async post(nome: string,situacao : string){
    this.semResultado = false;
    console.log("ta no post");
    console.log("Post Situacao: " + situacao);
    var id;
    var name;
    var siteURL;
    var description;
    var tags : any[];
    var json = 
      {  
        "Scope":{  
    
        },
        "Data":{  
          "tipo":"nome",
          "conteudo":nome,
          "guidUpa":"95ad0f33-69ac-4d73-a6c7-f078e2f084f9",
          "situacao":situacao
        }
      }
    ;
    var params = 'json=' + json;
    await this.http.post(this.pesquisaURL,json).pipe(map(res => res)).subscribe( dados => {
      this.dados = dados;
      //dataSource = dados;
      //console.log(dados.Data.length);
      if(this.dados.Data.length == 0){
        console.log("ta vazio")
        this.semResultado = true;
        
      }
      //dataSource = new MatTableDataSource(<any>dados);
      console.log(this.dados.Data);
      console.log(this.semResultado);
      
    });
    return this.dados.Data;
    
    
  }

}
