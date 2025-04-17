import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ApplicationService } from 'src/app/services/services/application.service';
import { JobOfferService } from 'src/app/services/services/job-offer.service';
import { ChartData, ChartOptions } from 'chart.js'; 
import { BaseChartDirective } from 'ng2-charts';  // Import BaseChartDirective to update the chart

@Component({
  selector: 'app-job-applications-chart',
  templateUrl: './job-applications-chart.component.html',
  styleUrls: ['./job-applications-chart.component.css']
})
export class JobApplicationsChartComponent implements OnInit, AfterViewChecked {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Data for Job Offers Chart
  jobOfferChartData: ChartData<'bar'> = {
    labels: [],  // Job Offer Titles
    datasets: [
      {
        label: 'Number of Job Offers',
        data: [],  // Count of Job Offers
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  jobOfferChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  // Data for Applications Chart
  applicationChartData: ChartData<'bar'> = {
    labels: [],  // Job Offer Titles
    datasets: [
      {
        label: 'Number of Applications',
        data: [],  // Count of Applications
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  applicationChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  constructor(
    private applicationService: ApplicationService,
    private jobOfferService: JobOfferService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  // Called after the view is checked, triggers chart update
  ngAfterViewChecked(): void {
    if (this.chart) {
    }
  }

  loadChartData(): void {
    this.applicationService.getAllApplications().subscribe(applications => {
      this.jobOfferService.getAllJobOffers().subscribe(jobOffers => {
        // Job Offers chart
        this.jobOfferChartData.labels = jobOffers.map(offer => `${offer.jobTitle} (${offer.companyName})`);
        this.jobOfferChartData.datasets[0].data = jobOffers.map(offer => offer.id || 0);  // Ensure no undefined
  
        // Applications chart
        this.applicationChartData.labels = jobOffers.map(offer => `${offer.jobTitle} (${offer.companyName})`);
        this.applicationChartData.datasets[0].data = jobOffers.map(offer => {
          // Count applications related to each job offer
          const applicationCount = applications.filter(app => app.jobOffer?.id === offer.id).length;
          return applicationCount || 0;  // Ensure no undefined
        });
  
        // Trigger change detection to ensure the chart updates
        this.cdr.detectChanges();
      });
    });
  }
  
}
