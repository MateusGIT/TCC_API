import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {

  @Input() company;
  name = 'Angular';
  companyCopy;
  governancaArray = [];
  dadosEmpresaArray = [];
  analiseFundamentalistaArray = [];
  analiseFundamentalistaArrayTable = [];
  analiseFundamentalistaKeyArray = [];
  single = [];
  selectedChartData = 0;
  showContabeis = true;
  showGovernanca = true;
  showDados = true;
  public view: any[] = [800, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public xAxisLabel: "Anos";
  public yAxisLabel: "Valores";
  public colorScheme = {
    domain: ['#673ab7']
  }
  constructor() { }

  ngAfterViewInit() {
    if (this.company && this.company.governanca && this.company.dados_da_empresa && this.company.analise_fundamentalista) {
      this.companyCopy = this.company;
      this.companyCopy.analise_fundamentalista = this.company.analise_fundamentalista.slice(0);
      for (let key in this.company.governanca) {
        if(this.company.governanca[key] !== 'Link' && this.company.governanca[key] !== '-') {
          this.governancaArray.push({
            'key': key,
            'value': this.company.governanca[key]
          })
        }
      }

      for (let key in this.company.dados_da_empresa) {
        if(this.company.dados_da_empresa[key] !== 'Link') {
          this.dadosEmpresaArray.push({
            'key': key,
            'value': this.company.dados_da_empresa[key]
          })
        }
       
      }

      for (let key in this.companyCopy.analise_fundamentalista[0]) {
        if(key !== 'Ano') {
          const data = {
            'name': key,
            'series': []
          }

          this.analiseFundamentalistaArray.push(data)
          this.analiseFundamentalistaKeyArray.push(key)
        }
      }

      for (let key in this.company.analise_fundamentalista[0]) {
        if(key !== 'Ano') {
          const data = {
            'name': key,
            'series': []
          }

          this.analiseFundamentalistaArrayTable.push(data)
        }
      }
      this.company.analise_fundamentalista.forEach(analise => {
        for (let key in analise) {
          this.analiseFundamentalistaArrayTable.forEach(object => {
            if (object.name === key) {
              if(analise.Ano === '2T19') {
                analise.Ano = '2019'
              }
              
              object.series.push({
                'value': analise[key],
                'name': analise.Ano
              })
            }
          })
        }
      })

      this.companyCopy.analise_fundamentalista.forEach(analise => {
        for (let key in analise) {
          this.analiseFundamentalistaArray.forEach(object => {
            if (object.name === key) {
              if(analise.Ano === '2T19') {
                analise.Ano = '2019'
              }

              analise[key] = analise[key].replace('%', '')
              analise[key]= analise[key].replace('.', '')
              analise[key] = analise[key].replace(',', '.')
              
              object.series.push({
                'value': analise[key],
                'name': analise.Ano
              })
            }
          })
        }
      })


      this.single.push(this.analiseFundamentalistaArray[0]);
    }
  }

  public selectChartData() {
    this.single = [this.analiseFundamentalistaArray[this.selectedChartData]]
  }

  public showContabeisTable() {
    return this.showContabeis = true;
  }

  public hideContabeis() {
    return this.showContabeis = false;
  }


  public showDadosTable() {
    return this.showDados = true;
  }

  public hideDados() {
    return this.showDados = false;
  }


  public showGovernancaTable() {
    return this.showGovernanca = true;
  }

  public hideGovernanca() {
    return this.showGovernanca = false;
  }
}
