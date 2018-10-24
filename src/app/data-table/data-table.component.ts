import { PesquisaService } from './../pesquisa.service';

import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class TableOverviewExample {
  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<any>;
  situacao : string;
  target : string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pesquisaService : PesquisaService,
    private changeDedect : ChangeDetectorRef,
    private router : Router,
    private activeRoute : ActivatedRoute) {
  
  }

  ngOnInit(){
    this.situacao = "Encerrado";
    this.activeRoute.queryParams.subscribe(
      (queryParams: any) => {
        this.target = queryParams['searchParam'];
      }
    )
    
  }

  ngOnChanges(){
    this.changeDedect.detectChanges()
    this.dataSource.data = this.pesquisaService.dados.Data;
    this.dataSource._updateChangeSubscription()
    this.dataSource._renderChangesSubscription = this.pesquisaService.dados.Data;
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.pesquisaService.dados.Data);
    
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}



