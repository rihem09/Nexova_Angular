import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackOfficeComponent } from './back-office/back-office.component'; // Adjust the import according to your actual component
import { FormsComponent } from './forms/forms.component';
import { ChartsComponent } from './charts/charts.component';
import { ComponentsComponent } from './components/components.component';
import { IndexComponent } from './index/index.component';
import { MapsComponent } from './maps/maps.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { TablesComponent } from './tables/tables.component';
import { RetirementBackComponent } from './retirement-back/retirement-back.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';


const routes: Routes = [
  {
    path: '',
    
    children: [
      { path: '', component: BackOfficeComponent },
      {path: 'forms', component: FormsComponent},
      {path: 'charts', component: ChartsComponent},
      {path: 'components', component: ComponentsComponent},
      {path: 'index', component: IndexComponent},
      {path: 'maps', component: MapsComponent},
      {path: 'sidebar2', component: Sidebar2Component},
      
      {path: 'tables', component: TablesComponent},
     
      // Add more child routes here as needed
    ]
  },
  // Add more routes here as needed
];

@NgModule({
  declarations: [
    BackOfficeComponent,
    SearchPipe,
    RetirementBackComponent,
 
    // Add more components here as needed
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BackOfficeModule { }