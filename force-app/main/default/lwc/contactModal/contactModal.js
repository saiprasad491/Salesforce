import { LightningElement } from 'lwc';

export default class ContactModal extends LightningElement {
  data;
  handleChange(e){
    this.data = e.target.value;
  }
  handleClick(){
    alert(data);
  }
}