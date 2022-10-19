import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as Toastify from 'toastify-js'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastr: ToastrService
  ) { }

  //doble Swal [Cancelar][Aceptar]
  Confirm(type: any, title: any, text: any) {

    return new Promise((resolve, reject) => {
      var res = Swal.fire({
        position: 'center',
        title: title.toUpperCase(),
        text: text,
        icon: type,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#FF002B',
        cancelButtonColor: '#C4C4C4',
        confirmButtonText: 'ACEPTAR',
        cancelButtonText: 'CANCELAR',
        allowOutsideClick: false,
      });
      resolve(res);
    })
  }

  //simple Swal [Aceptar]
  Alert(type: any, title: any, text: any) {

    return new Promise((resolve, reject) => {
      var res = Swal.fire({
        position: 'center',
        icon: type,
        title: title.toUpperCase(),
        text: text,
        confirmButtonText: 'ACEPTAR',
        confirmButtonColor: '#FF002B',
        showConfirmButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
      });
      resolve(res);
    });
  }
  
  // extra simple sin botones
  Dialog(type: any, title: any , text: any ) {

    return new Promise((resolve, reject) => {
      var res = Swal.fire({
        position: 'center',
        icon: type,
        title: title.toUpperCase(),
        text: text,
        confirmButtonText: 'ACEPTAR',
        confirmButtonColor: '#FF002B',
        showConfirmButton: true,
        width: 400,
        // timer: 3500,
      });
      resolve(res);
    });
  }

//estar completamente seguro, doble confirmacion
  VerifyConfirm(type: any, title :any, text: any) {
    return new Promise(async (resolve, reject) => {

      var accept: boolean = false;
      var res = await Swal.fire({
        icon: type,
        position: 'center',
        title: title.toUpperCase() || '¿ESTAS SEGURO?',
        // text: extraInfo.toLowerCase()  || '',
        input: 'checkbox',
        inputValue: accept,
        inputPlaceholder:
          'Estoy de acuerdo en <strong>'+text+'</strong>.',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#FF002B',
        cancelButtonColor: '#C4C4C4',
        confirmButtonText: 'ACEPTAR',
        cancelButtonText: 'CANCELAR',
        allowOutsideClick: false,
        preConfirm : (value) => {
          if (!value) {
            Swal.showValidationMessage(
              '<i class="fa fa-info-circle"></i> Debe confirmar la casilla para continuar.'
            );
          }
        }
      });

      resolve(res);
    });
  }
  ///
  ///
  // TOASTER
showToastifyIntuitivo(txt: string) {
  Toastify({
    text: txt,
    close: true,
    duration: 4000,
    avatar: "assets/img/administrador.png",
    stopOnFocus: true,
    gravity: "top",
    position: "center"
    }).showToast();
}

  showToastify(type: string,txt: string, close?: boolean) {
      Toastify({
          text: txt,
          close: close,
          duration: close ? 7000: 3000,
          avatar: "assets/img/dalton_logo.png",
          style: {
            background: type == "warning" ? "linear-gradient(135deg, #ffc107, rgb(139 103 9))"  : type == "success" ? "linear-gradient(135deg, #6d9576, #3da755)": "linear-gradient(135deg, rgb(180 26 26), #8b1209)" ,
          },
        }).showToast();
    }

    showToastifyVerComo() {
      Toastify({
          text: "No puede realizar esta acción, mientras esté en modo Ver como.",
          avatar: "assets/img/dalton_logo.png",
          style: {
            background: "linear-gradient(135deg, #ffc107, rgb(139 103 9))",
          },
        }).showToast();
    }
  /////ngx
  showToasterVerComo(){
    this.clearToaster();
      this.toastr.warning("No puede realizar esta acción, mientras esté en modo <strong>Ver como</strong>.", "Acción inválida", {
        // timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: false,
        progressAnimation: 'decreasing',
        closeButton: true,
        disableTimeOut: true,
        enableHtml: true

      })
  }

  showToasterLog(title: string, message: string){
    this.clearToaster();
    this.toastr.info(message, title, {
      // timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: false,
      progressAnimation: 'decreasing',
      closeButton: true,
      disableTimeOut: true,
      enableHtml: true

    })
  }

  showToasterDetailInventary(title: string, message: string){
    this.clearToaster();
    this.toastr.warning(message, title, {
      timeOut: 4000,
      positionClass: 'toast-top-right',
    })
  }

  showToasterCxp(title: string, message: string){
    this.clearToaster();
    this.toastr.warning(message,title, {
      // timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: false,
      progressAnimation: 'decreasing',
      closeButton: false,
      disableTimeOut: false,
      enableHtml: true,
      newestOnTop: true

    })
  }
  clearToaster(){
    this.toastr.clear();
  }
}
