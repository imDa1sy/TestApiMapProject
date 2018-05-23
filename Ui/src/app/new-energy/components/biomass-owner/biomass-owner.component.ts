import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BiomassOwnerService } from './biomass-owner.service';

@Component({
  selector: 'app-biomass-owner',
  templateUrl: './biomass-owner.component.html',
  styleUrls: ['./biomass-owner.component.css']
})
export class BiomassOwnerComponent implements OnInit {

 //============================ ATTRIBUTES ============================================= 
  biomassOwnerList: any;
  dataSource = new MatTableDataSource();
  //displayedColumns is array of strings,and every string is representation of one column in table.
  displayedColumns = [/*'id',*/ 'firstName', 'lastName',
    'location', 'biowasteTypeOutput', 'contact'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: Http,
              private changeDetectorRefs: ChangeDetectorRef,
              private _biomassOwnerService: BiomassOwnerService) {}

 //============================= METHODS ========================================             
  refresh() {
    this._biomassOwnerService.getData().subscribe(
      data => {
        this.biomassOwnerList = data;
        this.dataSource.data = this.biomassOwnerList;
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
