import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-popup',
  templateUrl: './modify-popup.component.html',
  styleUrls: ['./modify-popup.component.css']
})
export class ModifyPopupComponent implements OnInit {

  constructor() { }

  validate() {
    var visibleContent = document.getElementById('modify-content');
    var invisibleContent = document.getElementById('modify-content-validate');

    visibleContent.style.display = 'none';
    invisibleContent.style.display = 'block'
  }

  ngOnInit(): void {
  }

}
