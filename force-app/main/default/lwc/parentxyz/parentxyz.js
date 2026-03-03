import { LightningElement } from 'lwc';

export default class Parentxyz extends LightningElement {
  page=1;

  handlePrevChange(){
    this.page = this.page-1;
  }

  handleNextChange(){
    this.page = this.page+1;
  }

}