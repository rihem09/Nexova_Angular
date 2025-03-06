<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importation des composants
import { AddassuranceComponent } from './Microservices/Assurances/addassurance/addassurance.component';
import { AboutComponent } from './FrontOffice/about/about.component';
import { AppointmentComponent } from './FrontOffice/appointment/appointment.component';
import { ClaimsComponent } from './FrontOffice/claims/claims.component';
import { ContactComponent } from './FrontOffice/contact/contact.component';
import { DamageComponent } from './FrontOffice/damage/damage.component';
import { EspaceClientComponent } from './FrontOffice/espace-client/espace-client.component';
import { EventComponent } from './FrontOffice/event/event.component';
import { FeatureComponent } from './FrontOffice/feature/feature.component';
import { GetAQuoteComponent } from './FrontOffice/get-a-quote/get-a-quote.component';
import { IndexComponent } from './FrontOffice/index/index.component';
import { NewsComponent } from './FrontOffice/news/news.component';
import { ParticulierComponent } from './FrontOffice/particulier/particulier.component';
import { ProfessionnelComponent } from './FrontOffice/professionnel/professionnel.component';
import { RetirementComponent } from './FrontOffice/retirement/retirement.component';
import { SavingsComponent } from './FrontOffice/savings/savings.component';
import { TeamComponent } from './FrontOffice/team/team.component';
import { TestimonialComponent } from './FrontOffice/testimonial/testimonial.component';
import { AssuranceListComponent } from './Microservices/Assurances/assurance-list/assurance-list.component';
=======
import {ReactiveFormsModule} from "@angular/forms";

;
import { TestimonialComponent } from './FrontOffice/testimonial/testimonial.component';
import { TeamComponent } from './FrontOffice/team/team.component';
import { SavingsComponent } from './FrontOffice/savings/savings.component';
import { RetirementComponent } from './FrontOffice/retirement/retirement.component';
import { ProfessionnelComponent } from './FrontOffice/professionnel/professionnel.component';
import { ParticulierComponent } from './FrontOffice/particulier/particulier.component';
import { NewsComponent } from './FrontOffice/news/news.component';
import { IndexComponent } from './FrontOffice/index/index.component';
import { GetAQuoteComponent } from './FrontOffice/get-a-quote/get-a-quote.component';
import { FeatureComponent } from './FrontOffice/feature/feature.component';
import { EventComponent } from './FrontOffice/event/event.component';
import { EspaceClientComponent } from './FrontOffice/espace-client/espace-client.component';
import { DamageComponent } from './FrontOffice/damage/damage.component';
import { ContactComponent } from './FrontOffice/contact/contact.component';
import { ClaimsComponent } from './FrontOffice/claims/claims.component';
import { AppointmentComponent } from './FrontOffice/appointment/appointment.component';
import { AboutComponent } from './FrontOffice/about/about.component'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Add this import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsuranceFormComponent } from './FrontOffice/insurance-form/insurance-form.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarInsuranceFormComponent } from './FrontOffice/car-insurance-form/car-insurance-form.component';
import { CompanyInsuranceFormComponent } from './FrontOffice/company-insurance-form/company-insurance-form.component';
import { CarInsuranceTableComponent } from './FrontOffice/car-insurance-table/car-insurance-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import { CarInsuranceEditDialogComponent } from './FrontOffice/car-insurance-edit-dialog/car-insurance-edit-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CompanyInsuranceTableComponent } from './FrontOffice/company-insurance-table/company-insurance-table.component';
import { CompanyInsuranceEditDialogComponent } from './FrontOffice/company-insurance-edit-dialog/company-insurance-edit-dialog.component';
import {MatSortModule} from "@angular/material/sort";
import { InsuranceTableComponent } from './FrontOffice/insurance-table/insurance-table.component';
import { InsuranceEditDialogComponent } from './FrontOffice/insurance-edit-dialog/insurance-edit-dialog.component';

>>>>>>> main

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    AddassuranceComponent,
    AboutComponent,
    AppointmentComponent,
    ClaimsComponent,
    ContactComponent,
    DamageComponent,
    EspaceClientComponent,
    EventComponent,
    FeatureComponent,
    GetAQuoteComponent,
    IndexComponent,
    NewsComponent,
    ParticulierComponent,
    ProfessionnelComponent,
    RetirementComponent,
    SavingsComponent,
    TeamComponent,
    TestimonialComponent,
    AssuranceListComponent
=======
     AboutComponent, AppointmentComponent, ClaimsComponent, ContactComponent, DamageComponent, EspaceClientComponent, EventComponent, FeatureComponent, GetAQuoteComponent, IndexComponent, NewsComponent, ParticulierComponent, ProfessionnelComponent, RetirementComponent, SavingsComponent, TeamComponent, TestimonialComponent, InsuranceFormComponent, CarInsuranceFormComponent, CompanyInsuranceFormComponent, CarInsuranceTableComponent, CarInsuranceEditDialogComponent, CompanyInsuranceTableComponent, CompanyInsuranceEditDialogComponent, InsuranceTableComponent, InsuranceEditDialogComponent
>>>>>>> main
  ],
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    FormsModule,
    CommonModule,
    RouterModule
=======
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule
>>>>>>> main
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
