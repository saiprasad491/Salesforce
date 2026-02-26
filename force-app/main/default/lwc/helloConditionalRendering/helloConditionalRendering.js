import { LightningElement } from 'lwc';

export default class HelloConditionalRendering extends LightningElement {
  areDetailsVisible=false;

  handleChange(evt){
    this.areDetailsVisible = evt.target.checked;
  }  

}