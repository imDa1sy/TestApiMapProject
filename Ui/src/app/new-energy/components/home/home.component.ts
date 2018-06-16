import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router : Router) {

    this.authService.setRole.subscribe((value) => {
          // if waste owner login he get redirected to his waste data
      if (value == 'ROLE_WASTE_OWNER') {
        this.router.navigate(['biodeseuri/new-energy-from-waste/list-waste-data']);

        //if waste user login he get redirected to map view 
      } if (value == 'ROLE_WASTE_USER') {
        this.router.navigate(['biodeseuri/new-energy-from-waste/map-view']);
      }
   
    });
  }
  ngOnInit() {
  }

}
