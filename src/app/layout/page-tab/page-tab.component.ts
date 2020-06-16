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
  
  search_bar = null;
  search_input = null;

  @Output() tabTrigger = new EventEmitter<string>();

  constructor() { 
    this.tab_names = ["Global System Parameters", "Job Parameters", "All Jobs"];
    this.router_names = ['/global-settings', '/job-settings', '/all-jobs'];

    console.log(window.location.pathname.includes(this.router_names[1]));
    this.selected_tab_index = this.matchRoute();

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
    
    //show search bar?
    this.isSearchEnabled();

    //update page contents
    this.tabTrigger.emit(this.router_names[selectedIndex]);
  }

  isSearchEnabled() {
    var isJobParameters = this.selected_tab == "Job Parameters"; 
    
    if (isJobParameters) {
      this.search_bar.style.visibility = "visible";
    }
    else {
      this.search_bar.style.visibility = "hidden";
    }
  }

  performSearch(event) {
    var id = this.search_input.value;
    // if id is empty return red box?
    this.tabTrigger.emit(this.router_names[1] + '/' + id);
  }

  matchRoute(): number {
    var path = window.location.pathname; 
    var index = 0;

    for (var route in this.router_names){
      if (path.includes(this.router_names[route])) {
        index = this.router_names.indexOf(this.router_names[route]);
      }
    }

    return index;
  }
  
  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.search_bar = document.getElementById('search-wrapper');    
    this.isSearchEnabled();

    this.search_input = document.getElementById("search-input");
  }

}
