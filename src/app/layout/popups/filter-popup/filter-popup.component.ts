import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/app/shared/modal.component';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.css', '/src/app/shared/modal.component.css']
})
export class FilterPopupComponent extends Modal implements OnInit {

  data = null;
  filters = [];
  frequent_keys = ["jobsubjobid", "owner", "sccountinggroup", "args"]

  constructor() { super() }

  ngOnInit(): void {
    this.filters = this.data['filters']
  }

  onConfirm() {
    var keyInput : any;
    var valueInput : any


    keyInput = document.getElementById('key-input');
    valueInput = document.getElementById('value-input');

    if (keyInput.value.length != 0 && valueInput.value.length != 0) {
      this.filters.push({
        "key": keyInput.value, 
        "value": valueInput.value 
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
      this.close();
    }
    else {
      if (keyInput.value.length == 0) {
        keyInput.classList.add('error-input');
      }
      if (valueInput.value.length == 0) {
        valueInput.classList.add('error-input');
      }
    }
  }

}
