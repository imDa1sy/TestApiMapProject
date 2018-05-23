import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ProcedureAndServicesComponent } from './procedure-and-services/procedure-and-services.component';
import { NewEnergyComponent } from './new-energy/new-energy.component';
import { CaseStudyComponent } from './case-study/case-study.component';
import { BiomassOwnerComponent } from './new-energy/components/biomass-owner/biomass-owner.component';
import { BiomassTypeComponent } from './new-energy/components/biomass-type/biomass-type.component';

export const router : Routes = [
  
      { path : '' , redirectTo : '/biodeseuri' , pathMatch:'full' },
      { path : 'biodeseuri' , component: IntroComponent },
      { path : 'biodeseuri/benefits-for-moldova' , component: BenefitsComponent },
      { path : 'biodeseuri/procedure-and-services-for-farmers' , component: ProcedureAndServicesComponent },
      { path : 'biodeseuri/new-energy-from-waste' , component: NewEnergyComponent,
        children : [
          { path : 'login', component : IntroComponent },
          { path : 'biomass-owners',component : BiomassOwnerComponent},
          { path : 'biomass-type',component : BiomassTypeComponent}
        ] },
      { path : 'biodeseuri/case-study' , component: CaseStudyComponent }
    ]

