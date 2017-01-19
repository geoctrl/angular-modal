import { NgModule } from '@angular/core';
import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";
import { DialogService } from "./dialog/dialog.service";
import { DialogComponent } from "./dialog/dialog.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ModalComponent, DialogComponent ],
  providers: [ ModalService, DialogService ],
  entryComponents: [ DialogComponent ],
  exports: [ ModalComponent, DialogComponent ]
})
export class ModalModule {}