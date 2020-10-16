import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSolutions from '@salesforce/apex/LZ_SolutionInterestController.getSolutions';
import commitToDatabase from '@salesforce/apex/LZ_SolutionInterestController.commitToDatabase';

export default class DualListboxSimple extends LightningElement {
    @track options = [];
    @track values = [];
    @track selectedValues;
    @api recordId;
    @track sizeTitle = "Solution Interest "
    help = "Select one or more solution interests to add to this contact. Available options are on the left. Existing solution interest records for this contact are on the right."
    
   

    connectedCallback(){
        getSolutions({recordId: this.recordId})
        .then(solutions => {
            this.options = Object.keys(solutions.optionMap).map(key => ({ label: key, value: solutions.optionMap[key] }));
            this.values = solutions.valueString;
            this.selectedValues = solutions.valueString;
            this.sizeTitle += '(' + Object.keys(solutions.optionMap).length + ')';
        })
    }

    handleChange(event) {
        // Retrieve an array of the selected options
        const selectedOptionsList = event.detail.value;
        this.selectedValues = event.detail.value;

    }

    //wrap save in buttonclick
    saveRecord()
    {
        commitToDatabase({solutions : this.selectedValues, recordId : this.recordId})
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Solution Interests Saved',
                    variant: 'success'
                }),
            );
            this.closeQuickAction();
            
        })
    }

    closeQuickAction() {
        const closeQA = new CustomEvent('close');
        // Dispatches the event.
        this.dispatchEvent(closeQA);
    }

    handleClickCancel(event) {
        const cancelClose = new CustomEvent('Close', { detail: {}, });
        this.dispatchEvent(cancelClose);
           }
       
}