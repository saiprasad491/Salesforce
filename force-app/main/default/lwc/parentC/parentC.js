import { LightningElement } from 'lwc';

export default class ParentC extends LightningElement {
  data1;

  handleChange(e){
    this.data1=e.target.value;
  }

}