import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { APIService } from 'src/app/api/api.service';
import { throwError } from 'rxjs';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-modify-job-popup',
  templateUrl: './modify-job-popup.component.html',
  styleUrls: ['./modify-job-popup.component.css']
})
export class ModifyJobPopupComponent implements OnInit {

  title = null
  values = []
  isAddAction = null
  action = null

  data = null;
  value = null;
  classad = null;
  type = null;

  new_key: any = null;
  new_value: any = null;
  new_type: any = null;
  id: any = null;

  constructor(private api : APIService) { }

  ngOnInit(): void {
    this.isAddAction = this.data['action'] == "add"
    this.title = this.isAddAction
      ? "Add Classad"
      : "Modify Classad"

    //console.log(this.data)
    this.id = this.data['job-row']['id']
    this.classad = this.data['job-row']['key']
    this.value = this.data['job-row']['value'];
    this.new_type = document.querySelectorAll('[data-edit-type]')[0];

    if (this.isAddAction) {
      this.value = ""
      var removeButton:any = document.getElementById("remove-button")
      removeButton.style.display = "none";

      this.new_type.value = ""
    }
    else {
      this.new_type.value = this.getValueType()
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

  submitChanges() {
    this.action = this.isAddAction ? "add" : "modify";

    this.new_key = document.querySelectorAll('[data-edit-key]')[0];
    this.new_value = document.querySelectorAll('[data-edit-value]')[0];    
    this.new_type = this.new_type.options[this.new_type.selectedIndex].value;

    this.new_key = this.isAddAction
      ? this.new_key.value
      : this.new_key.innerText;

    this.new_value = this.new_value.value;
    this.validate() 
  }

  remove() {
    this.action = "remove"
    this.new_key = this.data['job-row']['key'];
    this.new_value = this.data['job-row']['value'];

    this.validate();
  }

  validate() {
    if (this.new_key.length != 0 && this.new_value.length != 0 && this.isTypedCorrectly()) {
      var visibleContent = document.getElementById('modify-content');
      var invisibleContent = document.getElementById('modify-content-validate');
  
      visibleContent.style.display = 'none';
      invisibleContent.style.display = 'block'
    }
    else {
      if (this.new_key.length == 0) {
        document.querySelectorAll('[data-edit-key]')[0].classList.add('error-input');
      }
      if (this.new_value.length == 0) {
        document.querySelectorAll('[data-edit-value]')[0].classList.add('error-input');
      }
    }  
  }

  sendNewRows() {
    var obj = {};

    obj['action'] = this.action
    obj['key'] = this.new_key
    obj['value'] = this.new_value
    obj['type'] = this.new_type
    obj['id'] = this.id

    var status:any = document.getElementById("submit-status")
    var confirmButton:any = document.getElementById("confirm-modal")

    status.innerText = "Submitting...";
    confirmButton.disabled = true;

    this.api.postNewJobData(obj)
      .then(() => {
        var event = new CustomEvent('job-data-page-reload');
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

  clearErrorField(event) {
    event.target.classList.remove('error-input');
  }

  getValueType() : string {
    var result: string;

    result = typeof(this.value)
    
    if (result == "number") {
      result = '"' + this.value + '"'
      result = result.indexOf('.') == -1
        ? "integer"
        : "float";
    }

    return result;
  }

  isTypedCorrectly() : boolean {
    try {
      switch(this.new_type.toLowerCase()) {
        case "string": { //string
          this.new_value = String(this.new_value)
          break;
        }
        case "integer": { //integer
          this.new_value = parseInt(this.new_value)
          
          if (isNaN(this.new_value)) {
            throw Error;
          }

          break;
        }
        case "float": { //float
          this.new_value = parseFloat(this.new_value)
          
          if (isNaN(this.new_value)) {
            throw Error;
          }
          
          break;
        }
        case "boolean": { //boolean
          if (this.new_value.toLowerCase() == "true" ||
                this.new_value.toLowerCase() == "false")  {
              this.new_value = this.new_value.toLowerCase() == "true"
              break;
          }
          throw Error;
        }
        default: {
          throw Error;
        }
      }

      return true;
    }
    catch {
      document.querySelectorAll('[data-edit-type]')[0].classList.add('error-input');
      return false
    }
  }
}
