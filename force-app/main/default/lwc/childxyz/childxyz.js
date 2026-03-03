import { LightningElement } from 'lwc';

export default class Childxyz extends LightningElement {
  handlePrevClick(){
    this.dispatchEvent(new CustomEvent("prev"));
  }

  handleNextClick(){
    this.dispatchEvent(new CustomEvent("next"));
  }

}