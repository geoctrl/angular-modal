
import { Component, Input } from "@angular/core";
import { ModalService } from "../../../src/modal.service";

@Component({
  template: `
<div class="modal">
    <div class="modal-header">
        Confirm This Thing
    </div>
    <div class="modal-body">
        This is where you confirm the thing.
    </div>
    <div class="modal-footer">
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