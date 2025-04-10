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
import { BackeventComponent } from './backevent/backevent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: BackOfficeComponent,
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
    ]},
    { path: 'backevent', component: BackeventComponent },
  
  // Add more routes here as needed
];

@NgModule({
  declarations: [
    BackOfficeComponent,
    BackeventComponent,
    
    // Add more components here as needed
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BackOfficeModule { }