import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackOfficeComponent } from './back-office/back-office.component';
import { FormsComponent } from './forms/forms.component';
import { ChartsComponent } from './charts/charts.component';
import { ComponentsComponent } from './components/components.component';
import { IndexComponent } from './index/index.component';
import { MapsComponent } from './maps/maps.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { TablesComponent } from './tables/tables.component';
import { InsuranceFormComponent } from "../FrontOffice/insurance-form/insurance-form.component";
import { CarInsuranceFormComponent } from "../FrontOffice/car-insurance-form/car-insurance-form.component";
import { CarInsuranceTableComponent } from "../FrontOffice/car-insurance-table/car-insurance-table.component";
import { CompanyInsuranceFormComponent } from "../FrontOffice/company-insurance-form/company-insurance-form.component";
import { CompanyInsuranceTableComponent } from "../FrontOffice/company-insurance-table/company-insurance-table.component";
import { InsuranceTableComponent } from "../FrontOffice/insurance-table/insurance-table.component";

const routes: Routes = [
  {
    path: '', // Changed from 'dashboard' to empty path since dashboard is already in AppRoutingModule
    component: BackOfficeComponent, // Add BackOfficeComponent as the component for this route
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' }, // Default to index when accessing dashboard
      { path: 'forms', component: FormsComponent },
      { path: 'charts', component: ChartsComponent },
      { path: 'components', component: ComponentsComponent },
      { path: 'index', component: IndexComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'sidebar2', component: Sidebar2Component },
      { path: 'tables', component: TablesComponent },
      { path: 'insurance', component: InsuranceFormComponent },
      { path: 'carinsurance', component: CarInsuranceFormComponent },
      { path: 'companyinsurance', component: CompanyInsuranceFormComponent },
      { path: 'tablecompanyinsurance', component: CompanyInsuranceTableComponent },
      { path: 'tableinsurance', component: InsuranceTableComponent },
      { path: 'tablecarinsurance', component: CarInsuranceTableComponent },
    ]
  },
];

@NgModule({
  declarations: [
    BackOfficeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BackOfficeModule { }
