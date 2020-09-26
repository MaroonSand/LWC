import { LightningElement, track} from 'lwc';
import insertBryan from '@salesforce/apex/BryanBadge.insertBryan';

export default class bryansMethod extends LightningElement {

    firstNameInput;
    lastNameInput;

    handleChange(event) {
       const field = event.target.name;
        if (field === 'firstName') {
            this.firstNameInput = event.target.value;
        } else if (field === 'lastName') {
            this.lastNameInput = event.target.value;
        }
        console.log(event.target.value);
    }

    buttonClicked()
    {
        insertBryan({firstName : this.firstNameInput, lastName : this.lastNameInput});
    }

}