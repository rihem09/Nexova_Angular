import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importation des composants
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

const routes: Routes = [
  { path: '', component: IndexComponent }, // Page d'accueil
  { path: 'about', component: AboutComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'claims', component: ClaimsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'damage', component: DamageComponent },
  { path: 'espace-client', component: EspaceClientComponent },
  { path: 'event', component: EventComponent },
  { path: 'feature', component: FeatureComponent },
  { path: 'get-a-quote', component: GetAQuoteComponent },
  { path: 'news', component: NewsComponent },
  { path: 'particulier', component: ParticulierComponent },
  { path: 'professionnel', component: ProfessionnelComponent },
  { path: 'retirement', component: RetirementComponent },
  { path: 'savings', component: SavingsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'testimonial', component: TestimonialComponent },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./BackOffice/backoffice.module').then(m => m.BackOfficeModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }