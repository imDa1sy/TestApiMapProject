import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { restConfig } from '../restConfig';

@Component({
  selector: 'app-DialogDeleteQuestion',
  templateUrl: './DialogDeleteQuestion.component.html',
  styleUrls: ['./DialogDeleteQuestion.component.css']
})
export class DialogDeleteQuestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http, public snackBar: MatSnackBar, ) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  DeleteAndClose() {
    this.http.delete('http://' + restConfig.Host + ':' + restConfig.Port + this.data.restName + this.data.entity_id)
      .subscribe((data) => {
        if (data.ok) {
          this.snackBar.open("" + this.data.text + " with id= " + this.data.entity_id, " deleted!", {
            duration: 4000,
          });

          console.log("" + this.data.text + " with id= " + this.data.entity_id + ' is deleted!');
        } else if (!data.ok) {
          this.snackBar.open("Error ", " occurred!", {
            duration: 4000,
          });
        }

      });

  }
}
