import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CompanyInsurance } from '../models/company-insurance.model';
import { CompanyInsuranceService } from '../services/company-insurance.service';
import { CompanyInsuranceEditDialogComponent } from '../company-insurance-edit-dialog/company-insurance-edit-dialog.component';

@Component({
  selector: 'app-company-insurance-table',
  templateUrl: './company-insurance-table.component.html',
  styleUrls: ['./company-insurance-table.component.css']
})
export class CompanyInsuranceTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'companyName',
    'industrySector',
    'numberOfEmployees',
    'typeOfInsuranceRequired',
    'insuranceOptions',
    'actions'
  ];
  dataSource = new MatTableDataSource<CompanyInsurance>([]);
  loading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private companyInsuranceService: CompanyInsuranceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCompanyInsurances();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCompanyInsurances(): void {
    this.loading = true;
    this.companyInsuranceService.getAllCompanyInsurances().subscribe({
      next: (insurances) => {
        this.dataSource.data = insurances;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load company insurances. Please try again.';
        this.loading = false;
        console.error('Error loading company insurances:', err);
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

  deleteCompanyInsurance(id: number): void {
    if (confirm('Are you sure you want to delete this company insurance?')) {
      this.companyInsuranceService.deleteCompanyInsurance(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
          // Refresh the table
          this.loadCompanyInsurances();
        },
        error: (error) => {
          console.error('Error deleting company insurance:', error);
          this.error = 'Failed to delete company insurance. Please try again.';
        }
      });
    }
  }

  editCompanyInsurance(insurance: CompanyInsurance): void {
    const dialogRef = this.dialog.open(CompanyInsuranceEditDialogComponent, {
      width: '700px',
      data: { ...insurance }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyInsuranceService.updateCompanyInsurance(result.id!, result).subscribe({
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
            console.error('Error updating company insurance:', err);
            this.error = 'Failed to update company insurance. Please try again.';
          }
        });
      }
    });
  }

  createNewCompanyInsurance(): void {
    const dialogRef = this.dialog.open(CompanyInsuranceEditDialogComponent, {
      width: '700px',
      data: {
        companyName: '',
        industrySector: '',
        taxRegistrationNumber: '',
        headOfficeAddress: '',
        businessPremisesSize: 0,
        numberOfEmployees: 0,
        valueOfProfessionalEquipment: 0,
        premisesOccupationType: 'OWNER',
        typeOfInsuranceRequired: 'MULTI_RISK',
        presenceOfSecuritySystem: false,
        insuranceOptions: {
          FIRE_COVERAGE: false,
          THEFT_COVERAGE: false,
          LIABILITY_COVERAGE: false,
          NATURAL_DISASTER_COVERAGE: false
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyInsuranceService.createCompanyInsurance(result).subscribe({
          next: (newInsurance) => {
            this.dataSource.data = [...this.dataSource.data, newInsurance];
            // Refresh the table after adding a new entry
            this.loadCompanyInsurances();
          },
          error: (err) => {
            console.error('Error creating company insurance:', err);
            this.error = 'Failed to create company insurance. Please try again.';
          }
        });
      }
    });
  }

  getInsuranceOptionsText(options: any): string {
    if (!options) return 'None';
    return Object.entries(options)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key.replace(/_/g, ' '))
      .join(', ');
  }
}
