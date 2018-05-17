import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  list:BiomassOwner;
  constructor(private http:Http){
    this.http.get('http://localhost:8080/api/getallbiomassowners')
    .subscribe((res:Response)=>{

         this.list=res.json();
         console.log(this.list);
    });
  }

  ngOnInit() {
  }

}
