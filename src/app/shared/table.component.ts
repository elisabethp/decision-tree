export class Table {

    constructor() {}
  
    positionTooltip(e) {
        var tooltipSpan: any;
        tooltipSpan = document.getElementsByClassName('tr-tooltip')[0];
        var x = e.clientX,
            y = e.clientY;
            
        tooltipSpan.style.position = 'fixed';
        tooltipSpan.style.display = 'inline-block';
        tooltipSpan.style.top = (y + 10) + "px";
        tooltipSpan.style.left = (x + 10) + "px";
    }

    removeTooltip() {
        var tooltipSpan: any;
        tooltipSpan = document.getElementsByClassName('tr-tooltip')[0];
        tooltipSpan.style.display = 'none';
    }

    getValues(obj){
        return Object.values(obj)
    }
   
}