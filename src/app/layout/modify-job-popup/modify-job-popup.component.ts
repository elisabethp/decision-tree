import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { APIService } from 'src/app/api/api.service';

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

  new_key: any = null;
  new_value: any = null;
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

    if (this.isAddAction) {
      this.value = ""
      var removeButton:any = document.getElementById("remove-button")
      removeButton.style.display = "none";
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
    
    //this.new_key = this.new_key.value;
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
    if (this.new_key.length != 0 && this.new_value.length != 0) {
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

}
