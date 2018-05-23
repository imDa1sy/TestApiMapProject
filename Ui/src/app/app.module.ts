import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

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
import { BiomassOwnerComponent } from './new-energy/components/biomass-owner/biomass-owner.component';
import { BiomassOwnerService } from './new-energy/components/biomass-owner/biomass-owner.service';
import { BiomassTypeComponent } from './new-energy/components/biomass-type/biomass-type.component';
import { BiomassTypeService } from './new-energy/components/biomass-type/biomass-type.service';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    BenefitsComponent,
    ProcedureAndServicesComponent,
    NewEnergyComponent,
    CaseStudyComponent,
    BiomassOwnerComponent,
    BiomassTypeComponent
  ],
  imports: [
    RouterModule.forRoot(router),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
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
  providers: [BiomassOwnerService, BiomassTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
