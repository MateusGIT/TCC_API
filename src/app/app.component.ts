import { CdkTreeModule } from '@angular/cdk/tree';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tcc';
  company: object;
  showDetails = false;
  
  constructor(private cdRef : ChangeDetectorRef) {

  }

  public getDetails(company) {
    this.company = company;
    this.toggleDetails();
  }

  public toggleDetails() {
    this.showDetails = !this.showDetails;
    this.cdRef.detectChanges();
  }
}
