import { LightningElement, track, api } from 'lwc';
import getSolutions from '@salesforce/apex/LZ_SolutionInterestController.getSolutions';

export default class DualListboxSimple extends LightningElement {
    @track options = [];
    @track values = [];
    @api recordId;
    
    connectedCallback(){
        getSolutions({recordId: this.recordId})
        .then(solutions => {
            alert(solutions);
            alert(Object.keys(solutions.optionMap).map(key => ({ label: key, value: solutions[key] })));
            alert(Object.keys(JSON.stringify(solutions.valueString)));
            this.options = Object.keys(solutions.optionMap).map(key => ({ label: key, value: solutions[key] }));
            this.values.push(...Object.keys(JSON.stringify(solutions.valueString)));
        })
    }

    
}
    