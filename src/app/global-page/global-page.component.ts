import { Component, OnInit, Output, EventEmitter, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { TableComponent } from '../layout/table/table.component';
import { APIService } from '../api.service';

@Component({
  selector: 'app-global-page',
  templateUrl: './global-page.component.html',
  styleUrls: ['./global-page.component.css']
})
export class GlobalPageComponent implements OnInit {

  @Output() openModalTrigger = new EventEmitter<string>();
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  channelNames = null;
  components = [];

  selected_section = 0;
  selected_section_data = null;

  constructor(private api : APIService, private componentFactoryResolver: ComponentFactoryResolver, private changeDetector : ChangeDetectorRef) {
    this.channelNames = api.getChannelNames();
  }

  ngOnInit(): void {}

  ngAfterViewInit()	{
    this.prepareForExpansion(this.channelNames['data'][0].name);
  }

  toggleCollapse(event) {
    var target = event.target;

    /*if (target.getAttribute('data-type') == 'internal') {
      if (this.internalDataState == 0) {
        document.getElementById('internal-collapsible').style.display = 'block';
        target.classList.remove('fa-plus');
        target.classList.add('fa-minus');
        this.internalDataState = 1;
      }
      else {
        document.getElementById('internal-collapsible').style.display = 'none';
        target.classList.add('fa-plus');
        target.classList.remove('fa-minus');
        this.internalDataState = 0;
      }
    } 
    
    if (target.getAttribute('data-type') == 'external') {
      if (this.externalDataState == 0) {
        document.getElementById('external-collapsible').style.display = 'block';
        target.classList.remove('fa-plus');
        target.classList.add('fa-minus');
        this.externalDataState = 1;
      }
      else {
        document.getElementById('external-collapsible').style.display = 'none';
        target.classList.add('fa-plus');
        target.classList.remove('fa-minus');
        this.externalDataState = 0;
      }
    }*/

  }

  prepareForExpansion(channel) {
    this.selected_section_data = this.api.getChannelData(channel);

    console.log(this.selected_section_data);
    
    for (var i = 0; i < this.selected_section_data["count"]; i++) {
      this.addComponent(TableComponent, i);
    }
  }

  addComponent(componentClass: Type<any>, index: number) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);
    component.instance.list = this.selected_section_data["data"][index];

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
    this.changeDetector.detectChanges();
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
