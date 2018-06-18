import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { WasteDataEntryService } from '../WasteDataEntry.service';
import { AuthService } from '../../auth/auth.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DialogEditWasteDataEntry } from '../DialogEditWasteDataEntry/DialogEditWasteDataEntry.component';
import { WasteDataEntry } from '../WasteDataEntry.class';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { TranslateLangService } from '../../../TranslateLangService.service';
import { TranslateService } from '@ngx-translate/core';
import { WasteTypeService } from '../../waste-type/Wastetype.service';
import { WasteTypeSearch, WasteTypeFilter } from '../../waste-type/WasteType.class';

@Component({
  selector: 'app-ListWasteData',
  templateUrl: './ListWasteData.component.html',
  styleUrls: ['./ListWasteData.component.css']
})
export class ListWasteDataComponent implements OnInit {

  filterData: WasteTypeFilter;
  Language= 'en';
  wasteList: any;
  dataSource = new MatTableDataSource();
  //displayedColumns is array of strings,and every string is representation of one column in table.

  displayedColumns = [];
  ROLE: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private _wasteTypeService: WasteTypeService, 
              private authService: AuthService,
              private _wasteDataEntryService: WasteDataEntryService,
              public dialog: MatDialog,
              private translate: TranslateService,
              private _translateServiceLang : TranslateLangService ) {
                this.filterData = new WasteTypeFilter();
                this.Language= this._translateServiceLang.currentLanguageActive;
     this.authService.setRole.subscribe((value) => {
          this.ROLE = value;
          if (value == 'ROLE_WASTE_OWNER') {
           this.displayedColumns = ['location', 'wasteType', 'amount',
                                    'validityDate', 'actionsColumn'];
          }
          if (value == 'ROLE_ADMIN') {
           this.displayedColumns = ['wasteOwner', 'location', 'wasteType', 'amount',
                                    'validityDate',  'actionsColumn'];
      }
    });
  }

  newWasteDataEntry() {

    let localWasteDataEntryNew= {
      wasteOwnerId: '',
      wasteLocationId: '',
      wasteTypeId: '',
      amount: '',
      wasteDataSubmited: '' ,
      validityDateStart:  new Date(),  // when creating new waste data entry then default date is set to current date
      validityDateEnd: '',
      expired: false
    }
    
    let dialogRef = this.dialog.open(DialogEditWasteDataEntry, {
      //disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px', data: {
        "id": null,
        "localWasteDataEntry": localWasteDataEntryNew,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }

  refresh() {
    //load all waste data entryes with waste owner id 
    console.log(this.authService.wasteOwnerId+' u refreshu '+this.filterData)
    console.log(this.filterData)
    this._wasteDataEntryService.loadAllWasteDataById(this.authService.wasteOwnerId,this.filterData).subscribe(
      data => {
        this.wasteList = data;
        this.dataSource.data = this.wasteList;
        console.log(this.wasteList)
      });
    this.changeDetectorRefs.detectChanges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  FilterSearch(){
    console.log(this.filterData)
    this.refresh();
  }
  ngOnInit() {
    console.log(this.filterData)
    this._wasteTypeService.loadAllActiveWasteTypes().subscribe( data => {
      // the data contains all the waste types
      // iterate and put into our filterData.wasteTypeSearch array
      for (const iterationWasteType of data) {
        // create new instance of wasteTypeSearch
        var tempWasteTypeSearch = new WasteTypeSearch();
        // fill the wasteTypeSearch form WasteType got from iterator
        tempWasteTypeSearch.copyFromWasteType(iterationWasteType);
        tempWasteTypeSearch.search=true;
        // push the temp instance into our filterData.wasteTypeSearch array
        this.filterData.wasteTypeSearch.push(tempWasteTypeSearch);
       }
     
       
    }); 
    this.FilterSearch();
  }

  editWasteData(elementData){
    let dialogRef = this.dialog.open(DialogEditWasteDataEntry, {
      // disableClose: true,
       autoFocus: true,
       width: '800px', height: '550px',
       data: {
         "id": elementData.wasteDataEntry.id,
         "localWasteDataEntry": WasteDataEntry,
         "edit":true,
        
       }
     });
   
     dialogRef.afterClosed().subscribe(result => {
       if (result != null) {
         this.refresh();
       }
     });
  }

  deleteWasteData(id){
    let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
      width: '300px', height: '300px',
      data: { "text": this.translate.instant('new_energy-waste-dataEntry-data'), "restName": "/api/removewastedata/", "entity_id": id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }
  
}
