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

  keyInput : any;
  valueInput : any
  type: any

  constructor() { super() }

  ngOnInit(): void {
    this.filters = this.data['filters']
  }

  onConfirm() {
    this.keyInput = document.getElementById('key-input');
    this.valueInput = document.getElementById('value-input');
    
    this.type = document.querySelectorAll('[data-edit-type]')[0];
    this.type = this.type.options[this.type.selectedIndex].value;

    if (this.keyInput.value.length != 0 && this.valueInput.value.length != 0 && this.validate()) {
      this.filters.push({
        "key": this.keyInput.value, 
        "value": this.valueInput 
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
      if (this.keyInput.value.length == 0) {
        this.keyInput.classList.add('error-input');
      }
      if (this.valueInput.value.length == 0) {
        this.valueInput.classList.add('error-input');
      }
    }
  }

  validate() {
    if (this.isTypedCorrectly(this.valueInput.value, this.type.toLowerCase())) {
      this.valueInput = this.getTypedValue(this.valueInput.value, this.type.toLowerCase())
      return true
    }

    return false
  }

}
