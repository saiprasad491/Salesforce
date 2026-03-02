import { LightningElement } from 'lwc';

export default class Parent2ChildM1 extends LightningElement {
  data1=""; //property
  data2="";
  handleChange(evt){
    this.data1 = evt.target.value;
  }
  
  handleClick(evt){
    this.data2=this.data1;
  }

}