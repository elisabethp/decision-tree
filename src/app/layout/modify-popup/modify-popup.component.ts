import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-modify-popup',
  templateUrl: './modify-popup.component.html',
  styleUrls: ['./modify-popup.component.css']
})
export class ModifyPopupComponent implements OnInit {

  title = null;
  param_name = null;
  old_param_value = null;
  new_param_value = null;

  data = null;
  values = []

  constructor() { }

  validate() {
    this.values = [];

    var inputs : any;
    inputs = document.querySelectorAll('[data-edit-row]');
    console.log(inputs)

    for (var i = 0; i < inputs.length; i++) {
      this.values.push(inputs[i].value)
    }

    var visibleContent = document.getElementById('modify-content');
    var invisibleContent = document.getElementById('modify-content-validate');

    visibleContent.style.display = 'none';
    invisibleContent.style.display = 'block'
  }

  ngOnInit(): void {
    switch(this.data['switch-key']) {
      case "channel-edit-row": {
        this.title = "Modify Channel Row";
        break;
      }
    }

  }

  close() {
    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'close-modal',
        } 
      }
    );
  
    document.dispatchEvent(event);
  }

  sendNewRows() {
    this.close();
  }

}
