import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { ModifyPopupComponent } from './layout/modify-popup/modify-popup.component';
import { ModifyJobPopupComponent } from './layout/modify-job-popup/modify-job-popup.component';
import { FilterPopupComponent } from './layout/filter-popup/filter-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;
  
  @HostListener('document:global-click', ['$event'])
  onGlobalClick(ev: any) {
    switch(ev.detail['switch-key']) {
      case 'channel-edit-row': {
        console.log("channel-edit-row");
        this.addComponent(this.modifyModalClass, ev.detail);
        break;
      }
      case 'job-edit-row': {
        this.addComponent(this.modifyJobModalClass, ev.detail);
        break;
      }
      case 'add-job-filter': {
        this.addComponent(this.filterModalClass, ev.detail);
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

  modifyJobModalClass = ModifyJobPopupComponent
  modifyModalClass = ModifyPopupComponent;
  filterModalClass = FilterPopupComponent;

  constructor(private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

  navigate(event) {
    console.log(event)
    this.router.navigate([event]);
  }

  addComponent(componentClass: Type<any>, modal_data) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    component.instance.data = modal_data
  }

}
