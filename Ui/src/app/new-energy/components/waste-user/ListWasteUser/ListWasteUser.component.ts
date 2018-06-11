import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DialogDeleteQuestionComponent } from '../../DialogDeleteQuestion/DialogDeleteQuestion.component';
import { DialogEditWasteUserComponent } from '../DialogEditWasteUser/DialogEditWasteUser.component';
import { WasteUser } from '../WasteUser.class';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Http } from '@angular/http';
import { WasteUserService } from '../WasteUser.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-ListWasteUser',
  templateUrl: './ListWasteUser.component.html',
  styleUrls: ['./ListWasteUser.component.css']
})
export class ListWasteUserComponent implements OnInit {

  
  localWasteUserToEdit: WasteUser;
  //============================ ATTRIBUTES ============================================= 
  wasteUserList: any;
  dataSource = new MatTableDataSource();
  //displayedColumns is array of strings,and every string is representation of one column in table.

  displayedColumns = [];
  ROLE: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: Http,
    private changeDetectorRefs: ChangeDetectorRef,
    private _wasteUserService: WasteUserService,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {

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
    this._wasteUserService.loadAllActiveWasteUsers().subscribe(
      data => {
        this.wasteUserList = data;
        this.dataSource.data = this.wasteUserList;
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
  newWasteUser() {
    // This is object model used in dialogEditWasteUser when creation new Waste user 
    //and is sended in data object
    let localWasteUserAdd={
      wasteUserData:{
        name: '',
      surName: '',
      companyName: '',
      address: '',
      active: true,
      contact: {
          telephone: '',
          mobile: '',
          email: ''
      }
    },
    locations:[{
      myId: 'null',
      description:'',
      latitude:'',
      logitude:''
    }],
    users:[]

    }
    let dialogRef = this.dialog.open(DialogEditWasteUserComponent, {
     // disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px', data: {
         "id": null ,
         "localWasteUser":localWasteUserAdd,
         "enableUsername":true, 
         "enableAddUser":true
         
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }
  editWasteUser(elementData) {
    
    let dialogRef = this.dialog.open(DialogEditWasteUserComponent, {
     // disableClose: true,
      autoFocus: true,
      width: '800px', height: '550px',
      data: {
        "id": elementData.id,
        "localWasteUser":this.localWasteUserToEdit,
        "edit":true,
        "enableUsername":false, 
        "enableAddUser":false
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }

  deleteWasteUser(id) {
    let dialogRef = this.dialog.open(DialogDeleteQuestionComponent, {
      width: '300px', height: '300px',
      data: { "text": "Waste user", "restName": "/api/removewasteuser/", "entity_id": id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.refresh();
      }
    });
  }
}
