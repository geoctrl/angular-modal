# Modal

Dynamic modals and dialogs.

### Install

Install the component:

    npm install @geocompy/angular-modal --save


Add the ModalModule to your root module:

```typescript
import { NgModule } from '@angular/core';
import { ModalModule } from '@geocompy/angular-modal';
 
@NgModule({
  imports: [
    ModalModule
  ]
})
export class RootModule {}
```

Add the `<modal>` component to your app (this is your modal outlet):

```typescript
import { Component } from '@angular/core';
    
@Component({
  selector: 'app',
  template: `
<div>This is the app</div>
<modal></modal>
`,

})
export class AppComponent {}
```

### Open Modal

There's a couple things to keep in mind:

- The ModalComponent is controlled by the ModalService (so you can access it from anywhere)
- The ModalService requires that a component be passed to it

```typescript
import { Component } from '@angular/core';
import { SomeComponent } from './some.component';
import { ModalService } from '@geocompy/angular-modal';

@Component({
  selector: 'example',
  template: `
<button (click)="open()">Open Some Modal</button>  
`
})
export class ExampleComponent {
  constructor(private modalService: ModalService) {}
  
  open() {
    let modalObservable = modalService.open(SomeComponent);
    
    modalObservable.subscribe(
        next => console.log('modal submit'),
        err => console.log('modal cancel')
    );
  }
}
```

### Control Modal

Create a component for use from within the modal:

```typescript
import { Component, Input } from "@angular/core";
import { ModalService } from "@geocompy/angular-modal";


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
  constructor(private modalService: ModalService) {}

  confirm() {
    this.modalService.submit('submitted');
  }
  cancel() {
    this.modalService.cancel('cancelled');
  }
}
```
