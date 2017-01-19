# Modal

Extend your application outside of it's context - add smart confirmations and dialogs.

### Dependencies

- `@pierian/global-styles` [here](https://bitbucket.pieriandx.com/projects/PDXFE/repos/global-styles)
- `@pierian/utilities` [here](https://bitbucket.pieriandx.com/projects/PDXFE/repos/utilities)

### Install

Install the component:

    npm install @pierian/modal --save

Add the `<modal>` component to the `AppModule` (the root component):

    import { Component } from '@angular/core';
        
    @Component({
      selector: 'app',
      template: `
    <div>This is the app</div>
    <modal></modal>
    `,
    
    })
    export class AppComponent {}

