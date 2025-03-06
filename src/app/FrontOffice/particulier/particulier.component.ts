import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CarInsuranceFormComponent} from "../car-insurance-form/car-insurance-form.component";
import {InsuranceFormComponent} from "../insurance-form/insurance-form.component";

@Component({
  selector: 'app-particulier',
  templateUrl: './particulier.component.html',
  styleUrls: ['./particulier.component.css']
})
export class ParticulierComponent {
  constructor(public dialog: MatDialog) {}

  services = [
    { title: 'Life Insurance', icon: 'img/icon/icon-10-light.png', description: 'Secure your future.', component: CarInsuranceFormComponent },
    { title: 'Vehicle Insurance', icon: 'img/icon/icon-08-light.png', description: 'Protect your car.', component: InsuranceFormComponent }
  ];

  openServiceDialog(component: any): void {
    this.dialog.open(component, { width: '1000px' });
  }
}
