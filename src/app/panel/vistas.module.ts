import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistasRoutingModule } from './vistas-routing.module';
import { MaterialModule } from '../components/material/material.module';
import { PanelComponent } from './panel.component';
//import { MsalModule } from '@azure/msal-angular';
import { NavComponent } from '../nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginator } from '../shared/helpers/paginator.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const MY_FORMATS = {
  display: {
    dateInput: 'DD-MM-yyyy',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'yyyy',
  },
};

@NgModule({
  declarations: [
    PanelComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    VistasRoutingModule,
    MaterialModule,
    //MsalModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MatPaginatorIntl, useValue: getPaginator() },
  ]
})
export class VistasModule { }
