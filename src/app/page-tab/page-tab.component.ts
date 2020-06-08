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

    this.tab_names = ["Global Parameters", "Job Parameters", "All Jobs"];
    this.selected_tab = this.tab_names[0];

    for (var i = 0; i < this.tab_names.length; i++) {
      this.tab_names[i] = this.tab_names[i].toUpperCase()
    }
    

  }

  ngOnInit(): void {
  }

}
