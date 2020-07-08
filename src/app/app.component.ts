import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { ModifyPopupComponent } from './layout/modify-popup/modify-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;
  
  @HostListener('document:global-click', ['$event'])
  onOpenModal(ev: any) {
    console.log(ev);

    switch(ev.detail['switch-key']) {
      case 'channel-edit-row': {
        console.log("channel-edit-row");
        this.addComponent(this.modifyModalClass, ev.detail);
        break;
      }
      case 'job-edit-row': {
        console.log("job-edit-row");
        break;
      }
      case 'go-to-job': {
        this.navigate(ev.detail["url"])
        break;
      }
      case 'close-modal': {
        console.log("close-modal");
        this.container.clear();
        break;
      }
    }
  }

  //components = [];
  modifyModalClass = ModifyPopupComponent;

  constructor(private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

  navigate(event) {
    console.log(event)
    this.router.navigate([event]);
  }

  addComponent(componentClass: Type<any>, modal_data) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    component.instance.data = modal_data

    // Push the component so that we can keep track of which components are created
    //this.components.push(component);
  }

  /*removeComponent(componentClass: Type<any>) {
    // Find the component
    const component = this.components.find((component) => component.instance instanceof componentClass);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this.container.remove(this.container.indexOf(component));
      this.components.splice(componentIndex, 1);
    }
  }*/
}
