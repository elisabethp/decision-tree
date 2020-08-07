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

    getTypedValue(value, type) { //no validation because isTypedCorrectly is run first
        switch(type) {
            case "string": { //string
                return String(value)
            }
            case "integer": { //integer
                return parseInt(value)
            }
            case "float": { //float
                return parseFloat(value)
            }
            case "boolean": { //boolean
                if (value.toLowerCase() == "true" ||
                        value.toLowerCase() == "false")  {
                    return value.toLowerCase() == "true"
                }
            }
        }
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
                return false;
              }
    
              break;
            }
            case "float": { //float
              value = parseFloat(value)
              
              if (isNaN(value)) {
                throw Error;
                return false;
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
              return false;
            }
            default: {
              throw Error;
              return false;
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