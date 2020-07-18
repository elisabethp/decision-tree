import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-state',
  templateUrl: './page-state.component.html',
  styleUrls: ['./page-state.component.css']
})
export class PageStateComponent implements OnInit {

  @Input() isLoaded = false;
  @Input() notFound = false;
  @Input() serverError = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
