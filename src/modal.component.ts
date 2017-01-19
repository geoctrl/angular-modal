import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostListener, Renderer } from '@angular/core';
import { ModalService } from "./modal.service";
import { deferObservable } from '@pierian/utilities';
import { Observable } from "rxjs";
const Velocity = require('velocity-animate');

@Component({
  selector: 'modal',
  template: `
<div class="modal-backdrop"
   [style.zIndex]="modalList.length"
   #backdrop></div>
<div #view></div>
  `
})
export class ModalComponent {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Escape' &&
        this.modalList.length > 0 &&
        this.modalList[this.modalList.length-1].config.escapeClose){
      this.cancel();
    }
  }

  @ViewChild('view', {read: ViewContainerRef}) view;
  @ViewChild('backdrop') backdrop;
  active: boolean = false;
  modalList = [];

  constructor(
      private resolver: ComponentFactoryResolver,
      private modalService: ModalService,
      private renderer: Renderer
  ) { }

  ngAfterContentInit() {
    this.modalService.passComponent(this);
  }

  /**
   * OPEN
   * @param component
   * @param config
   * @return {AsyncSubject}
   */
  open = function(component, config:any={}) {
    config = Object.assign({
      backdropClose: true,
      escapeClose: true
    }, config);

    // get component
    let componentRef = this.view.createComponent(
        this.resolver.resolveComponentFactory(component, {read: ViewContainerRef})
    );

    // use data as an @Input
    componentRef.instance.data = config.data;

    // create modal data observable
    let defer = deferObservable();

    this.modalList.push({
      component: componentRef,
      config: config,
      defer: defer,
      listener: this.renderer.listen(componentRef._nativeElement, 'click', this.backdropHandler.bind(this))
    });

    if (!this.active) {
      this.activate();
    }

    // if the component has 0 or 2+ children, throw error
    let children = componentRef.location.nativeElement.children.length;
    if (children == 0 || children >= 2) {
      throw Error(`[${component.name}] Must have only have 1 root child in the template.`);
    }

    // if the component doesn't have a .modal class, add one
    if (!componentRef.location.nativeElement.children[0].classList.contains('modal')) {
      componentRef.location.nativeElement.children[0].classList.add('modal');
    }
    this.animateModalIn(componentRef._nativeElement);
    return defer.observable;
  };

  /**
   * SUBMIT
   * @param data
   */
  submit = function(data: any = null) {
    this.close(true, data);
  };

  /**
   * CANCEL
   * @param data
   */
  cancel = function(data: any = null) {
    this.close(false, data);
  };

  /**
   * CLOSE
   * both submit and cancel close the modal
   * @param status
   * @param data
   */
  private close(status, data) {
    let index = this.modalList.length-1,
        modal = this.modalList[index];

    // remove modal from list
    this.modalList.splice(index, 1);

    // stop listening
    modal.listener();

    // defer (timeout ensures defer order + it's a cool animation)
    setTimeout(() => {
      modal.defer[status?'resolve':'reject'](data);
    }, index*100);

    // deactivate if all modals are closing
    if (this.modalList.length == 0) {
      this.deactivate();
    }

    // animate then detach component
    this.animateModalOut(modal.component._nativeElement, () => {
      this.view.detach(index);
    });
  }

  private animateModalIn(el) {
    el.classList.add('modal-parent');
    el.style.zIndex = this.modalList.length;
    Velocity(el.querySelector('.modal'), {
      translateY: [0, '-100%']
    }, {
      easing: 'easeOutSine',
      duration: 400
    });
  }

  private animateModalOut(el, cb) {
    Velocity(el.querySelector('.modal'), {
      translateY: ['-100%', 0]
    }, {
      easing: 'easeInSine',
      duration: 400,
      complete: () => cb()
    })
  }

  private activate() {
    document.body.classList.add('modal--active');
    Velocity(this.backdrop.nativeElement, {
      opacity: 1
    }, {
      display: 'block',
      easing: 'ease-out',
      duration: 400
    });
    this.active = true;
  };

  private deactivate() {
    Velocity(this.backdrop.nativeElement, {
      opacity: 0
    }, {
      display: 'none',
      easing: 'ease-in',
      duration: 500,
      complete: () => {
        document.body.classList.remove('modal--active');
      }
    });
    this.active = false;
  };

  private backdropHandler(e) {
    if (e.target.className == 'modal-parent' &&
        this.modalList.length > 0 &&
        this.modalList[this.modalList.length-1].config.backdropClose) {
      this.cancel()
    }
  }
}