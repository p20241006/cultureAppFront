import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {UiService} from "../common/ui.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  uiService = inject(UiService)

  handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.warn('Error del cliente o red:', error.error.message);
    } else {
      console.warn(`Código de error del servidor: ${error.status}, ` + `Mensaje: ${error.message}`);
    }

    const errorMessage = this.getFriendlyErrorMessage(error);
    return throwError(() => new Error(errorMessage));
  }

  private getFriendlyErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Error de conexión. Verifique su red e intente de nuevo.';
      case 404:
        return 'Recurso no encontrado. Verifique la URL o el recurso.';
      case 500:
        return 'Error en el servidor. Intente nuevamente más tarde.';
      default:
        return 'Ocurrió un error inesperado. Intente de nuevo.';
    }
  }
}
