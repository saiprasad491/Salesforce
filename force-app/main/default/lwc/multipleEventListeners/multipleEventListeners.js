import { LightningElement } from 'lwc';

export default class MultipleEventListeners extends LightningElement {

  eventHandlers={
    click:this.handleClick,
    mouseover:this.handleMouseOver
  }

  handleClick(){
    console.log("Button Clicked");
  }

  handleMouseOver(){
    console.log("Button nouseover");
  }

}