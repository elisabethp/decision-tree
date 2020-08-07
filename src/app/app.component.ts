import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { Router } from "@angular/router";

import { ModifyGlobalPopupComponent } from 'src/app/layout/popups/modify-global-popup/modify-global-popup.component';
import { ModifyJobPopupComponent } from 'src/app/layout/popups/modify-job-popup/modify-job-popup.component';
import { FilterPopupComponent } from 'src/app/layout/popups/filter-popup/filter-popup.component';

import { APIService } from 'src/app/api/api.service';
import { UserService } from 'src/app/auth/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;

  modifyJobModalClass = ModifyJobPopupComponent
  modifyGlobalModalClass = ModifyGlobalPopupComponent;
  filterModalClass = FilterPopupComponent;
  
  userService:UserService;
  user:any = "null";
  
  applicationError = false

  constructor(
    private router: Router, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private api: APIService) {
      
      this.api.getUserInfo()
        .then((data) => {
            this.userService = new UserService(data)
            this.user = this.userService.getUser()
        })
        .catch((error) =>{
          this.applicationError = true
          console.log(error)
        })
  }

  navigate(event) {
    this.router.navigate([event]);
  }

  addComponent(componentClass: Type<any>, modal_data) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    component.instance.data = modal_data
  }

  /* EVENT LISTENER */
  @HostListener('document:global-click', ['$event'])
  onGlobalClick(ev: any) {
    switch(ev.detail['switch-key']) {
      case 'channel-edit-row': {
        this.addComponent(this.modifyGlobalModalClass, ev.detail);
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
        this.container.clear();
        break;
      }
    }
  }
}
