import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { restConfig } from '../../restConfig';

import { DialogEditWasteTypeComponent } from '../DialogEditWasteType/DialogEditWasteType.component';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { WasteTypeService } from '../Wastetype.service';
import { WasteType, MultiLanguageDescription } from '../WasteType.class';
import { TranslateLangService } from '../../../TranslateLangService.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-ListWasteType',
  templateUrl: './ListWasteType.component.html',
  styleUrls: ['./ListWasteType.component.css'] 
})
export class ListWasteTypeComponent implements OnInit {

  
  //=========================== ATTRIBUTES ==========================================
  WasteTypeList: any;
  dataSource = new MatTableDataSource();
  Language='en';
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
    private authService: AuthService,
    private translate: TranslateService,
    private _translateServiceLang : TranslateLangService) {

    this.authService.setRole.subscribe((value) => {
      console.log(this._translateServiceLang.currentLanguageActive)
      this.Language= this._translateServiceLang.currentLanguageActive;
      this.ROLE = value;
      if (value == 'ROLE_WASTE_OWNER') {
        this.displayedColumns = [ 'wasteType','wasteColor','factor'];
      } if (value == 'ROLE_ADMIN') {
        this.displayedColumns = [ 'wasteType','wasteColor','factor', 'actionsColumn'];
      }
     
    });
   
  }

  //============================ METHODS =============================================             
  refresh() {
    this._wasteTypeService.loadAllActiveWasteTypes().subscribe(
      data => {
        this.WasteTypeList = data;
        console.log(this.WasteTypeList)
        this.dataSource.data = this.WasteTypeList;
      });
    this.changeDetectorRefs.detectChanges();

  }

  searchElements(search: string = "") {
    
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
      active:true,
      wasteType : {
          en:'' ,
          ro:''
        },
      color:'',
      factor:0
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
   var localWasteTypeToEdit={
      active:true,
   wasteType : {
       en:'' ,
       ro:''
     },
   color:'',
   factor:0
 }
    let dialogRef = this.dialog.open(DialogEditWasteTypeComponent, {
     // disableClose: true,
      autoFocus: true,
      width: '400px', height: '350px',
      data: {
        "id": elementData.id,
        "localWasteType": localWasteTypeToEdit
      
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }

    });
  }
  
  deleteWasteType(id) {
    let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
      width: '300px', height: '300px',
      data: { "text": this.translate.instant('new_energy-waste-type-header'), "restName": "/api/removewastetype/", "entity_id": id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }
}
