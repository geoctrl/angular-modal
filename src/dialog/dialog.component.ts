import { Component, Input } from "@angular/core";
import { ModalService } from "../modal.service";

@Component({
  template: `
<div class="modal">
    <div class="modal-header">
        {{ data.header }}
    </div>
    <div class="modal-body">
        {{ data.body }}
    </div>
    <div class="modal-footer">
        <button class="btn btn--primary" (click)="submit()">{{ data.config.submitBtn }}</button>
        <button class="btn btn--accent" (click)="cancel()">{{ data.config.cancelBtn }}</button>
    </div>
</div>
`
})
export class DialogComponent {
  // @Input() data;

  @Input() data;

  constructor(private modalService: ModalService) { }

  submit() {
    this.modalService.submit();
  }

  cancel() {
    this.modalService.cancel();
  }

}