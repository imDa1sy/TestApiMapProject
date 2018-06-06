import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { restConfig } from '../../restConfig';
import { AuthService } from '../../auth/auth.service';

import { DialogEditWasteOwnerComponent } from '../DialogEditWasteOwner/DialogEditWasteOwner.component';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { WasteOwnerService } from '../WasteOwner.service';
import { WasteOwner } from '../WasteOwner.class';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ListWasteOwner',
  templateUrl: './ListWasteOwner.component.html',
  styleUrls: ['./ListWasteOwner.component.css']
})
export class ListWasteOwnerComponent implements OnInit {

  localWasteOwnerToEdit: WasteOwner;
  //============================ ATTRIBUTES ============================================= 
  wasteOwnerList: any;
  dataSource = new MatTableDataSource();
  //displayedColumns is array of strings,and every string is representation of one column in table.

  displayedColumns = [];
  ROLE: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: Http,
    private changeDetectorRefs: ChangeDetectorRef,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _wasteOwnerService: WasteOwnerService,
    private router : Router) {

    this.authService.setRole.subscribe((value) => {
      this.ROLE = value;
      if (value == 'ROLE_WASTE_OWNER') {
        this.displayedColumns = [ 'name','surName','companyName',
                                  'address','contact'];
      } if (value == 'ROLE_ADMIN') {
        this.displayedColumns = ['name','surName','companyName',
        'address','contact', 'actionsColumn'];
      }
   
    });
  }
  //============================= METHODS ========================================             
  refresh() {
    this._wasteOwnerService.getData().subscribe(
      data => {
        this.wasteOwnerList = data;
        this.dataSource.data = this.wasteOwnerList;
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
  newWasteOwner() {
    let localWasteOwnerAdd={
      wasteOwnerData:{
        name: '',
      surName: '',
      companyName: '',
      address: '',
      contact: {
          telephone: '',
          mobile: '',
          email: ''
      }
    },
    locations:[],
    users:[]

    }
    let dialogRef = this.dialog.open(DialogEditWasteOwnerComponent, {
     // disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px', data: { 
        "id": null ,
        "localWasteOwner":localWasteOwnerAdd,
        "enableUsername":true,
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }
  mapView(id){
    //_wasteOwnerService setter ownerIdToMap set unique owners id and then its used in mapView components
    this._wasteOwnerService.ownerIdToMap=id;
    this.router.navigate(['biodeseuri/new-energy-from-waste/map-view']);
  }
  editWasteOwner(elementData) {
   /*_wasteOwnerService load data and pass it in data object which is then injected in 
    DialogEditWasteOwnerComponent to handle it.
   */
    this._wasteOwnerService.load(elementData.id).subscribe(data => {
      this.localWasteOwnerToEdit = data;
    
      
    let dialogRef = this.dialog.open(DialogEditWasteOwnerComponent, {
     // disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px',
      data: {
        "id": elementData.id,
        "localWasteOwner":this.localWasteOwnerToEdit,
        "edit":true,
        "enableUsername":false,   
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  });
  }

  deleteWasteOwner(id) {
    let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
      width: '300px', height: '300px',
      data: { "text": "Waste owner", "restName": "/api/removewasteowner/", "entity_id": id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }
}
