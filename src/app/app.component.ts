import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { ModifyPopupComponent } from './layout/modify-popup/modify-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;

  components = [];
  modifyModalClass = ModifyPopupComponent;

  constructor(private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

  onActivate(elementRef) {
    elementRef.openModalTrigger.subscribe(event => {
      if (event == "modify") {
        this.addComponent(this.modifyModalClass);
      }
    });
  }

  navigate(event) {
    this.router.navigate([event]);
  }

  addComponent(componentClass: Type<any>) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  removeComponent(componentClass: Type<any>) {
    // Find the component
    const component = this.components.find((component) => component.instance instanceof componentClass);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this.container.remove(this.container.indexOf(component));
      this.components.splice(componentIndex, 1);
    }
  }
}
