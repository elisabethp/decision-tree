import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.css']
})
export class FilterPopupComponent implements OnInit {

  data = null;
  filters = [];
  frequent_keys = ["jobsubjobid", "owner", "sccountinggroup", "args"]

  constructor() { }

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
      this.onClose();
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

  clearErrorField(event) {
    event.target.classList.remove('error-input');
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  filterFunction() {
    var input, filter, ul, li, a, i, div, txtValue;

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }

  }
}
