import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api/api.service';

@Component({
  selector: 'app-modify-popup',
  templateUrl: './modify-popup.component.html',
  styleUrls: ['./modify-popup.component.css']
})
export class ModifyPopupComponent implements OnInit {

  title = "Modify Channel Row";
  param_name = null;
  old_param_value = null;
  new_param_value = null;

  data = null;
  values = []

  constructor(private api : APIService) { }

  validate() {
    this.values = [];

    var isValid = true;
    var inputs : any;
    inputs = document.querySelectorAll('[data-edit-row]');

    for (var i = 0; i < inputs.length; i++) {
      this.values.push(inputs[i].value)
      
      if (inputs[i].value.length == 0) {
        this.values = []
        inputs[i].classList.add('error-input')
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

  ngOnInit(): void {}

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
    var obj = {}

    obj["action"] = "modify"
    obj["table"] = this.data["table_name"];
    obj["row_index"] = this.data["index"];
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
        /*var event = new CustomEvent('job-data-page-reload');
        document.dispatchEvent(event);*/
        
        status.innerText = "Success!";
        this.close()
        confirmButton.disabled = false;
      })
      .catch((error) => {
        status.innerText = "An error occurred. Please try again.";
        confirmButton.disabled = false;
      })

  }

  clearErrorField(event) {
    event.target.classList.remove('error-input');
  }
}
