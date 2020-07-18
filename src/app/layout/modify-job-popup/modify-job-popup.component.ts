import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { APIService } from '../../api/api.service';

@Component({
  selector: 'app-modify-job-popup',
  templateUrl: './modify-job-popup.component.html',
  styleUrls: ['./modify-job-popup.component.css']
})
export class ModifyJobPopupComponent implements OnInit {

  title = null
  values = []
  isAddAction = null

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
    this.classad = this.data['job-row']['key']
    this.value = this.isAddAction
      ? ""
      : this.data['job-row']['value'];
    this.id = this.data['job-row']['id']
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

  validate() {
    this.new_key = document.querySelectorAll('[data-edit-key]')[0];
    this.new_value = document.querySelectorAll('[data-edit-value]')[0];
    
    //this.new_key = this.new_key.value;
    this.new_key = this.isAddAction
      ? this.new_key.value
      : this.new_key.innerText;

    this.new_value = this.new_value.value;

    if (this.new_key.length != 0 && this.new_value != 0) {
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

    obj['action'] = this.data['action']
    obj['key'] = this.new_key
    obj['value'] = this.new_value
    obj['id'] = this.id
    
    var action = this.isAddAction
          ? "Add Classad"
          : "Modify Classad"

    this.api.postNewJobData(action, obj)
      .then(() => {
        var event = new CustomEvent('job-data-page-reload');
        document.dispatchEvent(event);
      })

    this.close()
  }

  clearErrorField(event) {
    event.target.classList.remove('error-input');
  }

}
