import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PesquisaService } from '../pesquisa.service';
import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, SimpleChanges, SimpleChange } from '@angular/core';
import { MdbTableService, MdbTablePaginationComponent } from 'angular-bootstrap-md';


@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pesquisaResultado: any[];
  pesquisou : boolean = false;
  target : string = "";
  situacao: string = "Encerrado";

  displayedColumns = ['nome', 'numeroProtocolo', 'situacao', 'horario','button'];
  dataSource: MatTableDataSource<any>;

  

  constructor(private pesquisaService: PesquisaService, 
    private router : Router,
    private activeRoute : ActivatedRoute,
    private changeDetect : ChangeDetectorRef,
    private htt : HttpClient) { }

  ngOnInit() {
    this.situacao = "Encerrado";
    this.activeRoute.queryParams.subscribe(
      (queryParams: any) => {
        this.target = queryParams['searchParam'];
        this.situacao = queryParams['situationParam'];
      }
    )
    console.log("PesquisaCompontent.target " + this.target);
    //this.pesquisar(this.target,this.situacao);

    
  }

  changeSituacao($event){
    console.log("InnerHTML: " + $event.path[0].innerHTML);
    this.situacao = $event.path[0].innerHTML;
  }

   async pesquisar(target,situacao){
    console.log("Pesquisar Target: " + target)
    console.log("Pesquisar Situacao: " + situacao)
    this.pesquisou = true;
    console.log("antes do await");
    await this.pesquisaService.post(target,situacao);
    console.log("depois do await");
    this.dataSource.data = this.pesquisaService.dados.Data;
    
    
  }

  ngOnChange(changes: SimpleChanges){

    this.dataSource.data = this.pesquisaService.dados.Data;
    this.dataSource.connect();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.pesquisaService.dados.Data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetect.detectChanges();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  
}

