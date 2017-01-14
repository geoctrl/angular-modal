import {Injectable} from "@angular/core";

@Injectable()
export class ModalService {

  modalComponent;

  passComponent(modalComponent) {
    // confirm methods
    if (modalComponent.open &&
        modalComponent.submit &&
        modalComponent.cancel) {
      this.modalComponent = modalComponent;
    } else {
      throw Error('[ModalService] must be initialized with Component containing open, close and cancel methods.')
    }
  }

  open(component, config={}) {
    return this.modalComponent.open(component, config);
  }

  submit(data = null) {
    return this.modalComponent.submit(data);
  }

  cancel(data = null) {
    return this.modalComponent.cancel(data);
  }
}