import { LightningElement } from 'lwc';

export default class ParentPaginator1 extends LightningElement {
  page=1;

  handlePrevious(){
    this.page = this.page-1;
  }

  handleNext(){
    this.page = this.page+1;
  }

}