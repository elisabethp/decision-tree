import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-tab',
  templateUrl: './page-tab.component.html',
  styleUrls: ['./page-tab.component.css']
})
export class PageTabComponent implements OnInit {

  tab_names = ["Global Parameters", "Job Parameters", "All Jobs"]

  constructor() { 

    

  }

  ngOnInit(): void {
  }

}
