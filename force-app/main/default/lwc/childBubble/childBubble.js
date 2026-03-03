import { LightningElement } from 'lwc';

export default class ChildBubble extends LightningElement {
  handleClick(){
    new CustomEvent("notify",{
      bubbles:true,
      composed:false
    })
  }
}