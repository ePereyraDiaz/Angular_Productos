import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, Subject } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

export class ProductosComponent implements OnInit {
  private ngUnsubscribe: any;
  closeModal: any = '';
  productos: any[] = [];
  perfiles: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  rowProducto: any;
  SpinnerLoading: boolean = false;
  filter: any[];

  public AddProduct = {
    nombre: '',
    descripcion: '',
    restriccionEdad: 0,
    compania: ''
  };

  public EditProduct = {
    id: 0,
    nombre: '',
    descripcion: '',
    restriccionEdad: 0,
    compania: ''
  };

  public formAddProduct: FormGroup;
  permisosKanban: any;
  isLoading: boolean;

  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  colDetalles: string[] = ['nombre', 'descripcion', 'restriccionEdad', 'compania', 'acciones'];
  public searching = false;
  public perfilFilter: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private ProductosService: ProductosService,
    public formBuilder: FormBuilder,
    private swalService: AlertService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.SpinnerLoading = true;
    this.getProductos();
  }

  getProductos() {
    this.isLoading = true;
    this.SpinnerLoading = true;
    this.ngUnsubscribe = this.ProductosService.getProductos()
    .subscribe(
      (data: any) => {
        this.reactiveForm();
        this.productos = data;
        this.dataSource = new MatTableDataSource<any>(this.productos);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        this.SpinnerLoading = false;
      },
      (error) => {
      }
    );
  }

  reactiveForm() {
    this.formAddProduct = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      restriccionEdad: [0, []],
      compania: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    if(this.formAddProduct)
    {
      this.formAddProduct.reset();
    }
    this.ngUnsubscribe.unsubscribe();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formAddProduct.controls;
  }

  onSelect(producto: any) {
    this.rowProducto = producto;
    this.EditProduct.id = producto.id;
    this.EditProduct.nombre = producto.nombre;
    this.EditProduct.descripcion = producto.descripcion;
    this.EditProduct.restriccionEdad = producto.restriccionEdad;
    this.EditProduct.compania = producto.compania;
  }

  agregarProducto() {
      if (this.formAddProduct.valid == false) {
        return;
      }
      this.modalService.dismissAll();
      this.SpinnerLoading = true;
      this.ProductosService.AgregarProductos(this.AddProduct).subscribe(
        (res) => {
          if (res.bitResultado == true) {
            this.swalService.Alert('success','CORRECTO', res.vchMensaje)
            .then((result) => {
              this.SpinnerLoading = false;
              this.getProductos();
              this.AddProduct = {
                nombre: '',
                descripcion: '',
                restriccionEdad: 0,
                compania: '',
              };
              this.formAddProduct.reset();
              this.modalService.dismissAll();
            });
          } else {}
        },
        (err) => {}
      );
  }

  editarProducto() {
      if (this.formAddProduct.valid == false) {
        return;
      }
      this.modalService.dismissAll();
      this.SpinnerLoading = true;
      this.ProductosService.editarProducto(this.EditProduct).subscribe(
        (res) => {
          if (res.bitResultado == true) {
            this.swalService.Alert('success','CORRECTO', res.vchMensaje)
            .then((result) => {
              this.SpinnerLoading = false;
              this.getProductos();
            });
          } else {
          }
        },
        (err) => {
        }
      );
  }

  eliminarProducto(Producto: any) {
      this.swalService.VerifyConfirm('question', '¿Eliminar Producto?', 'Eliminar por completo el Producto')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.modalService.dismissAll();
          this.SpinnerLoading = true;
          this.ProductosService.eliminarProducto(Producto).subscribe(
            (res) => {
              if (res.bitResultado == true) {
                this.swalService.Alert('success','PRODUCTOS', res.vchMensaje)
               .then((result) => {
                this.SpinnerLoading = false;
                  this.getProductos();
                });
              } else {}
            },
            (err) => {}
          );
        }
      });
  }

  modalEditOpen(contenido: any) {
    this.modalService.open(contenido, {
      backdrop: 'static',
      keyboard: false,
    });
  }

  triggerModal(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        keyboard: false,
      })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  applyFilter(target: any) {
    let filterValue = target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
