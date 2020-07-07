import { Component, OnInit, Input, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-channel-data',
  templateUrl: './channel-data.component.html',
  styleUrls: ['./channel-data.component.css']
})

export class ChannelDataComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  @Input() channel: string = 'default';

  components = [];
  channel_data = null;

  constructor(private api : APIService, private componentFactoryResolver: ComponentFactoryResolver, private changeDetector : ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.channel)
  }

  ngAfterViewInit()	{
    this.prepareForExpansion(this.channel);
  }

  prepareForExpansion(channel) {
    this.channel_data = this.api.getChannelData(this.channel['name']);

    console.log(this.channel_data);

    for (var i = 0; i < this.channel_data["count"]; i++) {
      this.addComponent(TableComponent, i);
    }
  }

  addComponent(componentClass: Type<any>, index: number) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);
    component.instance.list = this.channel_data["data"][index];

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
