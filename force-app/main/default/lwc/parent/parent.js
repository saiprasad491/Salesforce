import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
  data1 = "";
  handleChange(evt){
    this.data1 = evt.target.value;
  }
}