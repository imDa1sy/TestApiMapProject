import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { restConfig } from '../../restConfig';

import { DialogEditWasteTypeComponent } from '../DialogEditWasteType/DialogEditWasteType.component';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { WasteTypeService } from '../Wastetype.service';
import { WasteType } from '../WasteType.class';


@Component({
  selector: 'app-ListWasteType',
  templateUrl: './ListWasteType.component.html',
  styleUrls: ['./ListWasteType.component.css'] 
})
export class ListWasteTypeComponent implements OnInit {

  localWasteTypeToEdit: WasteType;
  //=========================== ATTRIBUTES ==========================================
  WasteTypeList: any;
  dataSource = new MatTableDataSource();

  //displayedColumns is array of strings,and every string is representation of one column in table.
  displayedColumns = [];
  ROLE: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private _wasteTypeService: WasteTypeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private authService: AuthService) {
    this.authService.setRole.subscribe((value) => {

      this.ROLE = value;
      if (value == 'ROLE_WASTE_OWNER') {
        this.displayedColumns = [ 'wasteType','wasteColor'];
      } if (value == 'ROLE_ADMIN') {
        this.displayedColumns = [ 'wasteType','wasteColor', 'actionsColumn'];
      }
     
    });
  }

  //============================ METHODS =============================================             
  refresh() {
    this._wasteTypeService.getData().subscribe(
      data => {
        this.WasteTypeList = data;
        this.dataSource.data = this.WasteTypeList;
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
  NewWasteType() {
    let localWasteTypeToAdd={
      id :'',
      wasteType : '',
      color:''
    }
    let dialogRef = this.dialog.open(DialogEditWasteTypeComponent, {
    //  disableClose: true,
      autoFocus: true,
      width: '400px', height: '350px', data: { 
        "id": null,
        "localWasteType":localWasteTypeToAdd
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }

    });
  }
  editWasteType(elementData) {
    this._wasteTypeService.load(elementData.id).subscribe(data => {
      this.localWasteTypeToEdit = data;
    let dialogRef = this.dialog.open(DialogEditWasteTypeComponent, {
     // disableClose: true,
      autoFocus: true,
      width: '400px', height: '350px',
      data: {
        "id": elementData.id,
        "localWasteType": this.localWasteTypeToEdit,
      
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }

    });
  });
  }
  
  deleteWasteType(id) {
    let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
      width: '300px', height: '300px',
      data: { "text": "Waste type", "restName": "/api/removewastetype/", "entity_id": id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }
}
