import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Insurance } from '../models/insurance.model';
import { InsuranceService } from '../services/insurance.model';
import { InsuranceEditDialogComponent } from '../insurance-edit-dialog/insurance-edit-dialog.component';

@Component({
  selector: 'app-insurance-table',
  templateUrl: './insurance-table.component.html',
  styleUrls: ['./insurance-table.component.css']
})
export class InsuranceTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'homeType',
    'fullAddress',
    'occupancyType',
    'insuranceType',
    'protections',
    'actions'
  ];
  dataSource = new MatTableDataSource<Insurance>([]);
  loading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private insuranceService: InsuranceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInsurances();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadInsurances(): void {
    this.loading = true;
    this.insuranceService.getAllInsurances().subscribe({
      next: (insurances) => {
        this.dataSource.data = insurances;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load insurances. Please try again.';
        this.loading = false;
        console.error('Error loading insurances:', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteInsurance(id: number): void {
    if (confirm('Are you sure you want to delete this insurance entry?')) {
      this.insuranceService.deleteInsurance(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
          // Refresh the table
          this.loadInsurances();
        },
        error: (error) => {
          console.error('Error deleting insurance:', error);
          this.error = 'Failed to delete insurance. Please try again.';
        }
      });
    }
  }

  editInsurance(insurance: Insurance): void {
    const dialogRef = this.dialog.open(InsuranceEditDialogComponent, {
      width: '700px',
      data: { ...insurance }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.insuranceService.updateInsurance(result.id!, result).subscribe({
          next: (updatedInsurance) => {
            // Find and replace the updated item in the data source
            const index = this.dataSource.data.findIndex(item => item.id === updatedInsurance.id);
            if (index !== -1) {
              const updatedData = [...this.dataSource.data];
              updatedData[index] = updatedInsurance;
              this.dataSource.data = updatedData;
            }
          },
          error: (err) => {
            console.error('Error updating insurance:', err);
            this.error = 'Failed to update insurance. Please try again.';
          }
        });
      }
    });
  }

  createNewInsurance(): void {
    const dialogRef = this.dialog.open(InsuranceEditDialogComponent, {
      width: '700px',
      data: {
        homeArea: 0,
        numberOfRooms: 1,
        homeType: 'APARTMENT',
        yearOfConstruction: new Date().getFullYear() - 5,
        fullAddress: '',
        occupancyType: 'PRIMARY_RESIDENCE',
        insuredFurnitureValue: 0,
        alarmSystem: false,
        antiTheftProtection: false,
        glassProtection: false,
        waterDamageProtection: false,
        fireExplosionProtection: false,
        naturalDisasterProtection: false,
        civilLiabilityProtection: false,
        emergencyAssistance: false,
        newValueProtection: false,
        electricalDamageProtection: false,
        insuranceType: 'PARTICULAR'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.insuranceService.createInsurance(result).subscribe({
          next: (newInsurance) => {
            this.dataSource.data = [...this.dataSource.data, newInsurance];
            // Refresh the table after adding a new entry
            this.loadInsurances();
          },
          error: (err) => {
            console.error('Error creating insurance:', err);
            this.error = 'Failed to create insurance. Please try again.';
          }
        });
      }
    });
  }

  getProtectionsText(insurance: Insurance): string {
    if (!insurance) return 'None';

    const protections = [];
    if (insurance.antiTheftProtection) protections.push('Anti-Theft');
    if (insurance.glassProtection) protections.push('Glass');
    if (insurance.waterDamageProtection) protections.push('Water Damage');
    if (insurance.fireExplosionProtection) protections.push('Fire');
    if (insurance.naturalDisasterProtection) protections.push('Natural Disaster');
    if (insurance.civilLiabilityProtection) protections.push('Civil Liability');
    if (insurance.emergencyAssistance) protections.push('Emergency');
    if (insurance.newValueProtection) protections.push('New Value');
    if (insurance.electricalDamageProtection) protections.push('Electrical');

    return protections.length > 0 ? protections.join(', ') : 'None';
  }

  formatOccupancyType(type: string): string {
    return type.replace(/_/g, ' ');
  }
}
