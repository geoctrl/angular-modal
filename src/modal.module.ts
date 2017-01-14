import { NgModule } from '@angular/core';
import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";

@NgModule({
    declarations: [ ModalComponent ],
    providers: [ ModalService ],
    exports: [ ModalComponent ]
})
export class ModalModule {}