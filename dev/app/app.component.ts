import { Component } from '@angular/core';
import { ModalService } from "../../src/modal.service";
import { TestModalComponent } from "./test-modal/test-modal.component";
import { DialogService } from "../../src/dialog/dialog.service";

@Component({
  selector: 'app',
  template: `
<div>This is the App</div>
<button class="btn btn--primary" (click)="openModal()">Open Modal</button>
<button class="btn btn--accent" (click)="openDialog()">Delete this thing</button>
<modal></modal>
`,

})
export default class {
  constructor(private modalService: ModalService, private dialogService: DialogService) {}

  openModal() {
    this.modalService.open(TestModalComponent, {
      data: 'hey hey hey'
    }).subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
    );
  }

  openDialog() {
    this.dialogService.open('This will delete all the things. Are you sure?', 'Delete', {
      submitBtn: 'Delete',
      cancelBtn: 'Cancel Yo',
      type: 'error'
    }).subscribe(
        res => console.log('submitted the dialog'),
        err => console.log('cancelled the dialog')
    );
  }
}