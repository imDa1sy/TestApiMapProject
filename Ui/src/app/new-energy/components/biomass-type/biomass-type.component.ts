import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BiomassTypeService } from './biomass-type.service';


@Component({
  selector: 'app-biomass-type',
  templateUrl: './biomass-type.component.html',
  styleUrls: ['./biomass-type.component.css']
})
export class BiomassTypeComponent implements OnInit {

  //=========================== ATTRIBUTES ==========================================
  biomassTypeList: any;
  dataSource = new MatTableDataSource();
  //displayedColumns is array of strings,and every string is representation of one column in table.
  displayedColumns = [/*'id',*/ 'biomassType'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: Http,
              private changeDetectorRefs: ChangeDetectorRef,
              private _biomassTypeService: BiomassTypeService) {}

 //============================ METHODS =============================================             
  refresh() {
    this._biomassTypeService.getData().subscribe(
      data => {
        this.biomassTypeList = data;
        this.dataSource.data = this.biomassTypeList;
      });
    this.changeDetectorRefs.detectChanges();
  }

  searchElements(search: string = "") {
    console.log(search);
    this.dataSource.filter = search.toLowerCase().trim();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.refresh();
  }
}
