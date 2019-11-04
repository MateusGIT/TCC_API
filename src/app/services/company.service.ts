import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyService {
  uri = 'http://ec2-54-89-178-141.compute-1.amazonaws.com:4000/company';

  constructor(private http: HttpClient) { }

  public search({ name }): Observable<any> {
    return this.http.get(`${this.uri}/${name}`);
  }

}
