import { LightningElement } from 'lwc';

export default class InputComponent extends LightningElement {
  greeting="world";

  handleChange(evt){
    this.greeting=evt.target.value;
  }

}