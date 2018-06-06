import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ProcedureAndServicesComponent } from './procedure-and-services/procedure-and-services.component';
import { NewEnergyComponent } from './new-energy/new-energy.component';
import { CaseStudyComponent } from './case-study/case-study.component';

import { LoginComponent } from './new-energy/components/login/login.component';
import { AuthGuard } from './new-energy/components/auth/auth.guard';
import { ListWasteTypeComponent } from './new-energy/components/waste-type/ListWasteType/ListWasteType.component';
import { ListWasteOwnerComponent } from './new-energy/components/waste-owner/ListWasteOwner/ListWasteOwner.component';
import { ListUserComponent } from './new-energy/components/user/ListUser/ListUser.component';
import { ListWasteUserComponent } from './new-energy/components/waste-user/ListWasteUser/ListWasteUser.component';
import { MapViewComponent } from './new-energy/components/map-view/MapView.component';
import { WasteDataEntryComponent } from './new-energy/components/waste-data-entry/WasteDataEntry.component';
import { HomeComponent } from './new-energy/components/home/home.component';

export const router : Routes = [
 // za route aktivacija canActivate: [AuthGuard],
      { path : '' , redirectTo : '/biodeseuri' , pathMatch:'full' },
      { path : 'biodeseuri' , component: IntroComponent },
      { path : 'biodeseuri/benefits-for-moldova' , component: BenefitsComponent },
      { path : 'biodeseuri/procedure-and-services-for-farmers' , component: ProcedureAndServicesComponent },
      { path : 'biodeseuri/new-energy-from-waste' , component: NewEnergyComponent,
        children : [ 
         // { path : 'login', component : LoginComponent },
          { path : 'home',component : HomeComponent,canActivate: [AuthGuard]},
          { path : 'list-waste-owners',component : ListWasteOwnerComponent,canActivate: [AuthGuard]},
          { path : 'list-waste-users', component : ListWasteUserComponent,canActivate: [AuthGuard]},
          { path : 'list-waste-type',component : ListWasteTypeComponent,canActivate: [AuthGuard]},
          { path : 'list-user',component : ListUserComponent,canActivate: [AuthGuard]},
          { path : 'list-waste-data-entry',component : WasteDataEntryComponent,canActivate: [AuthGuard]},
          { path : 'map-view',component : MapViewComponent,canActivate: [AuthGuard]}

        ] },
      { path : 'biodeseuri/case-study' , component: CaseStudyComponent }
    ] 

