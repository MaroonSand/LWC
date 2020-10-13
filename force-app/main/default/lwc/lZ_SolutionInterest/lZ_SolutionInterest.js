import { LightningElement, track, api } from 'lwc';
import getSolutions from '@salesforce/apex/LZ_SolutionInterestController.getSolutions';

export default class DualListboxSimple extends LightningElement {
    @track options = [];
    @track values = [];
    selectedValues = [];
    @api recordId;
    
    connectedCallback(){
        getSolutions({recordId: this.recordId})
        .then(solutions => {
            this.options = Object.keys(solutions.optionMap).map(key => ({ label: key, value: solutions.optionMap[key] }));
            this.values = solutions.valueString;
            
        })
    }

    handleChange(event) {
        // Retrieve an array of the selected options
        const selectedOptionsList = event.detail.value;
        selectedValues = event.detail.value;
    }

    //wrap in buttonclick
    //passToApex(selectedValues : selectedValues)
    //{

    //}

    
}