import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { router } from './app.router';
import { NavbarComponent } from './navbar/navbar.component';
import 'hammerjs';
import {
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatTableModule,
  MatMenuModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatCardModule
} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(router,{ useHash:true }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
