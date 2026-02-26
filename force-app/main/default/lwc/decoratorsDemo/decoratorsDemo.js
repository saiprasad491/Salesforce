import { LightningElement,track } from 'lwc';

export default class DecoratorsDemo extends LightningElement {
  @track ItemList = [];
  item = "";

  handleChange(evt) {
    this.item = evt.target.value;  
  }

  btnclick() {
    this.ItemList.push(this.item);  
    console.log(this.ItemList);
  }
}