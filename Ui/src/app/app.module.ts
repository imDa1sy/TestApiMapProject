import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
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
  MatCardModule,
  MatSnackBarModule,
  MatGridListModule,
  MatRadioModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';
import { router } from './app.router';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ProcedureAndServicesComponent } from './procedure-and-services/procedure-and-services.component';
import { NewEnergyComponent } from './new-energy/new-energy.component';
import { CaseStudyComponent } from './case-study/case-study.component';


import { LoginComponent } from './new-energy/components/login/login.component';
import { AuthService } from './new-energy/components/auth/auth.service';
import { AuthGuard } from './new-energy/components/auth/auth.guard';
import { DialogEditWasteTypeComponent } from './new-energy/components/waste-type/DialogEditWasteType/DialogEditWasteType.component';
import { ListWasteTypeComponent } from './new-energy/components/waste-type/ListWasteType/ListWasteType.component';
import { DialogDeleteQuestionComponent } from './new-energy/components/DialogDeleteQuestion/DialogDeleteQuestion.component';
import { DialogEditWasteOwnerComponent } from './new-energy/components/waste-owner/DialogEditWasteOwner/DialogEditWasteOwner.component';
import { ListWasteOwnerComponent } from './new-energy/components/waste-owner/ListWasteOwner/ListWasteOwner.component';
import { WasteTypeService } from './new-energy/components/waste-type/Wastetype.service';
import { WasteOwnerService } from './new-energy/components/waste-owner/WasteOwner.service';
import { ListUserComponent } from './new-energy/components/user/ListUser/ListUser.component';
import { DialogEditWasteUserComponent } from './new-energy/components/waste-user/DialogEditWasteUser/DialogEditWasteUser.component';
import { ListWasteUserComponent } from './new-energy/components/waste-user/ListWasteUser/ListWasteUser.component';
import { WasteUserService } from './new-energy/components/waste-user/WasteUser.service';
import { UserService } from './new-energy/components/user/User.service';
import { DialogEditUserComponent } from './new-energy/components/user/DialogEditUser/DialogEditUsercomponent';
import { MapViewComponent } from './new-energy/components/map-view/MapView.component';
import { WasteDataEntryComponent } from './new-energy/components/waste-data-entry/WasteDataEntry.component';
import { HomeComponent } from './new-energy/components/home/home.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    BenefitsComponent,
    ProcedureAndServicesComponent,
    NewEnergyComponent,
    CaseStudyComponent,
    ListUserComponent,
    ListWasteOwnerComponent,
    ListWasteTypeComponent,
    ListWasteUserComponent,
    LoginComponent,
    DialogEditWasteOwnerComponent,
    DialogEditWasteTypeComponent,
    DialogDeleteQuestionComponent,
    DialogEditWasteUserComponent,
    DialogEditUserComponent,
    MapViewComponent,
    WasteDataEntryComponent,
    HomeComponent  
   
  ],
  imports: [
    RouterModule.forRoot(router),
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
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
    MatCardModule,
    MatSnackBarModule,
    MatGridListModule,
    MatRadioModule,
    MatSortModule,
    MatPaginatorModule
  ],
  entryComponents: [ 
                     DialogDeleteQuestionComponent,
                     DialogEditWasteTypeComponent,
                     DialogEditWasteOwnerComponent,
                     DialogEditWasteUserComponent,
                     DialogEditUserComponent
   ],
  providers: [WasteOwnerService, WasteUserService,WasteTypeService,UserService,
    AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
 