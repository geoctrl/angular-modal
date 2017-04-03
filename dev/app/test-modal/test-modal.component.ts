
import { Component, Input } from "@angular/core";
import { ModalService } from "../../../src/modal.service";

@Component({
  template: `
<div>
    <div class="modal__header">
        Confirm This Thing
    </div>
    <div class="modal__body">
        This is where you confirm the thing.
    </div>
    <div class="modal__footer">
        <button class="btn btn--primary" (click)="confirm()">Confirm</button>
        <button class="btn btn--accent" (click)="cancel()">Cancel</button>
    </div>
</div>
`
})
export class TestModalComponent {
  constructor(private modalService: ModalService) {

  }

  @Input() data;

  confirm() {
    this.modalService.submit('submitted');
  }
  cancel() {
    this.modalService.cancel('cancelled');
  }
}