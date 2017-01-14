import { Component } from '@angular/core';
import { ModalService } from "../../src/modal.service";
import { TestModalComponent } from "./test-modal/test-modal.component";

@Component({
  selector: 'app',
  template: `
<div>This is the App</div>
<button class="btn btn--primary" (click)="openModal()">Open Modal</button>
<modal></modal>
`,

})
export default class {
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.open(TestModalComponent, {
      data: 'hey hey hey'
    }).subscribe(
        res => {
          console.log(res)
        },
        err => err
    );
  }
}