import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, Subject } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FoodTrucksService } from '../services/foodTruck.service';

@Component({
  selector: 'app-food-truck',
  templateUrl: './food-truck.component.html',
  styleUrls: ['./food-truck.component.scss'],
})
export class FoodTruckComponent implements OnInit {
  private ngUnsubscribe: any;
  FoodTrucks: any[] = [];
  perfiles: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  rowProducto: any;
  SpinnerLoading: boolean = false;
  filter: any[];
  Dias = [
    { id: 1, nombre: 'Lunes' },
    { id: 2, nombre: 'Martes' },
    { id: 3, nombre: 'Miercoles' },
    { id: 4, nombre: 'Jueves' },
    { id: 5, nombre: 'Viernes' },
    { id: 6, nombre: 'Sabado' },
    { id: 7, nombre: 'Domingo' },
  ];

  public formFecha: FormGroup;
  public DiaSeleccion:  any;
  public HoraSeleccion:  any;
  permisosKanban: any;
  isLoading: boolean;
  //DiasCtrl: FormControl = new FormControl();
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  colDetalles: string[] = ['applicant', 'location'];
  public searching = false;
  public perfilFilter: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  constructor(
    private FoodTrucksService: FoodTrucksService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.isLoading = true;
    // this.SpinnerLoading = true;
    this.reactiveForm();
  }

  reactiveForm() {
    this.formFecha = this.formBuilder.group({
      hora: ['', [Validators.required]],
      dia: ['', [Validators.required]],
    });
  }

  selectDay(data: any)
  {
    this.DiaSeleccion = data.value;
  }

  consultaFoodTruck() {
    if(this.formFecha.valid)
    {
      var fecha = "2022/01/01 " + this.HoraSeleccion  + ":00"
      console.log(fecha);
      this.isLoading = true;
      this.SpinnerLoading = true;
      this.ngUnsubscribe = this.FoodTrucksService.getFoodTrucks(this.DiaSeleccion, fecha).subscribe(
        (data: any) => {
          this.FoodTrucks = data;
          this.dataSource = new MatTableDataSource<any>(this.FoodTrucks);
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
          this.SpinnerLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.SpinnerLoading = false;
        }
      );
    }
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }

  applyFilter(target: any) {
    let filterValue = target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
