import { Injectable } from "@angular/core";
import { ModalService } from "../modal.service";
import { DialogComponent } from "./dialog.component";

@Injectable()
export class DialogService {
  constructor(private modalService: ModalService) { }

  open(body:string, header:string, config?:Object) {
    let defaultConfig = {
      submitBtn: 'Submit',
      cancelBtn: 'Cancel'
    };
    config || (config = {});
    config = Object.assign({}, defaultConfig, config);

    return this.modalService.open(DialogComponent, {
      data: { body, header, config }
    });
  }
}