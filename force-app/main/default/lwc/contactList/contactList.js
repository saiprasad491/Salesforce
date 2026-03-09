


// import getContacts from '@salesforce/apex/ContactController.getContacts';
// import contactObjInsert from '@salesforce/apex/NewContact.contactObjInsert';
// import getContacts from '@salesforce/apex/ContactController.getContacts';
// import contactObjInsert from '@salesforce/apex/ContactController.contactObjInsert';
import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/ContactHandler.getContacts';
import contactObjInsert from '@salesforce/apex/ContactHandler.contactObjInsert';

export default class ContactList extends LightningElement {
    contacts;
    wiredContactsResult;


    con = {
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: ''
    }

    handleFirstNameChange(e){
        this.con = {...this.con, FirstName: e.target.value};
    }

    handleLastNameChange(e){
        this.con = {...this.con, LastName: e.target.value};
    }

    handleEmailChange(e){
        this.con = {...this.con, Email: e.target.value};
    }

    handlePhoneChange(e){
        this.con = {...this.con, Phone: e.target.value};
    }

    handleButtonClick(){
        contactObjInsert({ con: this.con })
            .then(() => {
                alert('record Inserted');
                this.closeModal();
                return refreshApex(this.wiredContactsResult);
            })
            .catch(error => {
                alert('record Insertion fail');
                console.error(error);
            });
    }

    @wire(getContacts)
    wiredContacts(result) {
        this.wiredContactsResult = result;
        if (result.data) {
            this.contacts = result.data;
        } else if (result.error) {
            console.error(result.error);
        }
    }

    handleRefresh() {
        refreshApex(this.wiredContactsResult);
    }

    showModal = false;

    openModal(){
        this.showModal = true;
    }

    closeModal(){
        this.showModal = false;
    }
    

}

/*
    con={
        fname:'',
        lname:'',
        email:'',
        Phone:''
    }
       

    handleFirstNameChange(e){
        console.log("e.target.value(first name change);",e.target.value);
        this.con={...this.con,fname:e.target.value};
    }
    handleLastNameChange(e){
        console.log("e.target.value(last name change);",e.target.value);
        this.con={...this.con,lname:e.target.value};
    }
    handlePhoneChange(e){
        this.con={...this.con,Phone:e.target.value};
    }
    handleEmailChange(e){
        this.con={...this.con,email:e.target.value};
    }

    handleButtonClick(){
        console.log("contact object:",this.fname,this.lname);
        contactObjInsert({ contactObj: this.con });
    }
    */