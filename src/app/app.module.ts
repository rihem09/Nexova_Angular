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

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
