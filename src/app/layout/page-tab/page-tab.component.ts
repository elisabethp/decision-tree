import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-tab',
  templateUrl: './page-tab.component.html',
  styleUrls: ['./page-tab.component.css']
})
export class PageTabComponent implements OnInit {

  tab_names = null;
  selected_tab = null;

  constructor() { 

    this.tab_names = ["Global System Parameters", "Job Parameters", "All Jobs"];
    this.selected_tab = this.tab_names[0];
    
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
    this.updatePage();
  }

  updatePage() {

  }

  ngOnInit(): void {}

}
