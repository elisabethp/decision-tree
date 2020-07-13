import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.css']
})
export class FilterPopupComponent implements OnInit {

  data = null;
  filters = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
    this.filters = this.data['filters']
  }

  onConfirm() {
    this.filters.push({
      "key": document.getElementById('key-input').value, 
      "value": document.getElementById('value-input').value 
    })

    var event = new CustomEvent(
      'all-job-page-click',
      { detail: {
          'switch-key': 'update-filters',
          'filters': this.filters
        } 
      }
    );
  
    document.dispatchEvent(event);
    this.onClose();
  }

  onClose() {
    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'close-modal',
        } 
      }
    );
  
    document.dispatchEvent(event);
  }

}
