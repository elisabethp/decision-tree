import { Component, OnInit, Input, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { GlobalTableComponent } from 'src/app/layout/tables/global-table/global-table.component';
import { APIService } from 'src/app/api/api.service';
import { LoadingComponent } from 'src/app/shared/loading.component'

@Component({
  selector: 'app-channel-data',
  templateUrl: './channel-data.component.html',
  styleUrls: ['./channel-data.component.css']
})

export class ChannelDataComponent extends LoadingComponent implements OnInit, OnChanges {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  @Input() channel: any = 'default';

  channel_data = null;
  
  constructor(private api : APIService, 
              private componentFactoryResolver: ComponentFactoryResolver, 
              private changeDetector : ChangeDetectorRef) { 
    super()
  }

  ngOnInit(): void {}

  ngAfterViewInit()	{
    this.prepareForExpansion(this.channel);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['channel']["firstChange"] == false){
      this.container.clear()
      this.prepareForExpansion(this.channel);
    }
  }

  prepareForExpansion(channel) {
    this.isLoaded = false;

    this.api.getChannelData(this.channel['name'])
      .then((data) => {
        this.isLoaded = true
        this.channel_data = data;
        
        for (var i = 0; i < this.channel_data["count"]; i++) {
          this.addComponent(GlobalTableComponent, i);
        }
      })
      .catch((error) => {
        console.log(error)
        this.notFound = error["notFound"]
        this.serverError = error["serverError"]
      });
  }

  addComponent(componentClass: Type<any>, index: number) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);
    
    component.instance.list = this.channel_data["data"][index];
    component.instance.channel = this.channel;

    this.changeDetector.detectChanges();
  }

}
