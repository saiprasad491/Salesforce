import { LightningElement,track } from 'lwc';

export default class ReactivityArrays extends LightningElement {
  @track arr = []
  newItem;

  handleChange(evt){
    this.newItem = evt.target.value;
  }

  addItemToList(){
    this.arr.push(this.newItem);
    console.log(this.arr);
  }


}