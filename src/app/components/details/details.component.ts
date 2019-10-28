import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {

  @Input() company;
  name = 'Angular';
  governancaArray = [];
  dadosEmpresaArray = [];
  analiseFundamentalistaArray = [];
  analiseFundamentalistaKeyArray = [];
  single = [];
  selectedChartData = 0;
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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor() { }

  ngAfterViewInit() {
    if (this.company && this.company.governanca && this.company.dados_da_empresa && this.company.analise_fundamentalista) {
      for (let key in this.company.governanca) {
        this.governancaArray.push({
          'key': key,
          'value': this.company.governanca[key]
        })
      }

      for (let key in this.company.dados_da_empresa) {
        this.dadosEmpresaArray.push({
          'key': key,
          'value': this.company.dados_da_empresa[key]
        })
      }

      for (let key in this.company.analise_fundamentalista[0]) {
        if(key !== 'Ano') {
          const data = {
            'name': key,
            'series': []
          }

          this.analiseFundamentalistaArray.push(data)
          this.analiseFundamentalistaKeyArray.push(key)
        }
      }

      this.company.analise_fundamentalista.forEach(analise => {
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
}
