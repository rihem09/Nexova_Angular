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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FeedbackComponent } from './FrontOffice/feedback/feedback.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FullCalendarModule } from '@fullcalendar/angular';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
     AboutComponent, AppointmentComponent, 
     ClaimsComponent, ContactComponent, DamageComponent, EspaceClientComponent, 
     EventComponent, FeatureComponent, GetAQuoteComponent, IndexComponent, NewsComponent, 
     ParticulierComponent, ProfessionnelComponent, RetirementComponent, SavingsComponent, 
     TeamComponent, TestimonialComponent, FeedbackComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxPaginationModule,
    FullCalendarModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
