import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-tab',
  templateUrl: './page-tab.component.html',
  styleUrls: ['./page-tab.component.css']
})
export class PageTabComponent implements OnInit {

  tab_names = null;
  router_names = null;
  selected_tab = null;
  selected_tab_index = null;

  @Output() tabTrigger = new EventEmitter<string>();

  constructor() { 
    this.tab_names = ["Global System Parameters", "Job Parameters", "All Jobs"];
    this.router_names = ['/global-settings', '/job-settings', '/all-jobs'];

    this.selected_tab_index = window.location.pathname == '/'
      ? 0
      : this.router_names.indexOf(window.location.pathname);

    this.selected_tab = this.tab_names[this.selected_tab_index];    

  }

  switchTabs(event) {
    var target = event.target;

    if (target.tagName == "SPAN") {
      target = target.parentElement;
    }

    //add selected style to selected tab
    var oldSelectedTab = document.getElementsByClassName('selected-page-tab')[0];
    oldSelectedTab.classList.remove('selected-page-tab');
    target.classList.add('selected-page-tab')

    //update tab header title
    var selectedIndex = target.getAttribute('data-tab-index');    
    this.selected_tab = this.tab_names[selectedIndex];

    //update page contents
    this.tabTrigger.emit(this.router_names[selectedIndex]);
  }

  ngOnInit(): void {}

}
