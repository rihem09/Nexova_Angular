import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CarInsurance } from '../models/car-insurance.model';
import { CarInsuranceService } from '../services/car-insurance.service';
import { CarInsuranceEditDialogComponent } from '../car-insurance-edit-dialog/car-insurance-edit-dialog.component';

@Component({
  selector: 'app-car-insurance-table',
  templateUrl: './car-insurance-table.component.html',
  styleUrls: ['./car-insurance-table.component.css']
})
export class CarInsuranceTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'make', 'model', 'year', 'power', 'fuelType', 'coverages', 'actions'];
  dataSource = new MatTableDataSource<CarInsurance>([]);
  loading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private carInsuranceService: CarInsuranceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCarInsurances();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCarInsurances(): void {
    this.loading = true;
    this.carInsuranceService.getAllCarInsurances().subscribe({
      next: (insurances) => {
        this.dataSource.data = insurances;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load car insurances. Please try again.';
        this.loading = false;
        console.error('Error loading car insurances:', err);
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

  deleteCarInsurance(id: number): void {
    if (confirm('Are you sure you want to delete this car insurance?')) {
      this.carInsuranceService.deleteCarInsurance(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
          // Refresh the table
          this.loadCarInsurances();
        },
        error: (error) => {
          console.error('Error deleting car insurance:', error);
          this.error = 'Failed to delete car insurance. Please try again.';
        }
      });
    }
  }

  editCarInsurance(carInsurance: CarInsurance): void {
    const dialogRef = this.dialog.open(CarInsuranceEditDialogComponent, {
      width: '600px',
      data: { ...carInsurance }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carInsuranceService.updateCarInsurance(result.id!, result).subscribe({
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
            console.error('Error updating car insurance:', err);
            this.error = 'Failed to update car insurance. Please try again.';
          }
        });
      }
    });
  }

  getCoveragesText(coverages: any): string {
    if (!coverages) return 'None';
    return Object.entries(coverages)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key.replace(/_/g, ' '))
      .join(', ');
  }
}
