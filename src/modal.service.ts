import { Observable } from "rxjs";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export class ModalService {

  modalComponent;

  passComponent(modalComponent) {
    this.modalComponent = modalComponent;
  }

  public open(component, config={}) {
    if (this.modalComponent) {
      return this.modalComponent.open(component, config);
    } else {
      throw Error(`[ModalService] Missing the <modal> component in the AppModule template.`);
    }
  }

  public submit(data = null) {
    return this.modalComponent.submit(data);
  }

  public cancel(data = null) {
    return this.modalComponent.cancel(data);
  }
}