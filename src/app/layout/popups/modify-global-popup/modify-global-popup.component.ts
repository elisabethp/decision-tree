import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api/api.service';
import { Modal } from 'src/app/shared/modal.component';

@Component({
  selector: 'app-modify-global-popup',
  templateUrl: './modify-global-popup.component.html',
  styleUrls: ['./modify-global-popup.component.css', '/src/app/shared/modal.component.css']
})
export class ModifyGlobalPopupComponent extends Modal implements OnInit {

  title = "Modify Channel Row";
  param_name = null;
  old_param_value = null;
  new_param_value = null;

  data = null;
  types = []
  values = []

  constructor(private api : APIService) { super() }

  ngOnInit(): void {}

  validate() {
    this.values = [];
    this.types = [];

    var isValid = true;
    var type_inputs : any;
    var value_inputs : any;

    type_inputs = document.querySelectorAll('[data-edit-type]');
    value_inputs = document.querySelectorAll('[data-edit-row]');

    for (var i = 0; i < value_inputs.length; i++) {
      this.values.push(this.isTypedCorrectly(value_inputs[i].value, type_inputs[i].value))
      this.types.push(type_inputs[i].value)
      
      if (value_inputs[i].value.length == 0) {
        this.values = []
        value_inputs[i].classList.add('error-input')
        isValid = false;
        break;
      }

      if (!this.isTypedCorrectly(value_inputs[i].value, type_inputs[i].value)) {
        this.types = []
        type_inputs[i].classList.add('error-input')
        isValid = false;
        break;
      }

    }

    if (isValid) {
      var visibleContent = document.getElementById('modify-content');
      var invisibleContent = document.getElementById('modify-content-validate');
  
      visibleContent.style.display = 'none';
      invisibleContent.style.display = 'block'
    }
  }

  sendNewRows() {
    var obj = {}

    obj["action"] = "modify"
    obj["table"] = this.data["table_name"];
    obj["row_index"] = parseInt(this.data["index"]);
    obj["obj"] = {}

    for (var i = 0; i < this.data.column_names.length; i++) {
      obj["obj"][this.data["column_names"][i]] = this.values[i] 
    }
    
    var status:any = document.getElementById("submit-status")
    var confirmButton:any = document.getElementById("confirm-modal")

    status.innerText = "Submitting...";
    confirmButton.disabled = true;

    this.api.postNewChannelData(this.data["channel"]["name"], obj)
      .then(() => {
        var event = new CustomEvent('global-page-reload');
        document.dispatchEvent(event);
        
        status.innerText = "Success!";
        this.close()
        confirmButton.disabled = false;
      })
      .catch((error) => {
        status.innerText = "An error occurred. Please try again.";
        confirmButton.disabled = false;
      })

  }
  
}
