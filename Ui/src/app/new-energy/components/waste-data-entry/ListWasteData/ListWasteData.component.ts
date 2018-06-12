import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { WasteDataEntryService } from '../WasteDataEntry.service';
import { AuthService } from '../../auth/auth.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DialogEditWasteDataEntry } from '../DialogEditWasteDataEntry/DialogEditWasteDataEntry.component';

@Component({
  selector: 'app-ListWasteData',
  templateUrl: './ListWasteData.component.html',
  styleUrls: ['./ListWasteData.component.css']
})
export class ListWasteDataComponent implements OnInit {

  wasteList: any;
  dataSource = new MatTableDataSource();
  //displayedColumns is array of strings,and every string is representation of one column in table.

  displayedColumns = [];
  ROLE: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private changeDetectorRefs: ChangeDetectorRef,
              private authService: AuthService,
              private _wasteDataEntryService: WasteDataEntryService,
              public dialog: MatDialog ) {
     this.authService.setRole.subscribe((value) => {
          this.ROLE = value;
          if (value == 'ROLE_WASTE_OWNER') {
           this.displayedColumns = ['location', 'wasteType', 'amount',
                                    'validityDate', /*'actionsColumn'*/];
          }
          if (value == 'ROLE_ADMIN') {
           this.displayedColumns = ['wasteOwner', 'location', 'wasteType', 'amount',
                                    'validityDate',  'actionsColumn'];
      }
    });
  }
  newWasteDataEntry() {
    let dialogRef = this.dialog.open(DialogEditWasteDataEntry, {
      //disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px', data: {
        "id": null
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
    this._wasteDataEntryService.loadAllWasteDataById(this.authService.wasteOwnerId).subscribe(
      data => {
        this.wasteList = data;
        this.dataSource.data = this.wasteList;
        console.log(this.wasteList);
      });
    this.changeDetectorRefs.detectChanges();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.refresh();
  }

}
