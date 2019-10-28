import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponentComponent {

  constructor(private companyService: CompanyService) { }
  @ViewChild('input', {static: false}) companyInput: ElementRef;
  companyArray: Array<{}>;

  @Output() onCompanySelected  = new EventEmitter();
  loading = false;

  private searchCompany() {
    this.loading = true;
    const name = this.companyInput.nativeElement.value.trim();
    if (!name || name.lnegth) {
      return;
    }
    this.companyService.search({ name }).subscribe(search => {
      this.companyArray = search.res;
      this.loading = false;
    }, err => this.loading = false);
  }

  public selectCompany (index) {
    const company = this.companyArray[index];
    this.onCompanySelected.emit(company);
  }
}
