export class Modal {

    constructor() {}

    close() {
        var event = new CustomEvent(
            'global-click',
            { detail: { 'switch-key': 'close-modal', } }
        );
        
        document.dispatchEvent(event);
    }

    clearErrorField(event) {
        event.target.classList.remove('error-input');
    }
   
    getValueType(value) : string {
        var result: string;

        result = typeof(value)
        
        if (result == "number") {
        result = '"' + value + '"'
        result = result.indexOf('.') == -1
            ? "integer"
            : "float";
        }

        return result;
    }

    isTypedCorrectly(value, type) : boolean {
        try {
          switch(type) {
            case "string": { //string
              value = String(value)
              break;
            }
            case "integer": { //integer
              value = parseInt(value)
              
              if (isNaN(value)) {
                throw Error;
              }
    
              break;
            }
            case "float": { //float
              value = parseFloat(value)
              
              if (isNaN(value)) {
                throw Error;
              }
              
              break;
            }
            case "boolean": { //boolean
              if (value.toLowerCase() == "true" ||
                    value.toLowerCase() == "false")  {
                  value = value.toLowerCase() == "true"
                  break;
              }
              throw Error;
            }
            default: {
              throw Error;
            }
          }
    
          return value;
        }
        catch {
          document.querySelectorAll('[data-edit-type]')[0].classList.add('error-input');
          return false
        }
      }
}