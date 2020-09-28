import { LightningElement, track} from 'lwc';
import insertBryan from '@salesforce/apex/BryanBadge.insertBryan';

export default class bryansMethod extends LightningElement {

   @track firstNameInput;
   @track lastNameInput;

    handleChange(event) 
    {
        this[event.target.name] = event.target.value;
    }

    buttonClicked()
    {
        insertBryan({firstName : this.firstNameInput, lastName : this.lastNameInput});
    }

}